import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = (props) => {
  // console.log('props', props);
 
  const { onUploadSuccess, onUploadFail } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (file) => {
    setError('');
    
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
    
      setError('请选择图片文件');
      return;
    }
    
    // 验证文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB');
      return;
    }

    setSelectedFile(file);
    
    // 创建预览URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('请先选择图片');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:3001/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });

      console.log('上传成功:', response.data);
      // 这里可以处理上传成功后的逻辑，比如显示成功消息或刷新列表
      onUploadSuccess(response.data);
      
    } catch (err) {
      const msg = '上传失败: ' + err.response?.data?.message || err.message;
      setError(msg);
      onUploadFail(msg);

    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setUploadProgress(0);
    setError('');
    setIsUploading(false);
  };

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.dropzone,
          borderColor: isDragging ? '#2196f3' : '#ccc',
          backgroundColor: isDragging ? '#e3f2fd' : '#fafafa'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!previewUrl ? (
          <>
            <p>点击或拖拽图片到这里上传</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              style={styles.input}
              id="file-upload"
            />
            <label htmlFor="file-upload" style={styles.chooseButton}>
              选择图片
            </label>
          </>
        ) : (
          <div style={styles.preview}>
            <img
              src={previewUrl}
              alt="Preview"
              style={styles.previewImage}
            />
            <button
              onClick={handleReset}
              style={styles.deleteButton}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {uploadProgress > 0 && (
        <div style={styles.progressContainer}>
          <div 
            style={{
              ...styles.progressBar,
              width: `${uploadProgress}%`
            }} 
          />
        </div>
      )}

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          style={{
            ...styles.uploadButton,
            opacity: isUploading ? 0.7 : 1,
            cursor: isUploading ? 'not-allowed' : 'pointer'
          }}
        >
          {isUploading ? `上传中 ${uploadProgress}%` : '开始上传'}
        </button>
      )}
    </div>
  );
};

// 样式对象
const styles = {
  container: {
    maxWidth: '300px',
    // margin: '20px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  dropzone: {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  input: {
    display: 'none'
  },
  chooseButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease'
  },
  preview: {
    position: 'relative',
    marginTop: '10px'
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '4px'
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressContainer: {
    width: '100%',
    height: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    marginTop: '20px',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    transition: 'width 0.3s ease'
  },
  error: {
    color: '#ff4444',
    marginTop: '10px',
    fontSize: '14px'
  },
  uploadButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginTop: '20px',
    fontSize: '16px',
    transition: 'all 0.3s ease'
  }
};

export default ImageUpload;
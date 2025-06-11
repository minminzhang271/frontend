// components/PostPublish.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUpload from   "@/components/ImageUpload"
import MarkdownEditor from '../MarkdownEditor';
import { postApi } from '@/api/modules/post';
import './index.css';

const PostPublish = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(`---
title: 文章标题
date: ${new Date().toISOString().split('T')[0]}
tags: [标签1, 标签2]
---

# 开始写作

## Markdown 语法示例

### 1. 文本格式化
    

    
    `);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover: null,
    content: content,
    category: '1',
    recommendation: 'latest',
   
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
 
  const formRef = useRef(null);

  const categories = [
    { value: 1, label: 'AIGC' }, 
    { value: 2, label: '美股' },
    { value: 3, label: '支付' },
    { value: 4, label: '对外汉语' },
    { value: 5, label: '随笔' },
  ];

  const recommendationOptions = [
    { value: 'latest', label: '最新发布' },
    { value: 'homepage', label: '首页推荐' }, 
    { value: 'popular', label: '热门文章' },
    { value: 'trending', label: '趋势话题' },
    { value: 'editor_pick', label: '编辑精选' },
    { value: 'none', label: '不推广' }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入标题';
    } else if (formData.title.length > 100) {
      newErrors.title = '标题不能超过100个字符';
    }

    if (!formData.category) {
      newErrors.category = '请选择分类';
    }

    if (!formData.content.trim()) {
      newErrors.content = '请输入内容';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('name',name,value, typeof(value))
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应的错误信息
    setErrors(prev => ({
      ...prev,
      [name]: undefined
    }));
  };

 
  const handleEditor =(value)=>{
   
    setFormData(prev => ({
      ...prev,
      content: value
    }));
    // 清除对应的错误信息
    setErrors(prev => ({
      ...prev,
      content: undefined
    }));
    
  }
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {

    

      
      // 模拟API请求
      // await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('提交的表单数据:', {...formData});
      const response = await postApi.create({
        ...formData
      });
      console.log('response',response);
     
      navigate('/post/' + response.id);
      // console.log('提交的表单数据:', {...formData});
      
      // 成功后清空表单
      // handleReset();
      alert('发布成功！');
    } catch (error) {
      console.log('发布失败error',error);
      alert('发布失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '1',
      category: '',
      cover: null,
      recommendation: 'latest',
      content: ''
    });
    setImagePreview('');
    setErrors({});
    formRef.current?.reset();
  };

  // 图片上传成功
  const handleUploadSuccess = (data) => {
 

    console.log('上传成功:', data.data);
    setFormData(prev => ({
      ...prev,
      cover: data.data
    }));


  };

  const handleUploadFail = async (msg) => {
 
    console.log('上传失败:', msg);
    
  };


  return (
    <div className="post-form-container">
      <h1 className="form-title">发布新博客</h1>
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className={`post-form ${isLoading ? 'loading' : ''}`}
      >
        <div className="form-group">
          <label htmlFor="title">标题</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          
            placeholder="请输入博客标题"
            disabled={isLoading}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">描述</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
         
            placeholder="请输入描述"
            disabled={isLoading}
          />
          {/* {errors.description && <span className="error-message">{errors.description}</span>} */}
        </div>
        <div className="form-group">
          <label htmlFor="category">分类</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value="">选择分类</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="cover">封面图片</label>
          <input
            type="hidden"
            id="cover"
            name="cover"
            // accept="image/*"
            value={formData.cover || ''}
            // onChange={handleImageChange}
            // disabled={isLoading}
          />
          <ImageUpload onUploadSuccess={handleUploadSuccess} onUploadFail={handleUploadFail} />
          {errors.cover && <span className="error-message">{errors.cover}</span>}
          
        </div>

        <div className="form-group">
          <label htmlFor="recommendation">选择推广方式</label>
          <select
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            {/* <option value="">选择推广方式</option> */}
            {recommendationOptions.map(option => (
              <option key={option.value} value={option.value} >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="content">内容</label>



          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="请输入博客内容"
            rows={10}
            disabled={isLoading}
            // style={{ display: 'none' , height: 0 }}
          />
            <MarkdownEditor
                  value={formData.content}
                  // onChange={setContent}
                  onChange={handleEditor}
                 
                />

          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>

        <div className="button-group">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? '发布中' : '发布博客'}
          </button>
          <button 
            type="button" 
            className="submit-button reset-button"
            onClick={handleReset}
            disabled={isLoading}
          >
            重置
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPublish;
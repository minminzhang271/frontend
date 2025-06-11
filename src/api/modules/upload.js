// src/api/modules/upload.js - 上传相关接口
import request from '../request';

export const uploadApi = {
  // 上传图片
  uploadImage: (formData) => request.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  
  // 上传文件
  uploadFile: (formData) => request.post('/api/upload/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};
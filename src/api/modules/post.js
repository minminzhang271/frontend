// src/api/modules/post.js - 文章相关接口
import request from '../request';

export const postApi = {
  // 获取文章列表
  getAllPosts: (params) => request.get('/api/posts', { params }),

  // 获取category文章列表
  getCategoryPosts: (params) => request.get(`/api/category/${id}/posts`, { params }),
  
 


  // 获取文章详情
  getDetail: (id) => request.get(`/api/posts/${id}`),
  
  // 创建文章
  create: (data) => request.post('/api/posts', data),
  
  // 更新文章
  update: (id, data) => request.put(`/api/posts/${id}`, data),
  
  // 删除文章
  delete: (id) => request.delete(`/api/posts/${id}`),
  
  // 获取草稿列表
  getDrafts: () => request.get('/api/posts/drafts'),
  
  // 保存草稿
  saveDraft: (data) => request.post('/api/posts/drafts', data),
  
  // 发布文章
  publish: (id) => request.put(`/api/posts/${id}/publish`)
};
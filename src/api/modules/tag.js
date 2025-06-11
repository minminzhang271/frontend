// src/api/modules/tag.js - 标签相关接口
import request from '../request';

export const tagApi = {
  // 获取所有标签
  getAll: () => request.get('/api/tags'),
  
  // 创建标签
  create: (data) => request.post('/api/tags', data),
  
  // 更新标签
  update: (id, data) => request.put(`/api/tags/${id}`, data),
  
  // 删除标签
  delete: (id) => request.delete(`/api/tags/${id}`)
};
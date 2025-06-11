// src/api/request.js - axios 实例配置
import axios from 'axios';
let { VITE_BASE_URL } = import.meta.env
// import { message } from 'antd';

// 创建 axios 实例
const request = axios.create({
  baseURL: VITE_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // console.log('axios响应拦截response',response)
    return response.data;
  },
  error => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          // 未登录或 token 失效
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          alert('没有权限访问');
          break;
        case 404:
          alert('请求的资源不存在');
          break;
        case 500:
          alert('服务器错误');
          break;
        default:
          alert(response.data.message || '请求失败');
      }
    } else {
      alert('网络错误，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

export default request;







// src/api/index.js - 统一导出所有 API
export { postApi } from './modules/post';
export { tagApi } from './modules/tag';
export { uploadApi } from './modules/upload';
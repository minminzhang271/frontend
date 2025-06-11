// frontend/src/routes/index.js
import { lazy } from 'react';

// 懒加载组件
const Home = lazy(() => import('../pages/Home'));
const PostList = lazy(() => import('../pages/PostList'));
const PostDetail = lazy(() => import('../pages/PostDetail'));
const PostEditor = lazy(() => import('../pages/PostEditor'));
const TagList = lazy(() => import('../pages/TagList'));
const About = lazy(() => import('../pages/About'));

// 路由配置
export const routes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      title: '首页',
      auth: false
    }
  },
  {
    path: '/posts/:tag',
    element: <PostList />,
    meta: {
      title: '文章列表',
      auth: false
    }
  },
  {
    path: '/post/:id',
    element: <PostDetail />,
    meta: {
      title: '文章详情',
      auth: false
    }
  },
  {
    path: '/editor',
    element: <PostEditor />,
    meta: {
      title: '写文章',
      auth: true
    }
  },
  {
    path: '/editor/:id',
    element: <PostEditor />,
    meta: {
      title: '编辑文章',
      auth: true
    }
  },
  {
    path: '/tags',
    element: <TagList />,
    meta: {
      title: '标签管理',
      auth: false
    }
  },
  {
    path: '/about',
    element: <About />,
    meta: {
      title: '关于我',
      auth: false
    }
  }
];

export const privateRoutes = routes.filter(route => route.meta.auth);
export const publicRoutes = routes.filter(route => !route.meta.auth);
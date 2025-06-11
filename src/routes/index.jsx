import { lazy } from 'react';

// 懒加载组件
const Home = lazy(() => import('../pages/Home'));
const Posts = lazy(() => import('../pages/Posts'));
const PostDetail = lazy(() => import('../pages/PostDetail'));
const PostEditor = lazy(() => import('../pages/PostEditor'));
const TagList = lazy(() => import('../pages/TagList'));
const About = lazy(() => import('../pages/About'));

// 基础路由配置
const baseRoutes = [
  {
    path: '/',
    element: <Home />,
    meta: {
      title: '首页',
      auth: false
    }
  },
  {
    path: '/category/:id/posts',
    element: <Posts />,
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
    path: '/categories',
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

// 路由分类函数
const getRoutes = () => {
  return {
    routes: baseRoutes,
    privateRoutes: baseRoutes.filter(route => route.meta.auth),
    publicRoutes: baseRoutes.filter(route => !route.meta.auth)
  };
};

export default getRoutes;
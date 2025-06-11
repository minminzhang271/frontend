// frontend/src/components/RouteGuard.jsx
import { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('token'); // 判断是否登录的逻辑

  // 判断当前路由是否需要认证
  const isPrivateRoute = privateRoutes.some(
    route => route.path === location.pathname
  );

  // 如果需要认证但未登录，重定向到登录页
  if (isPrivateRoute && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 添加加载状态
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default RouteGuard;
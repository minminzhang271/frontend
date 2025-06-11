// frontend/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { routes } from './routes';
import getRoutes from './routes';

// 获取路由配置
const { routes, privateRoutes, publicRoutes } = getRoutes();
// import RouteGuard from './components/RouteGuard';
// import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      {/* <RouteGuard> */}
        {/* <Layout> */}
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            {/* 404页面 */}
            <Route path="*" element={<div>页面不存在</div>} />
          </Routes>
        {/* </Layout> */}
      {/* </RouteGuard> */}
    </BrowserRouter>
  );
}

export default App;
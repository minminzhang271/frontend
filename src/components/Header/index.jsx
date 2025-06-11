

import React from 'react';
import { Link } from 'react-router-dom';
import styles  from './index.module.scss';
// console.log('header',styles)
const navList = [
  { path: '/', label: '首页' },
  { path: '/category/1/posts', label: '列表' },
  { path: '/editor', label: '写文章' },
  { path: '/post/:id', label: '详情' },
  { path: '/about', label: '关于' },
];

const Navigation = () => {
  return (
    <nav>
      <ul>
        {navList.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// export default Navigation;

// console.log(styles);
function Header() {
  
   
  return (
    <div className={`${styles['header-wrap']} ${styles['bg-color']}  `}   id={styles.header}>
      <div className={styles['header']}>
        <div className={styles['header-logo']}>swdeep</div>
        <div className={styles['header-nav']}>
          <Navigation />
        </div>
        <div className={styles['header-login']}>登陆</div>


      </div>
    </div>
  );
}



export default Header;
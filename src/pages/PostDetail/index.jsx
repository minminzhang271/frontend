
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import Header from '@/components/Header/index.jsx';
import Footer from '@/components/Footer/index.jsx';



import Detail from './component/Detail.jsx';

console.log('styles',styles);

function PostDetail() {
  return (
    <div>
      <Header/>
        <div className={styles.container}>
        <Detail />
        </div>
      <Footer/>
    </div>
  );

}

export default PostDetail;
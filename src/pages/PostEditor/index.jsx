// frontend/src/pages/Post/Editor.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header/index.jsx';
import Footer from '@/components/Footer/index.jsx';
import PostPublish from './components/PostPublish';
// import MarkdownEditor from './components/MarkdownEditor';
// import { postApi } from '@/api/modules/post';
import styles from './index.module.scss';


 

function PostEditor(){

  return (
    <div>
      <Header/>
      <div className={styles.container}>
        <PostPublish/>
      </div>
  
     
      <Footer/>
    </div>
  )
}

export default PostEditor;
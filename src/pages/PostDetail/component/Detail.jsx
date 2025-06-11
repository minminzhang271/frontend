
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Viewer } from '@bytemd/react';
import frontmatter from '@bytemd/plugin-frontmatter' // front-matter 支持
import gemoji from '@bytemd/plugin-gemoji'  // emoji 支持
import gfm from '@bytemd/plugin-gfm'  // GitHub Flavored Markdown
import highlight from '@bytemd/plugin-highlight' // 代码高亮
import mediumZoom from '@bytemd/plugin-medium-zoom' // 图片缩放
import math from '@bytemd/plugin-math' // 数学公式
import mermaid from '@bytemd/plugin-mermaid' // 图表支持

import { format, parseISO } from 'date-fns';

import styles from './detail.module.scss';
import './markdown-content.css' // 自定义样式

let { VITE_BASE_URL } = import.meta.env
function Detail() {


  


const [formData, setFormData] = useState({
      title: '',
      description: '',
      cover: null,
      content: '',
      category_id: 0,
      category_name: '',
      author: '',
      updated_at: '',
      // recommendation: '',
     
    });
const [isLoading, setIsLoading] = useState(true);
 
  const { id } = useParams();
  
   
    useEffect(() => {
      async function getData() {
        try {
          const response = await fetch(`http://localhost:3001/api/posts/${id}`);
          const data = await response.json();
          const { content, title, description, cover, category_id, category_name, author, updated_at } = data;
          setFormData({
            content,
            title,
            description,
            cover,
            category_id,
            category_name,
            author,
            updated_at
          });
        } catch (error) {
          console.error('Error fetching post:', error);
        } finally {
          setIsLoading(false);
        }
      }
  
      getData();
    }, [id]); // Only re-run when id changes
 
    if (!formData.content) return <div>加载中...</div>;
    const date = parseISO(formData.updated_at);
    const formattedDate = format(date, 'yyyy-MM-dd');
   // 配置插件
   const plugins = [
    gfm(),
    gemoji(),
    highlight(),
    mediumZoom(),
    math(),
    mermaid(),
    frontmatter(),
   
  ]
  return (

    <div className={styles.detail}>
      <div className={styles.title}>
        {formData.title} 
      </div>
      <div className={styles.info}>
        {/* <span>{formData.category_name}</span> */}
        <span className={styles.author}>{formData.author}</span>|
        <span>{formattedDate}</span>
      </div>
      <div className={styles.description}>
        {formData.description}
      </div>

      <div className={styles.cover}>
        { formData.cover &&  formData.cover.compressed && <img src={ VITE_BASE_URL +'/'+ formData.cover.compressed.path} alt="" />}
        </div>
     
      <div className={styles.content}>
        <div className='markdown-content'>
          <Viewer value={formData.content} plugins={plugins}  />
        </div>

      </div>
     
    </div>
  );
}

 


export default Detail
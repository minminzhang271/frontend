
import React from 'react';
import { Link } from 'react-router-dom';

import  Header from '@/components/Header'
import Footer from '@/components/Footer';

import Banner from  './component/banner'
import Block from './component/block'


import styles from './index.module.scss';
let { VITE_BASE_URL } = import.meta.env
function BlogList() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    fetch(VITE_BASE_URL+'/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className= { styles['container']}>
  
      
      <Link to="/editor" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        写新文章
      </Link>
      <div className="grid gap-4">
        {posts.map(post => (
          <div key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600">
              发布于: {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

 


function Home(){
 
  const categories = [
    {
      category_id: 1,
      category_name: '前端'
    },
    
  ];
  

    return (
        <div>
          <Header/>
          <Banner/>
          <Block/>
          <Block/>
          <Block/>
          <BlogList/>
          <Footer/>
        </div>
    )
}


export default Home
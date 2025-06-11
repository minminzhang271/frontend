import React, {useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';

import  Header from '@/components/Header'
import Footer from '@/components/Footer';
import  Banner from './components/Banner';

import { postApi } from '@/api/modules/post';
import  List from './components/List';

import styles from './index.module.scss';


// API service
let { VITE_BASE_URL } = import.meta.env

const fetchCategoryPosts = async (categoryId) => {
  const response = await fetch(`${VITE_BASE_URL}/api/category/${categoryId}/posts`);
  if (!response.ok) {
    throw new Error('网络错误或服务器错误');
  }
  return response.json();
};


function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  

  

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await fetchCategoryPosts(id);
        
        data.posts.length ? setPosts(data.posts) : setPosts([]);


       
      } catch (err) {
        setError(err.message);
        console.error('获取博客列表失败:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [id]);

  

  if(isLoading){
    return (
      <div className="container mx-auto px-4">
        <div>loading</div>
        
      </div>
    );
    
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 text-lg">
          错误: {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div className="container  ">
     
      <div className={styles.listWrap}>

      {posts.length > 0 ? <List data={posts} /> : <div className='data-empty'>没有数据</div>}
     
      </div>
    </div>
  );
 
}


function PostList() { 
  return (
    <div>
      <Header/>
      <Banner/>
        <div className={styles.container}>
        <CategoryPosts/>
        </div>
      <Footer/>
    </div>
  );
}


export default PostList
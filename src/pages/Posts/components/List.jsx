

import {  useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns';
import styles from './list.module.scss';
function List(props) {
  const navigate = useNavigate();
  console.log('props', props);

  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const { data } = props

  const getThumbnail = (item)=>{
    try {
      const thumbnailSrc = BaseUrl + "/" + item.cover?.thumbnail?.path || 'default-thumbnail.jpg';

      return <img src={thumbnailSrc} alt="" />;

    }catch(err){ 
      console.error('获取缩略图失败:', err);
    }
   
  }

  const getDate = (date) => {
    return format(parseISO(date), 'yyyy-MM-dd');
  }
  function handleClick(id){
    console.log('id', id);
   
    navigate('/post/' + id);
      
    // setCurrent(index);
  }

  return (
    <div className={styles.list}>
         <ul>
            {data.map((item, index) => (
              <li className={styles.item} key={index} >
                <div className={styles.itemCover} onClick={() => handleClick(item.id)} >
                  {getThumbnail(item)}
                </div>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.description}</p>
                  <div className={styles.itemInfo}>
                    <span>{item.author}</span> | <span>{getDate(item.created_at)}</span>
                  </div>
                </div>
                
            
               </li>
            ))}
         </ul>
    </div>
  );
}

export default List
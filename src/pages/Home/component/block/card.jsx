

import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import Button from '@/components/Button';
import styles from './card.module.scss';


 
function Card(props) {
  let { data } = props;
  const navigate = useNavigate();
 
  function handleClick(id){
   
    navigate('/post/' + id);
      
    // setCurrent(index);
  };

  const date = parseISO(data.created_at);
  const formattedDate = format(date, 'yyyy-MM-dd');
  return (
    <div className={styles.card}>  
      <div className={styles.cardImg}>
        <img src={data.cover} alt="" width="100%" height="100%" />
      </div>
      <div className={styles.cardInfo}>
        <span className={styles.cardInfoAuthor}>{data.author}</span> | <span>{formattedDate}</span>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.description}>{data.description}</div>
      </div>
                 <Button     onClick={()=>handleClick(data.id)} disabled={false} children="read more &gt;"/>
    </div>
  );
}



export default Card
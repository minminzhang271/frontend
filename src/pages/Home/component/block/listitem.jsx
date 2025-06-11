
import styles from './listitem.module.scss';
import { format, parseISO } from 'date-fns';

 
function ListItem(props) {
  let { data } = props


 const date = parseISO(data.created_at);
 const formattedDate = format(date, 'yyyy-MM-dd');

  return (
    <div className={styles.listitem} onClick={props.onClick}>
      <div className={styles.listitemInfo}>
      <span>{data.author}</span> |  <span>{formattedDate}</span> 
      </div>
      <div className={styles.listitemContent}>
        <h3>{data.title}</h3>
        {/* <p>{props.data.description}</p> */}
      </div>
    </div>
  );
}



export default ListItem
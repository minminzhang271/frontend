
import styles from './banner.module.scss';
import bannerImg from '@/assets/banner.png';
import Button from '@/components/Button';
function Banner() {


  const handleClick = () => {
    console.log('button handleClick');
     
  };
  return (
    <div className={styles['banner-wrap']}>
      <div className={styles['banner']}>
        <div className={styles['banner-info']}>
          <div className={styles['tag']}>Featured post</div>
          <div className={styles['title']}>Step-by-step guide to choosing great font pairs</div>
          <div className={styles['author']}><span>By John Doe</span>   |   May 23, 2022 </div>
          <div className={styles['desc']}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</div>

          {/* <button class={styles['banner-button']}>Read more &gt;</button> */}
          <Button  size="large"   onClick={() =>  handleClick ()} disabled={false} children="read more &gt;"/>
        </div>
        <div className={styles['banner-img']}>
          <img src={bannerImg} alt="Banner" />
        </div>
       </div>
      
    </div>
  );
}


export default Banner;
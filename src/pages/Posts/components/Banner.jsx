


import styles from './banner.module.scss';
function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.title}>
        AIGC
      </div>
      <div className={styles.desc}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.

      </div>
      <div className={styles.breadcrumbs}>
        Blog &gt; AIGC
      </div>

    </div>
  )
}


export default Banner;
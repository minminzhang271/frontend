

import styles  from './index.module.scss';
console.log('footer', styles);


function RenderList() {
  let obj =  [
    {title:'友情链接',  content: [
      {name: '友情链接111', link: 'http://www.baidu.com'},
      {name: '友情链接222', link: 'http://www.baidu.com'},
      {name: '友情链接222', link: 'http://www.baidu.com'}
    ]},
    {title:'联系我们',  content: [
      {name: 'x', link: 'http://www.baidu.com'},
      {name: '公众号', link: 'http://www.baidu.com'},
      {name: '邮箱', link: 'http://www.baidu.com'}
    ]},
    {title:'关于我们',  content: [
      {name: '啊发大水发', link: 'http://www.baidu.com'},
      {name: '大撒发大水', link: 'http://www.baidu.com'},
      {name: '侧翻健康健康', link: 'http://www.baidu.com'}
    ]},
  ];

  return obj.map((item, index) => (
    <div className={styles['footer-item']} key={index}>
      <h3>{item.title}</h3>
      <ul>
        {item.content.map((subItem, subIndex) => (
          <li key={subIndex}>
            <a href={subItem.link} target="_blank" rel="noopener noreferrer">{subItem.name}</a>
          </li>
        ))}
      </ul>
    </div>
  ));

}
function Footer() {


  return ( 
    <section className={`${styles['footer-wrap']}`}  id="sss">
      <div className={`${styles['footer']}`} >
        <div className={`${styles['footer-content']}`}>
           <RenderList/>
        </div>
      </div>
      <div className={`${styles['copyright']}`}>
          <p className={`${styles['copyright-text']}`}>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </section>
   );
}
export default Footer;
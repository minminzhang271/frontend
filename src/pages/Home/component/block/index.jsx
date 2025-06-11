import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import Card from './card'

import ListItem  from './listitem';

import listData from '@/data/list.json'


// console.log('listData',listData)
function Block() {
  const [ current, setCurrent ]  = useState(0);

  const navigate = useNavigate();

  
  function handleClick(id){
    console.log('id', id);
   
    navigate('/post/' + id);
      
    // setCurrent(index);
  }

   
  
   
  return (
    <div className={styles.blockWrap}>
      <div className={styles.block}>
        <div  className={styles.blockCard}>
          <h3 className={styles.blockTitle}  >AIGC </h3>
          <Card data={listData[current]}  />
        </div>
        <div className={styles.blockList}>
          <h3 className={styles.blockTitle}>Latest POST</h3>
          {
            listData.map((item, index) => {
              return (
                <ListItem key={index} data={item}  onClick={() => handleClick(item.id)}  />
              )
            })
          }
        </div>

      </div>
     
    </div>
  );

}

export default Block;
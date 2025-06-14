import React from 'react';
import styles  from './index.module.scss';

function Button(props) {
  // console.log('props', props);
  return (
    <button className={styles['button']}   type={props.size} onClick={props.onClick} disabled={props.disabled}>
      {props.children}
    </button>
  );
}

export default Button;
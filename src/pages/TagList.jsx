
import React, { useState } from "react";

const Parent = () => {
  const handleClick = () => {
    console.log("父组件收到点击事件");
  };

  return(
    <div>
    <Child onClick={handleClick} />;
    </div>

  ) 
    
};

const Child_1 = ({ onClick }) => {

 
  console.log("子组件渲染", onClick);

  const handleClick = () => {
    console.log("子组件收到点击事件");
    onClick();
  }

  return <button onClick={handleClick}>点击我</button>;
};


const Child = (props) => {
  // 打印整个 props 对象
  console.log(props);

  const { onClick } = props;  // 解构 onClick
  console.log("子组件渲染", onClick);

  const handleClick = () => {
    console.log("子组件收到点击事件");
    onClick();
  };

  return <button onClick={handleClick}>点击我</button>;
};

function TagList() {
  return (
    <div>
      <h1>TagList</h1>

      <Parent/>
    </div>
  );
}

export default TagList
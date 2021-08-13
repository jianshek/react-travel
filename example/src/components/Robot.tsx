import React, { useContext } from 'react';
import styles from './Robot.module.css'
import { appContext, appSetStateContext } from "../AppState";
import { withAddToCart } from './AddToCart';

export interface RobotProps {  //定义一个接口,用来限定数据类型(接口相当于约束,要遵守)
  id: number;
  name: string;
  email: string;
  addToCart: (id, name) => void;
}

//addToCart是从高阶组件获取到的属性
const Robot: React.FC<RobotProps> = ({ id, name, email, addToCart }) => {
  //函数式组件获取全局value,使用useContext
  const value = useContext(appContext);
  return (
    <div className={styles.cardContainer}>
      <img alt="robot" src={`https://robohash.org/${id}`} />
      <h2>{name}</h2>
      <p>{email}</p>
      <p>作者：{value.username}</p>
      <button onClick={() => addToCart(id, name)}>加入购物车</button>
    </div>
  );
}

export default withAddToCart(Robot); //使用高阶组件

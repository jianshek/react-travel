import React, { useContext } from "react";
import styles from "./Robot.module.css";
import { appContext, appSetStateContext } from "../AppState";
import { useAddToCart } from "./AddToCart";

interface RobotProps {
    id: number;
    name: string;
    email: string;
}

//和Robot大部分代码都一样,只是加了打折商品;当两个页面相似度极高时,可以用高阶组件或者自定义hooks提取相同的功能
const RobotDiscount: React.FC<RobotProps> = ({ id, name, email }) => {
    //函数式组件获取全局value,使用useContext
    const value = useContext(appContext);
    const addToCart = useAddToCart();  //使用自定义hook
    return (
        <div className={styles.cardContainer}>
            <img alt="robot" src={`https://robohash.org/${id}`} />
            <h2>打折商品</h2>
            <h2>{name}</h2>
            <p>{email}</p>
            <p>作者：{value.username}</p>
            <button onClick={() => addToCart(id, name)}>加入购物车</button>
        </div>
    );
};

export default RobotDiscount;

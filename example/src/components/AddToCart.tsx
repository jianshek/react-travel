import React, { useContext } from "react";
import { appSetStateContext } from "../AppState";
import { RobotProps } from "./Robot";

//高阶组件(HOC)通常以with开头
export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>)=>{
    return (props)=>{
        const setState = useContext(appSetStateContext)  //获取全局上下文
        const addToCart = (id, name) => {
            if (setState) {
            setState((state) => {
                return {
                ...state,
                shoppingCart: {
                    items: [...state.shoppingCart.items, { id, name }],
                },
                };
            });
            }
        }
        return <ChildComponent {...props} addToCart={addToCart} /> // 子组件添加addToCart属性
    }
}

//hooks通常以use开头
export const useAddToCart = () => {
    const setState = useContext(appSetStateContext)    //获取全局上下文
    const addToCart = (id, name) => {
        if (setState) {
        setState((state) => {
            return {
            ...state,
            shoppingCart: {
                items: [...state.shoppingCart.items, { id, name }],
            },
            };
        });
        }
    }
    return addToCart; //返回函数
}
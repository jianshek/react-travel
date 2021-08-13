
//全局状态

import React, { useState } from "react";
//接口,定义数据类型
interface AppStateValue {
    username: string;
    shoppingCart: { items: { id: number; name: string }[] };
}
//定义默认值
const defaultContextValue: AppStateValue = {
    username: "阿莱克斯",
    shoppingCart: { items: [] },
};

//向外传值(传state), createContext:全局上下文
export const appContext = React.createContext(defaultContextValue); 
//修改值(修改state)
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<AppStateValue>> | undefined>(undefined);

//生产消费者模式,Provider提供value
export const AppStateProvider: React.FC = (props) => {
    const [state, setState] = useState(defaultContextValue);
    //每个组件都有props.children属性
    return (
        <appContext.Provider value={state}>
            <appSetStateContext.Provider value={setState}>
            {props.children}  
            </appSetStateContext.Provider>
        </appContext.Provider>
    );
};
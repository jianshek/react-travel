
//用于存储数据,store全局唯一

import { createStore, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";    //语言切换
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";  //首页数据
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
//使用toolkit中的combineReducers代替redux中的combineReducers
import { combineReducers, configureStore } from "@reduxjs/toolkit";



const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer
})
//store参数为reducer,action来的数据交给reducer处理,处理完返回给store,订阅store的页面就可以收到改变后的数据
//中间件执行顺序:https://segmentfault.com/a/1190000005766289
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog)); 
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog], //因为toolkit有使用自己的中间件,所以先获取默认中间件,然后加入自定义的中间件
    devTools: true,  //开启redux调试
  });

//返回store的类型
export type RootState = ReturnType<typeof store.getState>


export default store;
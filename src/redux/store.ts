
//用于存储数据,store全局唯一

import { createStore } from 'redux';
import languageReducer from "./languageReducer";

//store参数为reducer,action来的数据交给reducer处理,处理完返回给store,订阅store的页面就可以收到改变后的数据
const store = createStore(languageReducer); //创建一个store

export default store;
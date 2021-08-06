
//用于存储数据,store全局唯一

import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";    //语言切换
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";  //首页数据
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";


const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer
})
//store参数为reducer,action来的数据交给reducer处理,处理完返回给store,订阅store的页面就可以收到改变后的数据
//中间件执行顺序:https://segmentfault.com/a/1190000005766289
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog)); //创建一个store

//返回store的类型
export type RootState = ReturnType<typeof store.getState>


export default store;
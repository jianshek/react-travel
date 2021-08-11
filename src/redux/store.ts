
//用于存储数据,store全局唯一

import { createStore, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";    //语言切换
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";  //首页数据
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
//使用toolkit中的combineReducers代替redux中的combineReducers
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";  //数据持久化
import storage from "redux-persist/lib/storage"; 
import { shoppingCartSlice } from "./shoppingCart/slice";  //购物车
import { orderSlice } from "./order/slice";


/**
 * 持久化配置
 * key:命名空间,相当于数据的根目录
 * storage:存储方式,有storage和storageSession,storage为长期持久化,storageSession只保存当前页面打开,页面关闭,数据消失
 * whitelist:白名单,数组里保存的reducer
 * blacklist:黑名单,除了黑名单之外的reducer,都保存
 */
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  // blacklist:["language"],
}


const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

//store参数为reducer,action来的数据交给reducer处理,处理完返回给store,订阅store的页面就可以收到改变后的数据
//中间件执行顺序:https://segmentfault.com/a/1190000005766289
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog)); 
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({
      serializableCheck: false, //toolkit关闭序列化校验(redux-persist保存数据为空时,控制台会报错)
    }), actionLog], //因为toolkit有使用自己的中间件,所以先获取默认中间件,然后加入自定义的中间件
    devTools: true,  //开启redux调试
  });

//返回store的类型
export type RootState = ReturnType<typeof store.getState>

//创建持久化store
const persistor = persistStore(store)

export default { store, persistor };  //返回原来的store和持久化的store
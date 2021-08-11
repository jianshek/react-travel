import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";  //引入antd样式
import "./i18n/configs";   //引入国际化配置文件即可  
import { Provider } from "react-redux";  //引入Provider,redux就可以使用了
import rootStore from "./redux/store";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";  //相当于provider,提供数据(获取本地数据)


axios.defaults.headers['x-icode'] = 'FB80558A73FA658E'; //全局配置请求头


ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


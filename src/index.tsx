import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";  //引入antd样式
import "./i18n/configs";   //引入国际化配置文件即可  
import { Provider } from "react-redux";  //引入Provider,redux就可以使用了
import store from "./redux/store";
import axios from "axios";

axios.defaults.headers['x-icode'] = 'FB80558A73FA658E'; //全局配置请求头


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


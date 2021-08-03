import React from 'react';
import styles from "./App.module.css";
/**
 * BrowserRouter:路由导航和源生浏览器操作一致
 * Route:识别url
 * Switch:路径切换以页面为单位,防止页面堆叠
 *  */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage } from "./pages";


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />      {/*  exact:精准路由 */}
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} /> {/*  参数使用冒号开头 */}
          <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
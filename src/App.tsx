import React from 'react';
import styles from "./App.module.css";
/**
 * BrowserRouter:路由导航和源生浏览器操作一致
 * Route:识别url
 * Switch:路径切换以页面为单位,防止页面堆叠
 * Redirect:重定向
 *  */
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage,ShoppingCartPage } from "./pages";
import { useSelector } from "./redux/hooks";

/**
 * 判断是否已登录,如果登陆加载component,未登录重定向到登录页面
 * component:已登录加载的页面
 * isAuthenticated:是否登录
 * ...rest:其他参数
 */
const PrivateRoute = ({ component, isAuthenticated, ...rest }) => {
  const routeComponent = (props) => {
    return isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/signIn" }} />
    ); 
  }
  return <Route render={routeComponent} {...rest} />;
}

function App() {
  const jwt = useSelector((s) => s.user.token); //是否有token
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />      {/*  exact:精准路由 */}
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} /> {/*  参数使用冒号开头 */}
          <Route path="/search/:keywords?" component={SearchPage} />
          <PrivateRoute
            isAuthenticated={jwt !== null}
            path="/shoppingCart"
            component={ShoppingCartPage}
          />
          <Route render={() => <h1>404 not found 页面去火星了 ！</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
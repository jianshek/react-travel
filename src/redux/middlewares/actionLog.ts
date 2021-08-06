
//自定义中间件

import { Middleware } from "redux";

/**
 * Middleware = (store) => (next) => (action) => {} 为定义中间件的公式
 * redux源码是柯里化 + 箭头函数的语法
 * 柯里化:https://www.jianshu.com/p/1e1911f00e3a
 */
export const actionLog: Middleware = (store) => (next) => (action) => { //打印store中数据的前后变化
  console.log("state 更新前", store.getState());
  console.log("fire action ", action);
  next(action);
  console.log("state 更新后", store.getState());

};

/*
 上面创建中间件的方法相当于下面
function (store) {            //store:最新的store数据
  return function (next) {        //next:执行后续的中间件，中间件有可能有多个  
      return function (action) {...}    //中间件处理函数，action为当前执行的action 
  }
}
*/


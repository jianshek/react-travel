import React, {useState,useEffect} from 'react';
import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import styles from './App.module.css';
import logo from "./assets/images/logo.svg";
import ShoppingCart from "./components/ShoppingCart";
import RobotDiscount from "./components/RobotDiscount";

interface Props{

}
interface State{
  robotGallery: any[];
  count:number;
}

const App :React.FC = (props) => {
  const [count,setCount] = useState<number>(0);
  const [robotGallery,setRobotGallery] = useState<any>([]);
  const [error, setError] = useState<string>()
  
  /**
   * useEffect:副作用
   * [count]:跟踪count属性,count变化时会执行useEffect里的方法
   * []:相当于componentDidMount,只在页面第一次加载完成是执行useEffect里的方法
   * 如果不加参数,那么页面每次刷新都会调用useEffect里的方法(相当于componentDidUpdate),形成死循环
   */
  useEffect(()=>{
    document.title = `点击了${count}次`
  },[count])
  
  /**
   * useEffect:只能返回函数和null,不能返回promise,所以不能使用关键字async
   * 如果需要使用async/await,需要在内部建一个异步函数,然后调用这个异步函数
   */
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const responses = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        // .then(response => response.json())
        // .then(data => setRobotGallery(data))
        const data = await responses.json();
        setRobotGallery(data);
      } catch (e) {
        setError(e.message);
      }
    };
    //调用异步函数
    fetchData();
  },[]);

    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h1>罗伯特机器人炫酷吊炸天online购物平台的名字要长</h1>
        </div>
        <button onClick={()=>{
          setCount(count + 1)
        }}>
          加法
        </button>
        <label>{count}</label>
        <ShoppingCart />
        {(!error || error !== "") && <div>网站出错：{error}</div>}
        <div className={styles.robotList}>
        {robotGallery.map((r, index) =>
            index % 2 == 0 ? (
              <RobotDiscount key={r.id} id={r.id} email={r.email} name={r.name} />
            ) : (
              <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      </div>
    );
  }
  


export default App;

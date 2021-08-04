import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
  } from "react-redux";
  import { RootState } from "./store";
  /**
   * useSelector:钩子函数,获取store中的数据
   * TypedUseSelectorHook:接口,定义类型
   * 
   */
  export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
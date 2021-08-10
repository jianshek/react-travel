
//当有Header和Footer时的布局

import React from "react";
import styles from "./MainLayout.module.css";
import { Header, Footer } from "../../components";

export const MainLayout: React.FC = ({ children }) => { //children:组件的子节点
  return (
    <>
      <Header />
      {/* 页面内容 content */}
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
};

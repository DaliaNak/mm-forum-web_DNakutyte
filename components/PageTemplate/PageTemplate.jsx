import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

const PageTemplate = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageTemplate;

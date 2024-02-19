import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import cookie from "js-cookie";
import styles from "./styles.module.css";
import logo from "../../assets/images/mm-forum-logo.png";

const Header = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logoWrapper}>
        <img src={logo.src} className={styles.logo} />
      </div>
    </div>
  );
};

export default Header;

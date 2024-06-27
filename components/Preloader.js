// components/Loader.js

import React from 'react';
import styles from '../styles/Preloader.module.css'; // Assuming you use a CSS module

const Preloader = () => {
  return (

    <div className={styles.loader}>
      <span></span>
      <div id="dot-1" className={styles.dot}></div>
      <div id="dot-2" className={styles.dot}></div>
      <div id="dot-3" className={styles.dot}></div>
      <div id="dot-4" className={styles.dot}></div>
      <div id="dot-5" className={styles.dot}></div>
    </div>
  
  );
};

export default Preloader;

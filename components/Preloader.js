'use client';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Preloader.module.css'; // Ensure the path is correct

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 600);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingBar} style={{ width: `${progress}%` }} />
      <div className={styles.loadingText}>{progress}%</div>
    </div>
  );
};

export default Preloader;

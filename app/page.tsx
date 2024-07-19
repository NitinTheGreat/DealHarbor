'use client';
import { useEffect, useState } from 'react';
import "../styles/page.css";

const Home = () => {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setDevice('mobile');
      } else if (width <= 1024) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const iframeSrc: { [key in 'mobile' | 'tablet' | 'desktop']: string } = {
    mobile: 'https://my.spline.design/zerogravityphysicslandingpagecopy-f55a9e360d82c3ab3084ee4aabe4dbad/',
    tablet: 'https://my.spline.design/zerogravityphysicslandingpagecopy-f55a9e360d82c3ab3084ee4aabe4dbad/',
    desktop: 'https://my.spline.design/zerogravityphysicslandingpagecopy-f55a9e360d82c3ab3084ee4aabe4dbad/',
  };

  return (
    <main>
      <iframe
        src={iframeSrc[device]}
        frameBorder="0"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Zero Gravity Physics Landing Page"
      ></iframe>
    </main>
  );
};

export default Home;

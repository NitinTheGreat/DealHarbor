import Spline from '@splinetool/react-spline/next';
import Image from "next/image";
import "../styles/page.css";

export default function Home() {
  return (
    <>
     <main>
      <Spline
        scene="https://prod.spline.design/RMk95tdu8E7HOdlS/scene.splinecode"
      />
    </main>
    {/* <iframe src='https://my.spline.design/zerogravityphysicslandingpagecopy-245385a8e9e75863bd61b568c708e346/' frameBorder='0' width='100%' height='100%'></iframe> */}
    {/* <iframe className="spline" src='https://my.spline.design/purple3diconscopy-b50e3c8fb74cd3d019ce5f11de2f0bbc/' frameBorder='0' width='100%' height='100%'></iframe> */}
      {/* <iframe className="spline" src='https://my.spline.design/purple3diconscopy-b50e3c8fb74cd3d019ce5f11de2f0bbc/' frameBorder='0' width='100%' height='100%'></iframe> */}
    </>
  );
}


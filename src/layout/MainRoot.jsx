import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import bg from "../assets/images/bg.webp";
import { useState, useEffect, useRef } from "react";
import MobileHeader from "./Header/MobileHeader";

const MainRoot = () => {
  const [spotlights, setSpotlights] = useState([]);
  const lastCreated = useRef(0);
  const counter = useRef(0);

  useEffect(() => {
    const handlePointerMove = (e) => {
      const now = Date.now();
      if (now - lastCreated.current >= 200) {
        const id = ++counter.current;
        setSpotlights((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
        lastCreated.current = now;
        setTimeout(() => {
          setSpotlights((prev) => prev.filter((s) => s.id !== id));
        }, 1000);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeOut {
            from { opacity: 0.6; }
            to { opacity: 0; }
          }
        `}
      </style>
      <div className="fixed inset-0 h-screen w-screen z-0">
        <div className="absolute inset-0 bg-black opacity-85" />
        <div className="absolute inset-0 h-screen w-screen bg-gradient-to-t from-black to-transparent" />
        {spotlights.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full z-[10] bg-[#1FCCFF] blur-[70px]"
            style={{
              width: "200px",
              height: "200px",
              left: s.x - 100,
              top: s.y - 100,
              pointerEvents: "none",
              animation: "fadeOut 1s ease-in-out",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 pointer-events-auto">
        <Header className="pointer-events-auto" />
        <MobileHeader className="pointer-events-auto" />
        <Outlet />
        <Footer className="pointer-events-auto" />
      </div>
    </>
  );
};

export default MainRoot;

import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import bg from "../assets/images/bg.jpg";
import { useState, useEffect } from "react";

const MainRoot = () => {
  const [spotlightPosition, setSpotlightPosition] = useState({
    x: -100,
    y: -100,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId;
    const handlePointerMove = (e) => {
      setSpotlightPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 h-screen w-screen z-0">
        <div className="absolute inset-0 bg-black opacity-85" />
        <div className="absolute inset-0 h-screen w-screen bg-gradient-to-t from-black to-transparent" />
        <div
          className={`absolute rounded-full z-[10] bg-[#1FCCFF] blur-[70px] transition-opacity duration-500 ${
            isVisible ? "opacity-60" : "opacity-0"
          }`}
          style={{
            width: "200px",
            height: "200px",
            left: spotlightPosition.x - 100,
            top: spotlightPosition.y - 100,
            pointerEvents: "none",
          }}
        />
      </div>
      <div className="relative z-10 pointer-events-auto">
        <Header className="pointer-events-auto" />
        <Outlet />
        <Footer className="pointer-events-auto" />
      </div>
    </>
  );
};

export default MainRoot;

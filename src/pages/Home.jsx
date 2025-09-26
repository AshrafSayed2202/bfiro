import React, { useState, useEffect, useRef } from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import PricingSection from "../components/PricingSection";
import KitsSection from "../components/KitsSection";
import FAQSection from "../components/FAQSection";
import CompaniesSection from "../components/CompaniesSection";
import HaveDesignSection from "../components/HaveDesignSection";
import Side from "../UI/Side";
import ConnectForm from "../UI/ConnectForm";

const Home = () => {
  const [spotlights, setSpotlights] = useState([]);
  const lastCreated = useRef(0);
  const counter = useRef(0);
  const [isConnectOpen, setConnectOpen] = useState(false);

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
      <div className="relative z-10 pointer-events-auto overflow-x-hidden">
        <HeroSection setConnectOpen={setConnectOpen} />
        <AboutSection />
        <PricingSection />
        <KitsSection />
        <FAQSection setConnectOpen={setConnectOpen} />
        <CompaniesSection />
        <HaveDesignSection setConnectOpen={setConnectOpen} />
        <Side isOpen={isConnectOpen} setIsOpen={setConnectOpen}>
          <ConnectForm />
        </Side>
      </div>
    </>
  );
};

export default Home;
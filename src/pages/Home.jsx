import React, { useState } from "react";
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
  const [isConnectOpen, setConnectOpen] = useState(false);
  return (
    <div className="overflow-x-hidden">
      <HeroSection setConnectOpen={setConnectOpen} />
      <AboutSection />
      <PricingSection />
      <KitsSection />
      <FAQSection setConnectOpen={setConnectOpen} />
      <CompaniesSection />
      <HaveDesignSection setConnectOpen={setConnectOpen}/>
      <Side isOpen={isConnectOpen} setIsOpen={setConnectOpen}>
        <ConnectForm />
      </Side>
    </div>
  );
};

export default Home;

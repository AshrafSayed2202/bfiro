import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import MobileHeader from "./Header/MobileHeader";
import ArrowSection from "../components/ArrowSection";

const MainRoot = () => {
  return (
    <>
      <div className="relative z-10 pointer-events-auto">
        <Header className="pointer-events-auto" />
        <MobileHeader className="pointer-events-auto" />
        <Outlet />
        <ArrowSection />
        <Footer className="pointer-events-auto" />
      </div>
    </>
  );
};

export default MainRoot;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoot from "../layout/MainRoot";
import React from "react";
import ScrollToTop from "../utils/ScrollToTop";
import Home from "../pages/Home.jsx";
import ProductDetails from "../pages/Products/ProductDetails.jsx";
import Pricing from "../pages/Pricing/Pricing.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import UIKits from "../pages/Products/UIKits.jsx";
import Portfolio from "../pages/Portfolio/Portfolio.jsx";
import UXCamp from "../pages/UXCamp/UXCamp.jsx";
import Settings from "../pages/Profile/Settings.jsx";

const MainRoute = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainRoot />}>
            <Route index element={<Home />} />
            <Route path="browse/:id" element={<ProductDetails />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ui-kits" element={<UIKits />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="ux-camp/:id" element={<UXCamp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MainRoute;

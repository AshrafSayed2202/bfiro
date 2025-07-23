import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoot from "../layout/MainRoot";
import React from "react";
import ScrollToTop from "../utils/ScrollToTop";
import Home from "../pages/Home/Home.jsx";

const MainRoute = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainRoot />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MainRoute;

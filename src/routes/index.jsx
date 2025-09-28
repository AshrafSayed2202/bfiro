import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRoot from "../layout/MainRoot.jsx";
import React from "react";
import ScrollToTop from "../utils/ScrollToTop";
import Home from "../pages/Home.jsx";
import ProductDetails from "../pages/Products/ProductDetails.jsx";
import Pricing from "../pages/Pricing/Pricing.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import ProductsPage from "../pages/Products/ProductsPage.jsx";
import Portfolio from "../pages/Portfolio/Portfolio.jsx";
import UXCamp from "../pages/UXCamp/UXCamp.jsx";
import Settings from "../pages/Profile/Settings.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/SignUp.jsx";
import PasswordReset from "../pages/PasswordReset.jsx";
import PasswordSetup from "../pages/PasswordSetup.jsx";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import AuthRoute from "../utils/AuthRoute.jsx";
import { useSelector } from "react-redux";

const MainRoute = () => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = user;
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="login"
            element={
              <AuthRoute isAuthenticated={isAuthenticated}>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRoute isAuthenticated={isAuthenticated}>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="password-reset"
            element={
              <AuthRoute isAuthenticated={isAuthenticated}>
                <PasswordReset />
              </AuthRoute>
            }
          />
          <Route
            path="password-setup"
            element={
              <AuthRoute isAuthenticated={isAuthenticated}>
                <PasswordSetup />
              </AuthRoute>
            }
          />
          <Route path="/" element={<MainRoot />}>
            <Route index element={<Home />} />
            <Route path="products/:type/:id" element={<ProductDetails />} />
            <Route path="pricing" element={<Pricing />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="settings"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/ui-kits"
              element={
                <ProductsPage
                  title={"UI Kits"}
                  subTitle={"premium UI Kits for mobile & web projects"}
                  formatsList={[
                    "Figma",
                    "Framer",
                    "Illustrator",
                    "React",
                    "Blender",
                  ]}
                />
              }
            />
            <Route
              path="products/coded-templates"
              element={
                <ProductsPage
                  title={"Coded Templates"}
                  subTitle={
                    "launch-ready coded templates for AI, SaaS, landing pages, apps, and more."
                  }
                  formatsList={[
                    "Lunacy",
                    "Swift",
                    "After Effects",
                    "Photoshop",
                    "Xcode",
                    "Figma",
                    "React",
                    "XD",
                    "Framer",
                    "Sketch",
                  ]}
                />
              }
            />
            <Route
              path="products/icons"
              element={
                <ProductsPage
                  title={"Icons"}
                  subTitle={
                    "icon packs for web, iOS, Android, and print-ready design projects."
                  }
                  formatsList={[
                    "Illustrator",
                    "PowerPoint",
                    "3D Studio Max",
                    "InVision",
                    "React",
                    "After Effects",
                    "Keynote",
                    "Sketch",
                    "Blender",
                    "Lottie",
                    "Swift",
                    "Cinema 4D",
                    "Lunacy",
                    "Xcode",
                    "Figma",
                    "Maya",
                    "XD",
                    "Framer",
                    "Photoshop",
                  ]}
                />
              }
            />
            <Route
              path="products/illustrations"
              element={
                <ProductsPage
                  title={"Illustrations"}
                  subTitle={
                    "customizable vector illustrations for websites, apps, and content."
                  }
                  formatsList={[
                    "Figma",
                    "Lunacy",
                    "3D Studio Max",
                    "Framer",
                    "Photoshop",
                    "After Effects",
                    "Illustrator",
                    "PowerPoint",
                    "Blender",
                    "Keynote",
                    "Sketch",
                    "Cinema 4D",
                    "Lottie",
                    "XD",
                  ]}
                />
              }
            />
            <Route
              path="products/fonts"
              element={
                <ProductsPage
                  title={"Fonts"}
                  subTitle={
                    "handcrafted fonts for branding, UI design, and digital products."
                  }
                  formatsList={[]}
                />
              }
            />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="ux-camp/:id" element={<UXCamp />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default MainRoute;

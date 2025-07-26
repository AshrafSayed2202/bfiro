import { NavLink } from "react-router-dom";
import logo from "../../assets/images/bfiro.png";
import logo2 from "../../assets/images/bfiro2.png";
import logo3 from "../../assets/images/bfiro3.png";
import logo4 from "../../assets/images/bfiro4.png";
import { FiSearch } from "react-icons/fi";
import Cart from "../../assets/images/svgs/Cart";
import { useEffect, useState } from "react";
import UIUX from "../../assets/images/svgs/UIUX";
import Code from "../../assets/images/svgs/Code";
import IconSet from "../../assets/images/svgs/IconSet";
import Illustrations from "../../assets/images/svgs/Illustrations";
import Fonts from "../../assets/images/svgs/Fonts";
import bfiroWhite from "../../assets/images/bfiro-white.png";
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productsHovered, setProductsHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="sticky top-0 z-[99]">
      <div
        className={`h-[100px] ${scrolled ? "bg-[#1212129d] " : "bg-transparent"}  transition-all duration-500 filter-blur-4 ${productsHovered ? "" : "rounded-b-[20px]"}`}
      >
        <div className="flex items-center   justify-between gap-8 mx-auto content-contain">
          <div className="flex items-center justify-start gap-[55px] flex-1 text-[20px] leading-[20px] ">
            <NavLink
              to={"/"}
              className="h-[67px] w-[52px] relative group cursor-pointer"
            >
              <img
                src={logo}
                className="absolute inset-0 object-contain w-full h-full transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                alt="Logo"
              />
              <img
                src={logo2}
                className="absolute inset-0 object-contain w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                alt="Logo2"
              />
              <img
                src={logo3}
                className="absolute inset-0 object-contain w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                alt="Logo3"
                style={{ transitionDelay: "0.5s" }}
              />
              <img
                src={logo4}
                className="absolute inset-0 object-contain w-full h-full transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                alt="Logo4"
                style={{ transitionDelay: "1s" }}
              />
            </NavLink>

            <div className="flex items-center gap-8 font-[600] h-[100px]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/browse"
                onMouseEnter={() => setProductsHovered(true)}
                className={({ isActive }) =>
                  `trans-3 group h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"} ${productsHovered ? "text-white" : ""}`
                }
              >
                Product
              </NavLink>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
                }
              >
                Portfolio
              </NavLink>
              <NavLink
                to="/pricing"
                className={({ isActive }) =>
                  `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
                }
              >
                Pricing
              </NavLink>
              <NavLink
                to="/ux-camp"
                className={({ isActive }) =>
                  `trans-3  relative p-[8px] rounded-[8px] overflow-hidden group trans-3  hover:text-white hover:bg-blue-gradient ${
                    isActive
                      ? ""
                      : "text-gray-400 hover:text-white text-blue-gradient"
                  }`
                }
              >
                UX Camp
                <span className="bg-white opacity-20 w-full h-full absolute top-0 left-0 trans-5 bgSpan z-[-1]"></span>
              </NavLink>
              <button className="text-gray-400 trans-3 hover:text-white text-[32px]">
                <FiSearch />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-8 font-[600] text-[20px] h-[100px]">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
              }
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `trans-3 h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
              }
            >
              Log in
            </NavLink>
            <NavLink to="/cart">
              <Cart />
            </NavLink>
          </div>
        </div>
      </div>
      <div
        onMouseLeave={() => setProductsHovered(false)}
        className={`absolute top-full left-0 w-full rounded-b-[20px] transition-all duration-300  ${
          scrolled ? "bg-[#1212129d]" : "bg-transparent"
        } filter-blur-4 ${productsHovered ? "flex" : "hidden"}`}
      >
        <div className="content-contain text-[18px] text-[#9CA7B4] font-[600] flex justify-start items-center gap-[16px] py-[30px]">
          <button className="border hover:border-[#1fccff] cursor-pointer group border-[#5B5E79] gap-[10px] trans-3 hover:text-white rounded-[20px] size-[192px] p-1 flex flex-col items-center justify-center">
            <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
              <UIUX className={"size-[35px]"} />
            </span>
            UI Kits
          </button>
          <button className="border hover:border-[#1fccff] cursor-pointer group border-[#5B5E79] gap-[10px] trans-3 hover:text-white rounded-[20px] size-[192px] p-1 flex flex-col items-center justify-center">
            <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
              <Code className={"size-[35px]"} />
            </span>
            Coded Templates
          </button>
          <button className="border hover:border-[#1fccff] cursor-pointer group border-[#5B5E79] gap-[10px] trans-3 hover:text-white rounded-[20px] size-[192px] p-1 flex flex-col items-center justify-center">
            <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
              <IconSet className={"size-[35px]"} />
            </span>
            Icons
          </button>
          <button className="border hover:border-[#1fccff] cursor-pointer group border-[#5B5E79] gap-[10px] trans-3 hover:text-white rounded-[20px] size-[192px] p-1 flex flex-col items-center justify-center">
            <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
              <Illustrations className={"size-[35px]"} />
            </span>
            Illustrations
          </button>
          <button className="border hover:border-[#1fccff] cursor-pointer group border-[#5B5E79] gap-[10px] trans-3 hover:text-white rounded-[20px] size-[192px] p-1 flex flex-col items-center justify-center">
            <span className="rounded-full size-[60px] bg-[#5B5E79] flex items-center  justify-center ">
              <Fonts className={"size-[35px]"} />
            </span>
            Fonts
          </button>
          <div className="bgBlue h-full flex-1 relative rounded-[20px] border py-[20px] gap-[14px] flex flex-col items-start justify-start px-[16px] border-[#5B5E79] overflow-hidden">
            <span className="absolute top-0 left-0 w-full z-[1]  bgGradient h-full"></span>
            <span className="relative z-[2] w-[35px] overflow-hidden flex items-center justify-center">
              <img src={bfiroWhite} className="w-full h-full object-contain" />
            </span>
            <span className="relative z-[3] text-[24px] font-[600] text-white">
              Yearly Access for 100$
            </span>
            <button className="relative z-[4]">Get it</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

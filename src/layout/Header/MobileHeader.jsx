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
import MainBtn from "../../UI/MainBtn";
import { HiOutlineMenu } from "react-icons/hi";
const MobileHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed w-full top-0 z-[99] block md:hidden ">
      <div
        className={`h-[90px] ${scrolled ? "bg-[#1212129d] " : "bg-transparent"} px-[15px]  flex items-center transition-all duration-500 filter-blur-4`}
      >
        <div className="flex items-center  justify-between gap-8 mx-auto content-contain">
          <div className="flex items-center justify-between gap-[55px] flex-1 text-[18px] lg:text-[20px] leading-[20px] ">
            <NavLink
              to={"/"}
              className="h-[67px] w-[50px] relative group cursor-pointer"
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
            <div className="flex items-center text-[32px] text-[#9CA7B4] justify-center gap-[30px]">
              <div className="cursor-pointer hover:text-white trans-3">
                <FiSearch />
              </div>
              <div>
                <Cart />
              </div>
              <div className="cursor-pointer hover:text-white trans-3">
                <HiOutlineMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

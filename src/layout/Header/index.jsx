import { NavLink } from "react-router-dom";
import logo from "../../assets/images/bfiro.png";
import logo2 from "../../assets/images/bfiro2.png";
import logo3 from "../../assets/images/bfiro3.png";
import logo4 from "../../assets/images/bfiro4.png";
import { FiSearch } from "react-icons/fi";
import Cart from "../../assets/images/svgs/Cart";
const Header = () => {
  return (
    <div className="bg-[#1212129d] filter-blur fixed w-full top-0 h-[100px] flex items-center  rounded-b-[20px] z-50">
      <div className="flex items-center justify-between gap-8 mx-auto content-contain">
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
              className={({ isActive }) =>
                `trans-3 group h-full flex items-center justify-center ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
              }
            >
              Product
              {/* <div className="absolute top-full trans-3 bg-red-200 left-0 w-full h-full group-hover:opacity-100 group-hover:z-[999] opacity-0 z-[-1]">
                HH
              </div> */}
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
                `trans-3  relative p-[8px] rounded-[8px] overflow-hidden group trans-3  hover:text-white hover:bg-blue-gradient ${isActive
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
  );
};

export default Header;

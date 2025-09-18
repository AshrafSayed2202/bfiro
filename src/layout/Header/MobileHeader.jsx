import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/bfiro.png";
import logo2 from "../../assets/images/bfiro2.png";
import logo3 from "../../assets/images/bfiro3.png";
import logo4 from "../../assets/images/bfiro4.png";
import { FiSearch } from "react-icons/fi";
import Cart from "../../assets/images/svgs/Cart";
import { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import Side from "../../UI/Side";
import CartSide from "../../UI/CartSide";
import { useCart } from "../../store/Cart";
import fawzy from "../../assets/images/fawzy.png";
import Inbox from "../../assets/images/svgs/Inbox";
import NotificationSide from "../../UI/NotificationSide";
import MobileNavSide from "../../UI/MobileNavSide";
import SearchModal from "../../components/SearchModal";

const MobileHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logged, setLogged] = useState(true);
  const [notificationSideOpen, setNotificationSideOpen] = useState(false);
  const location = useLocation();
  const [cartSideOpen, setCartSideOpen] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();
  const handleOpenSearch = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.set('search', '1');
    navigate(`${location.pathname}?${currentParams.toString()}`, { replace: true });
  };
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="fixed w-full top-0 z-[99] block md:hidden ">
        <div
          className={`h-[90px] ${scrolled ? "bg-[#1212129d] " : "bg-transparent"} px-[15px] rounded-b-[20px] flex items-center transition-all duration-500 filter-blur-4`}
        >
          <div className="flex items-center  justify-between gap-8 mx-auto content-contain">
            <div className="flex items-center justify-between gap-[55px] flex-1 text-[18px] lg:text-[20px] leading-[20px] ">
              <NavLink
                to={"/"}
                className="size-[54px] relative group cursor-pointer"
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
                <button
                  className="cursor-pointer hover:text-white trans-3"
                  onClick={handleOpenSearch}>
                  <FiSearch />
                </button>
                {logged && (
                  <div className="relative cursor-pointer"
                    onClick={() => setNotificationSideOpen(true)}
                  >
                    <Inbox />
                  </div>
                )}
                <div onClick={() => setCartSideOpen(true)} className="relative cursor-pointer">
                  <Cart />
                  {cart.items.length > 0 && (
                    <span className="bg-[#34C759] size-[18px] absolute top-[-8px] right-[-8px] rounded-full trans-5 outline  outline-[#121212] text-white text-[12px] flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </div>
                <div className="cursor-pointer hover:text-white trans-3" onClick={() => setMenuOpen(true)}>
                  {!logged ? (
                    <HiOutlineMenu />
                  ) : (
                    <div
                      className="size-[46px] border-[3px] border-[#121212] outline-[#424242ce] outline rounded-full overflow-hidden flex items-center justify-center"
                    >
                      <img src={fawzy} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Side isOpen={notificationSideOpen} setIsOpen={setNotificationSideOpen}>
        <NotificationSide />
      </Side>
      <Side isOpen={cartSideOpen} setIsOpen={setCartSideOpen} classNames={"!rounded-none"}>
        <CartSide setIsOpen={setCartSideOpen} />
      </Side>
      <Side isOpen={menuOpen} setIsOpen={setMenuOpen} isAnimated={false} classNames={'!w-screen !rounded-none !py-[17px]'}
        headContent={<NavLink
          to={"/"}
          className="size-[54px] relative group cursor-pointer"
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
        </NavLink>}>
        <MobileNavSide setIsOpen={setMenuOpen} />
      </Side>
      <SearchModal />
    </>
  );
};

export default MobileHeader;

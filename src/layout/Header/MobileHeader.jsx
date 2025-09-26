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
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [cardSideHead, setCardSideHead] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

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
  const pathname = useLocation().pathname;
  useEffect(() => {
    if (cart.items.length > 0) {
      if (showCheckout) {
        setCardSideHead(
          <span className='flex gap-1 items-center font-[600] border-[2px] rounded-xl bg-[#1D1C1E] border-[#2194FF] py-[10px] px-[18px] sm:opacity-0 sm:select-none sm:pointer-events-none'>
            Stripe
          </span>
        );
      } else {
        setCardSideHead(
          <div className='flex gap-1 items-center font-[600] border-[2px] rounded-xl bg-[#1D1C1E] border-[#FF4A4A] hover:underline cursor-pointer py-[10px] px-[18px] sm:opacity-0 sm:select-none sm:pointer-events-none' onClick={() => clearCart()}>
            Clear Cart
          </div>
        );
      }
    } else {
      setCardSideHead(<div className="flex flex-col">
        <h1 className="text-[30px] font-[400]">
          Cart
        </h1>
        <p className="text-[16px] opacity-80">
          Your cart is empty.
        </p>
      </div>);
    }
  }, [cart, showCheckout]);
  return (
    <>
      <div className="fixed w-full top-0 z-[99] block md:hidden ">
        <div
          className={`h-[90px] ${scrolled ? "bg-[rgba(24,24,24,0.98)] " : "bg-transparent"} px-[15px] ${pathname.includes("products") ? "" : "rounded-b-[20px]"}  flex items-center transition-all duration-500 filter-blur-4`}
        >
          <div className="flex items-center  justify-between gap-8 mx-auto content-contain">
            <div className="flex items-center justify-between gap-[55px] flex-1 text-[18px] lg:text-[20px] leading-[20px] ">
              <NavLink
                to={"/"}
                className="size-[43px] xs:!size-[54px] relative group cursor-pointer"
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
                  <FiSearch className="size-[24px] xs:size-[32px]" />
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
                    <HiOutlineMenu className="size-[24px] xs:size-[32px]" />
                  ) : (
                    <div
                      className="size-[36px] xs:size-[46px] border-[1px] xs:border-[3px] border-[#121212] outline-[#424242ce] outline rounded-full overflow-hidden flex items-center justify-center"
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
      <Side isOpen={cartSideOpen} setIsOpen={setCartSideOpen} classNames={"!rounded-none"} headContent={cardSideHead}>
        <CartSide setIsOpen={setCartSideOpen} showCheckout={showCheckout} setShowCheckout={setShowCheckout} />
      </Side>
      <Side isOpen={menuOpen} setIsOpen={setMenuOpen} isAnimated={false} classNames={'!w-screen !rounded-none'}
        headContent={<NavLink
          to={"/"}
          className="size-[43px] xs:!size-[54px] relative group cursor-pointer"
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

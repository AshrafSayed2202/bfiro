import { Link } from "react-router-dom";
import logoWhite from "../../assets/images/bfiro-white.png";
import CustomInput from "../../UI/CustomInput";
import { LuArrowRight } from "react-icons/lu";
import Figma from "../../assets/images/svgs/Figma";
import Behance from "../../assets/images/svgs/Behance";
import Dribble from "../../assets/images/svgs/Dribble";
import Instagram from "../../assets/images/svgs/Instagram";
import Linkedin from "../../assets/images/svgs/Linkedin";
import Email from "../../assets/images/svgs/Email";
const Footer = () => {
  return (
    <div className="bg-[#181818c2] pt-[50px] pb-[40px] hidden md:flex flex-col gap-[120px]">
      <div className="content-contain flex items-start justify-between">
        <div className="flex items-start justify-between gap-[63px]">
          <Link
            to={"/"}
            className="w-[50px] flex items-center justify-center overflow-hidden"
          >
            <img src={logoWhite} className="w-full object-contain" />
          </Link>
          <div className="font-[600]  mt-[20px] grid grid-cols-4 gap-[60px] leading-[20px]">
            <div className="flex flex-col gap-[48px] text-[20px]  ">
              <h4>Browse</h4>
              <ul className="font-[300] !text-[18px] text-gray-400 flex flex-col gap-[32px]  ">
                <li className="trans-3  hover:text-white">
                  <Link>Home</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>About Us</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Protfolio</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Pricing</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[48px] text-[20px]">
              <h4>Products</h4>
              <ul className="font-[300] !text-[18px] text-gray-400 flex flex-col gap-[32px]">
                <li className="trans-3 hover:text-white">
                  <Link>UI Kits</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Coded Templates</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Icon Sets</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Illustrations</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[48px] text-[20px]">
              <h4>UX Camp</h4>
              <ul className="font-[300] !text-[18px] text-gray-400 flex flex-col gap-[32px]">
                <li className="trans-3 hover:text-white">
                  <Link>Info</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Calendar</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Materials</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Verified</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[48px] text-[20px]">
              <h4>Others</h4>
              <ul className="font-[300] !text-[18px] text-gray-400 flex flex-col gap-[32px]">
                <li className="trans-3 hover:text-white">
                  <Link>Terms & Licensing</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Policies</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Partner</Link>
                </li>
                <li className="trans-3 hover:text-white">
                  <Link>Team</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[38px] ">
          <div className="flex flex-col gap-[16px]">
            <h4 className="font-semibold text-[20px] mt-[20px]">
              Join our newsletter, get discounts 🔥
            </h4>
            <CustomInput
              label={"Email"}
              type="email"
              inputClass={"pr-[50px]"}
              required
              placeholder={"designer@example.com"}
            >
              <button className="absolute  size-[32px] text-[22px] flex items-center justify-center rounded-full text-[#9CA7B4] border-2 border-[#9CA7B4] top-1/2 right-3 -translate-y-1/2 !cursor-pointer z-[3]">
                <LuArrowRight />
              </button>
            </CustomInput>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h4 className="font-semibold text-[20px] mt-[20px]">
              Contact with us
            </h4>
            <div className="flex items-center justify-start gap-[14px]">
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Figma />
              </Link>
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Behance />
              </Link>
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Dribble />
              </Link>
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Instagram />
              </Link>
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Linkedin />
              </Link>
              <Link
                to={"#"}
                target="_blank"
                className="rounded-full group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
              >
                <Email />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="content-contain font-[300] text-[#4b4b4b]">
        {new Date().getFullYear()} Powered by Bfiro
      </div>
    </div>
  );
};

export default Footer;

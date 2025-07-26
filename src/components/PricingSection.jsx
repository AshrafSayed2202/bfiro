import React from "react";
import Card from "../UI/Card";
import True from "../assets/images/svgs/True";
import bg from "../assets/images/pricingBG.png";
import MainBtn from "../UI/MainBtn";
import Stars from "../assets/images/svgs/Stars";
import { motion } from "framer-motion";
const PricingSection = () => {
  return (
    <div className="content-contain grid grid-cols-12 gap-[5px] pt-[5px] relative z-[25] mb-[5px]">
      <Card
        className={
          "col-span-12 flex flex-col gap-[20px] items-center justify-center p-[50px]  relative"
        }
      >
        <img
          src={bg}
          className="absolute h-[224px] bottom-0 w-full object-cover"
        />
        <h2 className="text-[40px] text-blue-gradient-90 font-[700] text-center">
          Starting From
        </h2>
        <ul className="flex flex-wrap justify-center gap-[8px] font-[400]">
          <li className="bg-[#070707] text-[#2D68FF] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap ">
            Websites
          </li>
          <li className="bg-[#070707] text-[#2D68FF] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap ">
            Mobile Apps
          </li>
          <li className="bg-[#070707] text-[#2D68FF] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap ">
            Landing Pages
          </li>
          <li className="bg-[#070707] text-[#2D68FF] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap ">
            E-Commerce
          </li>
          <li className="bg-[#070707] text-[#2D68FF] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap ">
            Dashboards
          </li>
          <li className="bg-[#070707] text-[#FFA500] p-[12px] opacity-80 rounded-[8px] flex-1 text-nowrap flex items-center gap-[8px]">
            Sr. Designers <True />
          </li>
        </ul>
        <bold className="relative float">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-[3px] text-[65px] xs:text-[90px] md:text-[160px] font-[700] text-[#8D8D8D] -translate-y-1/2 z-[3]">
            $3,000
          </span>
          <span className="text-[65px] xs:text-[90px] md:text-[160px] font-[700] text-gray-gradient relative z-[3]">
            $3,000
          </span>
        </bold>
        <motion.div whileHover="hover" initial="initial">
          <MainBtn
            text={
              <span className="flex gap-2 items-center ">
                <Stars />
                Our Prices
              </span>
            }
            className={"group"}
            spanClass="px-[65px] !font-[300]"
          ></MainBtn>
        </motion.div>
      </Card>
    </div>
  );
};

export default PricingSection;

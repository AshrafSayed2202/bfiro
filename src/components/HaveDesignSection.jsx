import React from "react";
import Card from "../UI/Card";
import bg from "../assets/images/havedesignBG.png";
import MainBtn from "../UI/MainBtn";
import Stars from "../assets/images/svgs/Stars";
import { motion } from "framer-motion";
const HaveDesignSection = () => {
  return (
    <div className="content-contain flex gap-[5px]  relative z-[25] mb-[5px]">
      <Card
        className={
          "flex flex-1 flex-col gap-[10px] md:gap-[24px] items-center justify-center !px-[40px] !py-[128px] relative text-center"
        }
      >
        <img
          src={bg}
          className="absolute h-full w-full top-0 left-1/2 -translate-x-1/2  object-cover"
        />
        <h2 className="text-[36px] md:text-[48px] font-[600]">Have a <br className="block xs:hidden" /> design idea?</h2>
        <p className="text-[20px] md:text-[24px] text-[#9CA7B4] font-[300] mb-[10px] md:mb-[20px]">
          Let’s work together
        </p>
        <motion.div whileHover="hover" initial="initial">
          <MainBtn
            text={
              <span className="flex gap-2 items-center ">
                <Stars />
                Get in Touch
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

export default HaveDesignSection;

import React from "react";
import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";
const ArrowSection = () => {
  return (
    <div className="content-contain flex flex-col justify-center items-end relative z-[25] pt-[50px] pb-[36px]">
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-full text-[30px] text-[#9CA7B4] hover:text-[#ffffff] group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
      >
        <FiArrowUp />
      </motion.button>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-[12px] w-full font-normal text-[#424242] block md:hidden">
        2025 Powered by Bfiro
      </motion.p>
    </div>
  );
};

export default ArrowSection;

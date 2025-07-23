import React from "react";
import { FiArrowUp } from "react-icons/fi";
const ArrowSection = () => {
  return (
    <div className="content-contain flex justify-end items-center relative z-[25] py-[50px]">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-full text-[30px] text-[#9CA7B4] hover:text-[#ffffff] group flex items-center justify-center size-[55px] hover:border-[#ffffff] trans-3 border-[#9ca7b48a] border-[3px]"
      >
        <FiArrowUp />
      </button>
    </div>
  );
};

export default ArrowSection;

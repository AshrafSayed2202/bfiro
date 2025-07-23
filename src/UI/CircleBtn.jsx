import React from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const CircleBtn = ({ to = "#", text = "next", dir = "right" }) => {
  return (
    <Link to={to} className="group relative !cursor-pointer">
      <span
        className={`text-[40px] absolute trans-8 ${dir == "right" ? "top-1/2 left-0 text-[#9CA7B4]  translate-x-[6px] -translate-y-[20px] group-hover:translate-x-[220%]" : "top-1/2 right-[-15px] text-[#9CA7B4] -translate-x-[6px] -translate-y-[20px] group-hover:-translate-x-[220%] "} group-hover:opacity-0`}
      >
        {dir == "right" ? <BsArrowRight /> : <BsArrowLeft />}
      </span>
      <div className="relative group shadowGlur  w-[70px] flex items-center justify-end">
        <button
          className={`size-[55px] relative border-[3px] overflow-hidden border-[#9CA7B4] trans-5 group-hover:border-[#1FCCFF] rounded-full ${dir == "right" ? "invertedBtn" : "invertedBtnRev"} group-hover:mask-none`}
          style={{ maskSize: "20px 24px" }}
        ></button>
        <span
          className={`absolute trans-8 group-hover:text-[#1FCCFF] opacity-0 group-hover:opacity-100 top-1/2  ${
            dir == "right"
              ? "-left-[50%] group-hover:left-1/2 group-hover:-translate-x-[20px] -translate-y-1/2"
              : "right-[-50%] group-hover:right-1/2 group-hover:translate-x-[35px] -translate-y-1/2"
          } trans-5 `}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default CircleBtn;

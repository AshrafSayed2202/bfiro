import React from "react";
import starsBG from "../assets/images/stars.png";
const MainBtn = ({
  text = "",
  disabled = false,
  className,
  spanClass,
  onClick = () => { },
}) => {
  return (
    <div className="relative group scale-[0.85] md:scale-100">
      <div className="absolute left-0 top-0 w-full h-full group-hover:opacity-100 opacity-0 trans-3 animationspacefloot ">
        <img
          src={starsBG}
          className="absolute top-1/2 -translate-y-1/2 left-1/2  w-[calc(100%+100px)] h-[calc(100%+100px)]"
          alt="stars"
        />
        <img
          src={starsBG}
          className="absolute top-1/2 -translate-y-1/2 -left-1/2  rotate-180 w-[calc(100%+100px)] h-[calc(100%+100px)]"
          alt="stars"
        />
        <img
          src={starsBG}
          className="absolute top-1/2 -translate-y-1/2 left-0  rotate-90 w-[calc(100%+100px)] h-[calc(100%+100px)]"
          alt="stars"
        />
        <img
          src={starsBG}
          className="absolute top-1/2 -translate-y-1/2 left-0 rotate-45 w-[calc(100%+100px)] h-[calc(100%+100px)]"
          alt="stars"
        />
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`main-btn relative p-[2px] group rounded-[50px] overflow-hidden bg-gradient-to-r from-[#1fccff] to-[#2D68FF] shadow-[0_4px_0_0_#2D68FF] border border-[#2D68FF] disabled:border-[#222] disabled:shadow-[0_4px_0_0_#222] disabled:from-[#303030] disabled:to-[#303030] disabled:animate-none disabled:cursor-default active:border-[#002A94] active:shadow-[0_4px_0_0_#002A94] active:from-[#0082a9] active:to-[#002a94] group-hover:shadow-[0_0_0px_3px_#1B3E99] duration-300 ${className}`}
      >
        <div className="absolute top-0 left-0 w-full h-full animate-rotate-gradient opacity-0 duration-300" />
        <div className="flex justify-center items-center rounded-[50px]">
          <span
            className={`relative z-10 text-[18px] leading-[24px] font-[700] bg-[linear-gradient(100deg,#1fccff,#2D68FF)] text-white px-[36px] py-[18px] rounded-[50px] cursor-pointer transition-all duration-300 group ${spanClass}`}
          >
            <div className="w-full h-full opacity-0 px-[36px] py-[23px] absolute rounded-[50px] top-0 left-0 shadow-[inset_0_0_20px_1px_#1FCCFF] transition-all duration-300 group-hover:opacity-100" />
            {text}
          </span>
        </div>
      </button>
    </div>
  );
};

export default MainBtn;

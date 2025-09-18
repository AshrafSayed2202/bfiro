import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Side = ({ isOpen, setIsOpen, children, classNames, isAnimated = true, headContent }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-full bg-[#171718E5] ${isAnimated && "trans-5"} z-[9999]  ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} ${classNames && classNames}`}
        >
            <div
                className={`fixed filter-blur-4 flex flex-col px-[40px] py-[24px] bg-[#262626cc] sm:rounded-l-[20px] ${classNames && classNames} top-0 ${isOpen ? "translate-x-0" : "translate-x-full"} ${isAnimated && "trans-5"} right-0 w-screen sm:w-auto h-full`}
            >
                {headContent ? (
                    <div className={`mb-6 flex items-center justify-between gap-4 !max-w-full ${window.innerWidth < 1200 && "content-contain"}`}>
                        {headContent}
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`text-[#9CA7B4] ${isAnimated && "trans-5"} self-end hover:border-[white]  size-[55px] border-[3px] border-[#424242] rounded-full flex items-center justify-center`}
                        >
                            <IoCloseOutline className="text-[46px]" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsOpen(false)}
                        className={`text-[#9CA7B4] ${isAnimated && "trans-5"} self-end hover:border-[white]  size-[55px] border-[3px] border-[#424242] rounded-full flex items-center justify-center`}
                    >
                        <IoCloseOutline className="text-[46px]" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Side;
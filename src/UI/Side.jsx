import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Side = ({ isOpen, setIsOpen, children }) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-[#171718E5] trans-5 z-[9999]  ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div
                className={`fixed filter-blur-4 flex flex-col px-[40px] py-[24px] bg-[#262626cc] rounded-l-[20px] top-0 ${isOpen ? "translate-x-0" : "translate-x-full"} trans-5 right-0 w-auto h-full`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className=" text-[#9CA7B4] trans-3 self-end hover:border-[white]  size-[55px] border-[3px] border-[#424242] rounded-full flex items-center justify-center"
                >
                    <IoCloseOutline className="text-[46px]" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Side;
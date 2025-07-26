import React from "react";
import bfiro from "../assets/images/smallLogo.png";
import { MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Heart from "../assets/images/svgs/Heart";
import Cart from "../assets/images/svgs/Cart";
import View from "../assets/images/svgs/View";
const ItemCard = ({ item, className }) => {
  const { id, img, title, type, price } = item;
  return (
    <div
      className={`flex flex-col justify-between group/group1 cursor-pointer gap-[10px] bg-[#171718CC] rounded-[20px] overflow-hidden min-h-[355px] ${className}`}
    >
      <div className="h-[256px] flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[#171718CC] opacity-0 group-hover/group1:opacity-80 trans-3"></div>
        <div className="absolute text-[#9CA7B4] group-hover/group1:opacity-100 opacity-0 trans-3 top-[20px] right-[20px] flex items-center justify-end gap-[15px]">
          <span>13</span>
          <button className="size-[55px] border-[3px] group flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full">
            <Heart isActive={false} />
          </button>
        </div>
        <div className="absolute text-[#9CA7B4] group-hover/group1:opacity-100 opacity-0 gap-[30px] trans-3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full">
          <Link
            className="size-[55px] border-[3px] group flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full"
            to={`item/${id}`}
          >
            <View />
          </Link>
          <div className="size-[55px] group border-[3px] flex items-center justify-center border-[#424242] hover:border-[#9CA7B4] trans-3 rounded-full">
            <Cart />
          </div>
        </div>
        <img src={img} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-[12px] px-[20px]">
        <div className="text-[#9CA7B4] truncate font-[300] flex items-center justify-start">
          {title}
        </div>
        <div className="flex items-center justify-between pb-[10px]">
          <div className="flex items-center gap-[3px] text-[#9CA7B4] font-[300]">
            <div className="flex items-center justify-center mr-[8px] bg-[#000000] rounded-full size-[30px] flex-1 overflow-hidden">
              <img className="size-[14px] object-contain" src={bfiro} />
            </div>
            <span>BeFiro</span>
            <MdOutlineArrowRight className="text-[22px]" />
            {type}
          </div>
          <div>${price}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

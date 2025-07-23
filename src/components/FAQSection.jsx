import React from "react";
import Card from "../UI/Card";
import IconCard from "../UI/IconCard";
import Delivered from "../assets/images/svgs/Delivered";
import UIUX from "../assets/images/svgs/UIUX";
import IconSet from "../assets/images/svgs/IconSet";
import Code from "../assets/images/svgs/Code";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
const FAQSection = () => {
  return (
    <div className="content-contain flex gap-[5px]  relative z-[25] mb-[5px]">
      <Card
        className={
          "flex flex-1 flex-col gap-[22px] items-start justify-start !px-[40px]  !py-[35px]  relative"
        }
      >
        <h4 className="bg-[#070D0D] p-[8px] rounded-[4px] opacity-80 font-[300] text-[#2D68FF]">
          FAQ
        </h4>
        <h2 className="font-[600] text-[40px]">Everything you need to know</h2>
        <div className="flex flex-col">
          <div className="collapse  text-[#9CA7B4] !rounded-none group border-b border-[#5B5E7933] trans-3 hover:border-[#1FCCFF]">
            <input type="radio" name="my-accordion-1" defaultChecked />
            <div className="collapse-title flex items-center   justify-between group-hover:text-[#1fccff] trans-3 text-xl !py-0 !px-0 !font-[600] !text-[24px]">
              What is the Yearly-Access Pass?{" "}
              <span className="text-[#424242] group-hover:text-[#1FCCFF] trans-3">
                <FiMinus className="minus-icon" />
                <FiPlus className="plus-icon" />
              </span>
            </div>
            <div className="collapse-content  text-[20px] font-[300] text-[#9CA7B4]  !px-0 ">
              <p className="!py-[12px]">
                The Yearly-Access pass is a subscription based membership
                offered in different tiers, giving you access to download any
                product on the platform as well as all future releases.
              </p>
            </div>
          </div>
          <div className="collapse text-[#9CA7B4] !rounded-none group border-b border-[#5B5E7933] trans-3 hover:border-[#1FCCFF]">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title flex items-center   justify-between group-hover:text-[#1fccff] trans-3 text-xl !py-0 !px-0 !font-[600] !text-[24px]">
              How often do you release new products?
              <span className="text-[#424242] group-hover:text-[#1FCCFF] trans-3">
                <FiMinus className="minus-icon" />
                <FiPlus className="plus-icon" />
              </span>
            </div>
            <div className="collapse-content  text-[20px] font-[300] text-[#9CA7B4]  !px-0 ">
              <p className="!py-[12px]">
                The Yearly-Access pass is a subscription based membership
                offered in different tiers, giving you access to download any
                product on the platform as well as all future releases.
              </p>
            </div>
          </div>
          <div className="collapse text-[#9CA7B4] !rounded-none group border-b border-[#5B5E7933] trans-3 hover:border-[#1FCCFF]">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title flex items-center   justify-between group-hover:text-[#1fccff] trans-3 text-xl !py-0 !px-0 !font-[600] !text-[24px]">
              What is your refund policy?
              <span className="text-[#424242] group-hover:text-[#1FCCFF] trans-3">
                <FiMinus className="minus-icon" />
                <FiPlus className="plus-icon" />
              </span>
            </div>
            <div className="collapse-content  text-[20px] font-[300] text-[#9CA7B4]  !px-0 ">
              <p className="!py-[12px]">
                The Yearly-Access pass is a subscription based membership
                offered in different tiers, giving you access to download any
                product on the platform as well as all future releases.
              </p>
            </div>
          </div>
          <div className="collapse text-[#9CA7B4] !rounded-none group border-b border-[#5B5E7933] trans-3 hover:border-[#1FCCFF]">
            <input type="radio" name="my-accordion-1" />
            <div className="collapse-title flex items-center   justify-between group-hover:text-[#1fccff] trans-3 text-xl !py-0 !px-0 !font-[600] !text-[24px]">
              Can multiple users download with the Yearly
              <span className="text-[#424242] group-hover:text-[#1FCCFF] trans-3">
                <FiMinus className="minus-icon" />
                <FiPlus className="plus-icon" />
              </span>
            </div>
            <div className="collapse-content  text-[20px] font-[300] text-[#9CA7B4]  !px-0 ">
              <p className="!py-[12px]">
                The Yearly-Access pass is a subscription based membership
                offered in different tiers, giving you access to download any
                product on the platform as well as all future releases.
              </p>
            </div>
          </div>
        </div>
        <div className="flex grow items-end justify-center">
          <p className="flex items-center justify-center  text-[20px] font-[300] text-[#9CA7B4] gap-[8px] ">
            <span className="text-[24px]">
              <HiQuestionMarkCircle />
            </span>
            <span>Couldn’t find what you were looking for? </span>
            <Link className="text-[#fff] underline font-[600] trans-3 hover:text-[#1fccff]">
              Contact us
            </Link>
          </p>
        </div>
      </Card>
      <div className="grid grid-cols-2 flex-wrap gap-[5px]">
        <Card
          className={
            "flex size-[356px] gap-[20px] items-center justify-center !px-[28px] group !py-[16px]  relative"
          }
        >
          <IconCard
            headerClass={"min-h-[54px] text-[40px] !font-[600]"}
            textClass={"min-h-[29px] !text-[24px] !font-[300] leading-[24px]"}
            header={"517"}
            text="Delivered Projects"
          >
            <Delivered />
          </IconCard>
        </Card>
        <Card
          className={
            "flex size-[356px] gap-[20px] items-center justify-center !px-[28px] group !py-[16px]  relative"
          }
        >
          <IconCard
            headerClass={"min-h-[54px] text-[40px] !font-[600]"}
            textClass={"min-h-[29px] !text-[24px] !font-[300] leading-[24px]"}
            header="1,231"
            text="UI Kits"
          >
            <UIUX />
          </IconCard>
        </Card>
        <Card
          className={
            "flex size-[356px] gap-[20px] items-center justify-center !px-[28px] group !py-[16px]  relative"
          }
        >
          <IconCard
            headerClass={"min-h-[54px] text-[40px] !font-[600]"}
            textClass={"min-h-[29px] !text-[24px] !font-[300] leading-[24px]"}
            header="315"
            text="Icon Sets"
          >
            <IconSet />
          </IconCard>
        </Card>
        <Card
          className={
            "flex size-[356px] gap-[20px] items-center justify-center !px-[28px] group !py-[16px]  relative"
          }
        >
          <IconCard
            headerClass={"min-h-[54px] text-[40px] !font-[600]"}
            textClass={"min-h-[29px] !text-[24px] !font-[300] leading-[24px]"}
            header="128"
            text="Code Template"
          >
            <Code />
          </IconCard>
        </Card>
      </div>
    </div>
  );
};

export default FAQSection;

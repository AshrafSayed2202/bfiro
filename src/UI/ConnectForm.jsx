import React from "react";
import CustomInput from "./CustomInput";
import MainBtn from "./MainBtn";

const ConnectForm = () => {
    return (
        <div className="mt-[24px] w-[680px] flex flex-col gap-[25px]">
            {/* Title */}
            <div className="flex flex-col gap-[8px]">
                <h2
                    className="text-[30px] font-[500]"
                    style={{
                        letterSpacing: "-2%",
                    }}
                >
                    Let’s connect
                </h2>
                <p
                    className="font-[300] text-[16px] "
                    style={{
                        letterSpacing: "-1%",
                    }}
                >
                    We are Ready to Hear Your Big Idea.
                </p>
            </div>
            {/* Form */}
            <div className="flex flex-col gap-[12px] w-full">
                <CustomInput
                    label={"Name"}
                    type="name"
                    inputClass={"pr-[50px]"}
                    required
                    placeholder={"Farid"}
                ></CustomInput>
                <CustomInput
                    label={"Email"}
                    type="email"
                    inputClass={"pr-[50px]"}
                    required
                    placeholder={"designer@example.com"}
                ></CustomInput>
                <CustomInput
                    label={"Phone Number"}
                    type="phone"
                    inputClass={"pr-[50px]"}
                    required
                    placeholder={""}
                ></CustomInput>
                <div className="flex flex-col gap-[12px]">
                    <span className="text-[16px] font-[300] px-[20px]">
                        Choose your need
                    </span>
                    <ul className="flex flex-wrap items-center justify-start gap-[8px]">
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            UI/UX Design
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            Web Development
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            Apps Development
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            Illstration
                        </button>
                    </ul>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <span className="text-[16px] font-[300] px-[20px]">
                        Project Budget (USD)
                    </span>
                    <ul className="flex flex-wrap items-center justify-start gap-[8px]">
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            Under $3K
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            $3K - $5K
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            $5K - $10K
                        </button>
                        <button className="px-[24px] py-[14px] text-[14px] text-[#9CA7B4] font-[300] border-[2px] border-[#424242] rounded-[50px]  hover:border-[#fff] trans-3">
                            More than $10K
                        </button>
                    </ul>
                </div>
                <CustomInput
                    label={"Message"}
                    type="textarea"
                    inputClass={"pr-[50px]"}
                    required
                    divClass={"!h-[175px]"}
                    placeholder={"Tell us more about your project"}
                ></CustomInput>
            </div>
            {/* Submit Button */}
            <MainBtn
                text="Submit"
                hasStars={false}
                className={"!px-0  !py-0 w-full"}
                spanClass={"!px-7 !py-[20px] !text-[16px] w-full !font-[600]"}
            />
        </div>
    );
};

export default ConnectForm;
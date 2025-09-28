import React, { useState } from "react";
import CustomInput from "./CustomInput";
import MainBtn from "./MainBtn";
import { t } from "i18next";

const ConnectForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [selectedNeed, setSelectedNeed] = useState(null);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const handleSubmit = () => {
        const data = {
            name,
            email,
            phone,
            need: selectedNeed,
            budget: selectedBudget,
            message,
        };
        console.log("Simulating send to backend:", data);
        // Here you could add actual API call, e.g., axios.post('/api/submit', data);
    };

    const baseButtonClass = "px-[24px] py-[14px] text-[12px] font-[300] border-[2px] rounded-[50px] trans-3";
    const unselectedClass = "text-[#9CA7B4] border-[#424242] hover:border-[#fff]";
    const selectedClass = "text-[#fff] border-[#1FCCFF] hover:border-[#1FCCFF]";

    return (
        <div className="mt-[24px] max-w-[680px] w-full flex flex-col gap-[10px] xs:gap-[25px] overflow-y-scroll xs:overflow-y-visible">
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
                    spanClass={'!bg-transparent'}
                    placeholder={"Farid"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></CustomInput>
                <CustomInput
                    label={"Email"}
                    type="email"
                    inputClass={"pr-[50px]"}
                    spanClass={'!bg-transparent'}
                    placeholder={"designer@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></CustomInput>
                <CustomInput
                    label={"Phone Number"}
                    type="phone"
                    inputClass={"pr-[50px]"}
                    spanClass={'!bg-transparent'}
                    placeholder={"+1234567890"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                ></CustomInput>
                <div className="flex flex-col gap-[12px]">
                    <span className="text-[16px] font-[300] px-[20px]">
                        Choose your need
                    </span>
                    <ul className="flex flex-nowrap items-center gap-[8px] overflow-x-auto md:flex-wrap md:overflow-x-visible scrollbar-hide">
                        <button
                            className={`${baseButtonClass} ${selectedNeed === "UI/UX Design" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedNeed("UI/UX Design")}
                        >
                            UI/UX Design
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedNeed === "Web Development" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedNeed("Web Development")}
                        >
                            Web Development
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedNeed === "Apps Development" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedNeed("Apps Development")}
                        >
                            Apps Development
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedNeed === "Illustration" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedNeed("Illustration")}
                        >
                            Illustration
                        </button>
                    </ul>
                </div>
                <div className="flex flex-col gap-[12px]">
                    <span className="text-[16px] font-[300] px-[20px]">
                        Project Budget (USD)
                    </span>
                    <ul className="flex flex-nowrap items-center gap-[8px] overflow-x-auto md:flex-wrap md:overflow-x-visible scrollbar-hide">
                        <button
                            className={`${baseButtonClass} ${selectedBudget === "Under $3K" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedBudget("Under $3K")}
                        >
                            Under $3K
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedBudget === "$3K - $5K" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedBudget("$3K - $5K")}
                        >
                            $3K - $5K
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedBudget === "$5K - $10K" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedBudget("$5K - $10K")}
                        >
                            $5K - $10K
                        </button>
                        <button
                            className={`${baseButtonClass} ${selectedBudget === "More than $10K" ? selectedClass : unselectedClass} text-nowrap`}
                            onClick={() => setSelectedBudget("More than $10K")}
                        >
                            More than $10K
                        </button>
                    </ul>
                </div>
                <CustomInput
                    label={"Message"}
                    type="textarea"
                    inputClass={"pr-[50px]"}
                    spanClass={'!bg-transparent'}
                    divClass={"!h-[80px]"}
                    placeholder={"Tell us more about your project"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></CustomInput>
            </div>
            {/* Submit Button */}
            <div className="pb-3">
                <MainBtn
                    text="Submit"
                    hasStars={false}
                    divClass="w-full"
                    className={"!px-0 !py-0 w-full"}
                    spanClass={"!px-7 !py-[20px] !text-[16px] w-full !font-[600]"}
                    onClick={handleSubmit}
                    noScale={true}
                />
            </div>
        </div>
    );
};

export default ConnectForm;
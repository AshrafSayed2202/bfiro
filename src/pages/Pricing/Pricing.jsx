import React, { useState } from "react";
import bg from "../../assets/images/bg.webp";
import Card from "../../UI/Card";
import { RiCheckboxCircleFill } from "react-icons/ri";
import MainBtn from "../../UI/MainBtn";
import Stars from "../../assets/images/svgs/Stars";
import { motion } from "framer-motion";
import bg2 from "../../assets/images/pricingBG.png";
import CircleBtn from "../../UI/CircleBtn";
import ItemCard from "../../UI/ItemCard";
import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";
import project3 from "../../assets/images/project3.png";
import project4 from "../../assets/images/project4.png";
import Side from "../../UI/Side";
import ConnectForm from "../../UI/ConnectForm";
const Pricing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    {
      name: "Designe",
      price: "$3,000",
      priceInc: "$4,000",
      tags: [
        {
          label: "One- time Purchase",
          color: "#9CA7B4",
        },
        {
          label: "25% discount applied",
          color: "#2D68FF",
        },
      ],
      list: [
        "Include source file",
        "Wireframes",
        "User flows",
        "Responsive design",
        "Prototype",
        "5 Edits",
      ],
      button: "Get Your Design",
    },
    {
      name: "Web Mange",
      price: "$1,000",
      priceInc: "/Mo",
      tags: [
        {
          label: "Pay sa you go",
          color: "#9CA7B4",
        },
        {
          label: "Daily mange",
          color: "#FFA500",
        },
        {
          label: "Unlimited requests",
          color: "#2D68FF",
        },
      ],
      list: [
        "Mange your product",
        "Free UX consultant",
        "100+ Hours",
        "Access all services",
        "Dedicated Support",
        "5 Edits",
      ],
      button: "Get App design",
    },
    {
      name: "UX Camp",
      price: "$100",
      priceInc: "$200",
      tags: [
        {
          label: "32 Hours",
          color: "#9CA7B4",
        },
        {
          label: "16 Lessons",
          color: "#FFA500",
        },
        {
          label: "50% discount applied",
          color: "#2D68FF",
        },
      ],
      list: [
        "Include Figma Template",
        "Entry - Juniors level",
        "4 weeks",
        "32 Hours",
        "16 Lessons",
        "Online - Zoom",
      ],
      button: "Book UX Camp",
    },
  ];
  const products = [
    {
      id: 1,
      img: project1,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
    {
      id: 2,
      img: project2,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
    {
      id: 3,
      img: project3,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
    {
      id: 4,
      img: project4,
      title: "Parkify - Car Parking and Charging Mobile APP UI Kit",
      type: "UI Kits",
      price: 39,
    },
  ];

  return (
    <div>
      <Side isOpen={isOpen} setIsOpen={setIsOpen}>
        <ConnectForm />
      </Side>
      <section className="relative overflow-x-hidden pt-[100px] !overflow-y-hidden min-h-svh flex flex-col">
        <div className="absolute top-0 left-0 inset-0 size-full z-[-1] select-none pointer-events-none opacity-15 flex items-center justify-center">
          <img src={bg} className="min-w-full min-h-screen object-cover absolute top-0 " />
          <div className="absolute inset-0 size-full bg-gradient-to-t from-[#121212] from-[60%] to-transparent" />
        </div>
        <div className="content-contain mx-auto text-center flex flex-col justify-start items-center flex-1 mt-[150px] pb-[50px]">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[600] text-[48px] md:text-[64px] leading-[100%] select-none">
            Pricing
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#9CA7B4] text-[24px] font-[300] leading-[100%] mt-[20px] mb-[150px] select-none">
            Prices suit with your business
          </motion.span>
          <div className="grid grid-cols-3 gap-[5px]">
            {items.map((item, index) => (
              <Card
                key={index}
                animateInint={{ opacity: 0 }}
                animateWhileInView={{ opacity: 1 }}
                className={
                  "flex flex-col !px-[40px] justify-start items-start !pt-[60px] !pb-[36px]  relative"
                }
              >
                <h2
                  className={`bg-[linear-gradient(-190deg,#1fccff,#3060ff)] bg-clip-text text-transparent font-[600] text-[32px]  transition-opacity duration-500 `}
                >
                  {item.name}
                </h2>
                <span className="text-[#9CA7B4] text-[20px] font-[300] leading-[100%] mt-[4px]">
                  Start from
                </span>
                <span className="text-[64px] mt-[8px] font-[600] leading-[100%] flex items-start justify-start gap-[8px]">
                  <span>{item.price}</span>
                  <span
                    className={`${index == 1 ? "" : "line-through"} text-[20px] font-[300] text-[#9CA7B4] h-[24px] flex items-center`}
                  >
                    {item.priceInc}
                  </span>
                </span>
                <div className="flex items-center justify-start gap-[8px] mt-[22px]">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[${tag.color}] bg-[#070707] text-[14px] font-[300] p-[9px] px-[8px] rounded-[4px]`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <ul className="flex flex-col gap-[16px] text-[20px] leading-[16px] font-[600] mt-[34px]">
                  {item.list.map((li, ix) => (
                    <li key={ix} className="flex items-center gap-[9px]">
                      <RiCheckboxCircleFill className="text-[#34C759] text-[24px]" />
                      {li}
                    </li>
                  ))}
                </ul>
                <div className="mt-[64px] flex items-center justify-center w-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div whileHover="hover" initial="initial">
                      <MainBtn
                        text={
                          <span className="flex gap-2 items-center ">
                            <Stars />
                            {item.button}
                          </span>
                        }
                        onClick={() => setIsOpen(true)}
                        className={"group"}
                        spanClass="px-[35px] !py-[16px] !font-[300] !font-[600]"
                      ></MainBtn>
                    </motion.div>
                  </motion.div>
                </div>
              </Card>
            ))}
          </div>
          <Card className={"w-full p-[50px] mt-[5px] relative"}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-[20px] items-center justify-center"
            >
              <img
                src={bg2}
                className="absolute h-[224px] bottom-0 w-full object-cover"
              />
              <h2 className="text-[40px] text-blue-gradient-90 font-[700] text-center">
                Yearly Access
              </h2>
              <span className="py-[20px] text-[#9CA7B4] text-[24px] font-[300]">
                Boost your productivity with instant access to all +1,000
                existing products and daily new releases.
              </span>
              <bold className="relative float">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-[3px] text-[65px] xs:text-[90px] md:text-[160px] font-[700] text-[#8D8D8D] -translate-y-1/2 z-[3]">
                  $100
                </span>
                <span className="text-[65px] xs:text-[90px] md:text-[160px] font-[700] text-gray-gradient relative z-[3]">
                  $100
                </span>
              </bold>
              <motion.div whileHover="hover" initial="initial">
                <MainBtn
                  text={
                    <span className="flex gap-2 items-center ">
                      <Stars />
                      Get Access now
                    </span>
                  }
                  className={"group"}
                  spanClass="px-[45px] !font-[600]"
                ></MainBtn>
              </motion.div>
            </motion.div>
          </Card>
          <Card
            animateInint={{ opacity: 0 }}
            animateWhileInView={{ opacity: 1 }}
            className={
              "col-span-12 flex gap-[10px] w-full mt-[5px] sm:gap-[20px] items-end sm:items-center justify-between !px-[28px] !py-[16px]  relative"
            }
          >
            <span className="text-[20px] sm:text-[24px] font-[600] flex items-center justify-start gap-2 leading-tight">
              <span className="text-[#9CA7B4]">
                1000+ premium UI Kits for mobile & web projects
                <span className="text-[#fff] inline-flex items-center mx-2">
                  UI KITS
                  <span className="size-[12px] inline-block bg-[#9CA7B4] rounded-full ml-[10px]"></span>
                </span>
              </span>
            </span>
            <CircleBtn to={"#"} text={"More"} dir={"right"} />
          </Card>
          <Card
            animateInint={{ opacity: 0 }}
            animateWhileInView={{ opacity: 1 }}
            animateTransition={{ duration: 1.5, delay: 1 }}
            className={
              "col-span-12 grid sm:grid-cols-4 mt-[5px] w-full gap-[5px] items-center !p-0 relative bg-transparent md:!p-0"
            }
          >
            {products.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Pricing;

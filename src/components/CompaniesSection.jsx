import React from "react";
import Card from "../UI/Card";
import bg from "../assets/images/companiesBG.png";
import company1 from "../assets/images/companies/1.png";
import company2 from "../assets/images/companies/2.png";
import company3 from "../assets/images/companies/3.png";
import company4 from "../assets/images/companies/4.png";
import company5 from "../assets/images/companies/5.png";
import company6 from "../assets/images/companies/6.png";
import company7 from "../assets/images/companies/7.png";
import { motion } from "framer-motion";
const CompaniesSection = () => {
  const companies = [
    { img: company1 },
    { img: company2 },
    { img: company3 },
    { img: company4 },
    { img: company5 },
    { img: company6 },
    { img: company7 },
  ];

  // Multiply the companies array (e.g., repeat 3 times)
  const multipliedCompanies = [
    ...companies,
    ...companies,
    ...companies,
    ...companies,
    ...companies,
    ...companies,
    ...companies,
    ...companies,
  ]; // 3x repetition
  return (
    <div className="content-contain flex gap-[5px]  relative z-[25] mb-[5px]">
      <Card
        animateInint={{ opacity: 0 }}
        animateWhileInView={{ opacity: 1 }}
        className={
          "flex-1 !px-[20px] md:!px-[40px] pt-[85px] pb-[63px] md:!py-[115px] relative text-center"
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-[24px]">
          <img
            src={bg}
            className="absolute h-[224px] bottom-0 w-full object-cover"
          />
          <h2 className="text-[30px] md:text-[40px] font-[600]">
            Chosen by leading creatives globally
          </h2>
          <p className="text-[16px] md:text-[24px] text-[#9CA7B4] font-[300] mb-[50px]">
            Bfiro empowers over 20,000 designers from over the the middle east.
          </p>
          <div className="scroll-animation-wrapper">
            <div className="gap-[80px] scroll-animation scroll-right-left">
              {multipliedCompanies.map((company, index) => (
                <div
                  key={index}
                  className="h-[52px] flex items-center justify-center"
                >
                  <img src={company.img} className="h-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default CompaniesSection;

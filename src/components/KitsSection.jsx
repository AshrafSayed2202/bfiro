import React from "react";
import Card from "../UI/Card";
import CircleBtn from "../UI/CircleBtn";
import ItemCard from "../UI/ItemCard";
import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.png";
import project4 from "../assets/images/project4.png";
const KitsSection = () => {
  const items = [
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
    <div className="content-contain grid grid-cols-12 gap-[5px] relative z-[25] mb-[5px]">
      <Card
        animateInint={{ opacity: 0 }}
        animateWhileInView={{ opacity: 1 }}
        className={
          "col-span-12 flex gap-[10px] sm:gap-[20px] items-end sm:items-center justify-between !px-[28px] !py-[16px]  relative"
        }
      >
        <span className="text-[20px] sm:text-[24px] font-[600] flex items-center justify-start gap-2 leading-tight">
          <span className="text-[#9CA7B4]">
            1000+ premium UI Kits for mobile & web projects
            <span className="text-[#fff] inline-flex items-center mx-2">UI KITS
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
          "col-span-12 grid sm:grid-cols-4 gap-[5px] items-center !p-0 relative bg-transparent md:!p-0"
        }
      >
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Card>
    </div>
  );
};

export default KitsSection;

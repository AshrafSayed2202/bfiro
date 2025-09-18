import React from "react";
import smallLogo from "../../assets/images/smallLogo.png";
import { MdOutlineArrowRight } from "react-icons/md";
import figma from "../../assets/images/figma.png";
import { FaCircleCheck, FaIoxhost } from "react-icons/fa6";
import { FiDownloadCloud } from "react-icons/fi";
import Heart from "../../assets/images/svgs/Heart";
import Comment from "../../assets/images/svgs/Comment";
import MainBtn from "../../UI/MainBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import pc1 from "../../assets/images/pc1.jpg";
import pc2 from "../../assets/images/pc2.jpg";
import pc3 from "../../assets/images/pc3.jpg";
import pc4 from "../../assets/images/pc4.jpg";
import CircleBtn from "../../UI/CircleBtn";
import { BsCloudArrowDownFill } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import Card from "../../UI/Card";
import ItemCard from "../../UI/ItemCard";
import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";
import project3 from "../../assets/images/project3.png";
import long from "../../assets/images/long.png";
import pc5 from "../../assets/images/pc5.png";
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [preview, setPreview] = useState(false);
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
  ];

  // Add useEffect to handle body overflow when preview is open/closed
  useEffect(() => {
    if (preview) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [preview]);

  return (
    <div className="flex flex-col pt-[165px] content-contain ">
      {preview && (
        <div className="fixed top-0 left-0 w-full flex items-start justify-center h-full overflow-y-auto z-[999] bg-[#171718E5]">
          <button
            onClick={() => setPreview(false)}
            className="fixed top-[30px] text-[#9CA7B4] trans-3 hover:border-[white] right-[30px] size-[55px] border-[3px] border-[#424242] rounded-full flex items-center justify-center"
          >
            <IoCloseOutline className="text-[46px]" />
          </button>
          <div className="w-[995px]">
            <img className="w-full" src={long} alt="Preview" />
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-[440px] z-[1] opacity-80">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[black] to-[#000000d5]"></div>
        <img src={pc5} className="w-full h-full object-cover" />
        <div className="absolute bottom-[-50px] left-[-50px] w-[calc(100%+50px)] h-[150px] bg-black blur-lg z-[1]"></div>
      </div>
      <h1 className="text-[32px] font-[600] mb-[16px] leading-[38px] relative z-[3]">
        VidMagic - AI Text to video creator app
      </h1>
      <h4 className="text-[20px] font-[300] text-[#9CA7B4] mb-[32px] leading-[28px] relative z-[3]">
        AI Text To Video App
      </h4>
      <div className="flex items-center justify-start gap-[16px] text-[24px] relative z-[3] font-[300] text-[#9CA7B4] mb-[32px]">
        <div className="bg-black size-[60px] rounded-full flex items-center justify-center">
          <img src={smallLogo} className="h-[41px] " />
        </div>
        <Link to="/">BeFiro</Link>
        <MdOutlineArrowRight className="text-[20px]" />
        <Link to="/products/ui-kits">UI Kits</Link>
        <MdOutlineArrowRight className="text-[20px]" />
        <div>Figma Resources</div>
        <div className="bg-[#424242] size-[40px] rounded-full flex items-center justify-center">
          <img src={figma} className="size-[24px] " />
        </div>
      </div>
      <div className="flex gap-[32px] justify-start items-start relative z-[3]">
        <div className="w-[800px] flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[6px]">
            <Swiper
              effect={"cards"}
              grabCursor={false}
              modules={[EffectCards, Pagination]}
              loop={true}
              spaceBetween={-60}
              className="w-[calc(100%)] ml-[-90px]"
              dir="rtl"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {[pc1, pc2, pc3, pc4].map((img, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="bg-[#1e1e1e] rounded-[20px] overflow-hidden text-white h-[544px] flex items-center justify-center shadow-lg"
                    style={{
                      aspectRatio: "151/118",
                    }}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="bg-[#171718CC] rounded-[25px] h-[92px] flex items-center justify-between pl-[3px] pr-[18px] overflow-hidden">
              <CircleBtn
                to={""}
                handleClick={() => swiperRef.current?.slideNext()}
                text={"Back"}
                dir={"left"}
              />
              <div className="flex items-center justify-center gap-[8px] flex-row-reverse">
                {[pc1, pc2, pc3, pc4].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`size-[12px] rounded-full transition-all duration-300 ${index === activeIndex ? "bg-[#1FCCFF]" : "bg-[#9CA7B4]"}`}
                  />
                ))}
              </div>
              <CircleBtn
                to={""}
                handleClick={() => swiperRef.current?.slidePrev()}
                text={"Next"}
                dir={"right"}
              />
            </div>
          </div>
          <div>
            <h3 className="text-[32px] font-[400] leading-[40px]">Overview</h3>
            <div className="text-[20px] font-[300] text-[#9CA7B4] leading-[32px] mt-[16px]">
              Overview &nbsp;&nbsp; VidMagic is a cutting-edge mobile app UI kit
              crafted to empower creators and content enthusiasts to transform
              text into stunning videos effortlessly. With sleek, modern designs
              and intuitive features, VidMagic simplifies the process of
              generating captivating videos from written content, making it
              perfect for social media, marketing, and personal projects—all
              from your smartphone. &nbsp;&nbsp; Who Is It For? &nbsp;&nbsp; ✅
              App Developers – Accelerate app development with ready-to-use,
              professional UI components. &nbsp;&nbsp; ✅ Content Creators &
              Influencers – Easily craft engaging videos from text for social
              media. &nbsp;&nbsp; ✅ UI/UX Designers – Use as a reference or
              template for AI-powered video creation apps. &nbsp;&nbsp; Why
              Choose VidMagic? &nbsp;&nbsp; 🚀 Rapid Development – Comes with
              fully customizable screens to speed up your project. &nbsp;&nbsp;
              🎥 AI-Powered Video Creation – Leverages the latest AI technology
              to convert text into videos seamlessly. &nbsp;&nbsp; ️
              User-Friendly Interface – Designed for ease of use, even for
              beginners. &nbsp;&nbsp; 💼 Perfect for Entrepreneurs and Startups
              – Launch your own text-to-video platform quickly and
              professionally. &nbsp;&nbsp; Thank you for your purchase! 😉
              &nbsp;&nbsp; 💌 Need Assistance? &nbsp;&nbsp; Have questions or
              need support? &nbsp;&nbsp; Reach out to us at
              hello.sjasiam@gmail.com
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[#171718CC] bgSquares flex flex-col gap-[32px] rounded-[30px] p-[30px] sticky top-[140px]">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t to-[#141414] rounded-[20px] from-[#121212fa] z-[-1]"></div>
          <h3 className="text-[32px] font-[400] leading-[40px]">Highlights</h3>
          <ul className="flex flex-col gap-[24px] text-[20px] leading-[24px] font-[300] text-[#9CA7B4]">
            <li className="flex items-center gap-[9px] text-left leading-tight">
              <FaCircleCheck className="text-[#00A656] text-[22px]" />
              Organized Layers
            </li>
            <li className="flex items-center gap-[9px] text-left leading-tight">
              <FaCircleCheck className="text-[#00A656] text-[22px]" />
              Global Style Guides
            </li>
            <li className="flex items-center gap-[9px] text-left leading-tight">
              <FaCircleCheck className="text-[#00A656] text-[22px]" />
              Pixel Perfect
            </li>
            <li className="flex items-center gap-[9px] text-left leading-tight">
              <FaCircleCheck className="text-[#00A656] text-[22px]" />
              100% Editable & Customizable
            </li>
            <li className="flex items-center gap-[9px] text-left leading-tight">
              <FaCircleCheck className="text-[#00A656] text-[22px]" />
              Free Google Font Use
            </li>
          </ul>
          <h3 className="text-[32px] font-[400] leading-[40px]">Formats</h3>
          <div className="bg-[#424242] size-[40px] rounded-full flex items-center justify-center">
            <img src={figma} className="size-[24px] " />
          </div>
          <div className="flex items-center gap-[16px] text-[20px] leading-[24px] font-[300] text-[#9CA7B4]">
            <FiDownloadCloud className="text-[32px]" />
            135.6 MB in <span>1 File</span>
          </div>
          <div className="flex items-center gap-[20px] justify-between">
            <button className="flex items-center gap-[10px] text-[18px] font-[600] text-[#9CA7B4] rounded-[50px] border-[2px] border-[#424242] trans-3 hover:border-[white] px-[18px] py-[11px]">
              6 <Heart />
            </button>
            <button className="flex items-center gap-[10px] text-[18px] font-[600] text-[#9CA7B4] rounded-[50px] border-[2px] border-[#424242] trans-3 hover:border-[white] px-[18px] py-[11px]">
              6 <Comment />
            </button>
            <button
              onClick={() => setPreview(true)}
              className="flex items-center relative z-[2] gap-[10px] text-[18px] font-[600] text-[#9CA7B4] rounded-[50px] border-[2px] border-[#424242] trans-3 hover:border-[white] px-[18px] py-[11px]"
            >
              Preview
            </button>
            <MainBtn
              text="Add to Cart 20$"
              className={"!px-0 !py-0 "}
              spanClass={"!px-6 !py-[12px] !text-[16px] !font-[600]"}
            />
          </div>
        </div>
      </div>
      <div className="mt-[32px] bg-[#1D1C1E] opacity-95 rounded-[40px] p-[18px] flex items-center justify-between">
        <div className="flex items-center justify-center gap-[16px]">
          <div className="size-[50px] rounded-full border-[2px] border-[#424242] flex items-center justify-center">
            <BsCloudArrowDownFill className="text-[24px]" />
          </div>
          <p className="text-[16px] font-[300] leading-[24px] text-[#1FCCFF]">
            You can download this product with the Yearly-Access Pass.
          </p>
        </div>
        <MainBtn
          text="Get Yearly Access"
          className={"!px-0 !py-0 "}
          spanClass={"!px-7 !py-[10px] !text-[16px] !font-[600]"}
        />
      </div>
      <div className="mx-[180px] flex flex-col gap-[24px] mt-[50px]">
        <div className="bg-[#1D1C1E] opacity-95 rounded-[50px] pt-[48px] flex flex-col gap-[32px] overflow-hidden">
          <div className="px-[64px] flex items-center justify-between">
            <h2 className="text-[26px] font-[400] leading-[40px]">Comments</h2>
            <div className="flex items-center justify-center gap-[24px]">
              <button className="h-[48px] rounded-[50px] border-[2px] border-[#1FCCFF] text-white trans-3 px-[18px]">
                Newest
              </button>
              <button className="h-[48px] rounded-[50px] border-[2px] border-[#424242] trans-3 hover:border-[white] px-[18px]">
                Top Comments
              </button>
            </div>
          </div>
          <ul className="px-[64px] mb-[16px] flex flex-col gap-[10px]">
            <li className="p-[16px] flex items-start justify-start gap-[16px]">
              <div className="bg-black size-[58px] rounded-full flex items-center justify-center">
                <img src={smallLogo} className="h-[41px] " />
              </div>
              <div className="flex flex-col gap-[6px]">
                <h4 className="text-[18px] font-[400] leading-[24px] text-white">
                  Befiro Studio
                </h4>
                <p className="text-[16px] font-[300] leading-[28px] text-[#9CA7B4]">
                  Absolutely Amazing!
                </p>
                <span className="text-[#424242] text-[14px] leading-[24px]">
                  12 hours ago
                </span>
              </div>
            </li>
          </ul>
          <div className="bg-[#181818] py-[40px] px-[64px] flex items-center justify-between">
            <p className="text-[16px] leading-[28px] font-[300] text-[#9CA7B4]">
              You must log in to comment.
            </p>
            <MainBtn
              text="Log in"
              className={"!px-0 !py-0 "}
              spanClass={"!px-12 !py-[14px] !text-[16px] !font-[600]"}
            />
          </div>
        </div>
        <div className="flex flex-col gap-[5px]">
          <Card
            animateInint={{ opacity: 0 }}
            animateWhileInView={{ opacity: 1 }}
            className={
              "col-span-12 flex gap-[10px] sm:gap-[20px] items-end sm:items-center justify-between !px-[28px] !py-[16px] relative"
            }
          >
            <span className="text-[20px] sm:text-[24px] font-[600] flex items-center justify-start gap-2 leading-tight">
              <span className="text-[#9CA7B4]">
                Similar Web Templates
                <span className="size-[12px] inline-block bg-[#9CA7B4] rounded-full ml-[24px]"></span>
              </span>
            </span>
          </Card>
          <Card
            animateInint={{ opacity: 0 }}
            animateWhileInView={{ opacity: 1 }}
            animateTransition={{ duration: 1.5, delay: 1 }}
            className={
              "grid sm:grid-cols-3 gap-[5px] items-center !p-0 relative bg-transparent md:!p-0"
            }
          >
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import bg from "../../assets/images/pageBg.png";
import MainBtn from '../../UI/MainBtn';
import Stars from '../../assets/images/svgs/Stars';
import uxAvatar from '../../assets/images/uxAvatar.png';
import ebook from '../../assets/images/ebook.jpg';
import uikit from '../../assets/images/uikit.jpg';
import mobileTemplate from '../../assets/images/mobileTemplate.jpg';
import landingTemplate from '../../assets/images/landingTemplate.jpg';
import { RiDownloadLine } from "react-icons/ri";
import Verified from '../../assets/images/svgs/Verified';
import PriceCheckMark from '../../assets/images/svgs/PriceCheckMark';
import PriceCheckMarkColored from '../../assets/images/svgs/PriceCheckMarkColored';

const UXCamp = () => {
    const { id } = useParams();
    const userId = parseInt(id) || 1; // Default to 1 if no id
    const caseType = userId === 1 ? 'not_purchased' : userId === 2 ? 'purchased_not_started' : 'started';

    // Simulate completed lessons for case 3
    const totalLessons = 16;
    const completedLessons = 5; // Example: first 5 completed

    // Placeholder for countdown (case 2)
    const countdown = { months: 1, days: 15, hours: 10 };

    // Placeholder for small image src
    const uxData = {
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
        button: "Add To Cart",
    }
    useEffect(() => {
        document.title = "Bfiro | UXCamp";
    }, []);

    const renderLeftContent = () => {
        if (caseType === 'not_purchased') {
            return (
                <div className="flex flex-col bg-[#171718CC] rounded-[20px] px-[32px] xxs:px-[56px] py-[40px] h-full text-left relative overflow-visible group hover:!bg-[#171718]">
                    <div className="opacity-0 group-hover:opacity-100 bg-[linear-gradient(-270deg,#1fccff,#3060ff)] w-[calc(100%+2px)] h-[calc(100%+2px)] absolute left-[-1px] top-[-1px] rounded-[20px] z-[-1]" />
                    <h2 className="font-[600] text-[32px] mb-[4px] bg-[linear-gradient(90deg,#1fccff,#3060ff)] bg-clip-text text-transparent">{uxData.name}</h2>
                    <p className="text-[#9CA7B4] text-[20px]">Starts from</p>
                    <h1 className='text-[64px] leading-normal font-bold relative'>{uxData.price}<span className='text-[20px] font-[400] text-[#9CA7B4] line-through absolute top-[10px]'>{uxData.priceInc}</span></h1>
                    <div className="flex flex-wrap gap-[10px] mb-[20px]">
                        {uxData.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`text-[${tag.color}] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap`}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                    <ul className="flex flex-col gap-[16px]">
                        {uxData.list.map((li, ix) => (
                            <li key={ix} className="flex items-center gap-[9px] text-left leading-tight">
                                <span className="relative">
                                    <span>
                                        <PriceCheckMark />
                                    </span>
                                    <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 trans-3">
                                        <PriceCheckMarkColored />
                                    </span>
                                </span>
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
                                            {uxData.button}
                                        </span>
                                    }
                                    onClick={() => setIsOpen(true)}
                                    className={"group"}
                                    spanClass="px-[35px] !py-[16px] !font-[300] !font-[600]"
                                ></MainBtn>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            );
        } else if (caseType === 'purchased_not_started') {
            return (
                <div className="flex flex-col bg-[#171718CC] rounded-[20px] px-[32px] xxs:px-[56px] py-[40px] h-full text-left relative overflow-visible group hover:!bg-[#171718] trans-3">
                    <div className="opacity-0 group-hover:opacity-100 bg-[linear-gradient(-270deg,#1fccff,#3060ff)] w-[calc(100%+2px)] h-[calc(100%+2px)] absolute left-[-1px] top-[-1px] rounded-[20px] z-[-1] trans-3" />
                    <h2 className="font-[600] text-[32px] mb-[10px] bg-[linear-gradient(90deg,#1fccff,#3060ff)] bg-clip-text text-transparent">UX Camp</h2>
                    <p className="text-[#9CA7B4] text-[20px]">Starts from</p>
                    <h1 className='text-[64px] leading-normal font-bold relative'>$100<span className='text-[20px] font-[400] text-[#9CA7B4] line-through absolute top-[10px]'>$200</span></h1>
                    <div className="flex flex-wrap gap-[10px] mb-[20px]">
                        {uxData.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`text-[${tag.color}] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap`}
                            >
                                {tag.label}
                            </span>
                        ))}
                    </div>
                    <ul className="flex flex-col gap-[16px] mb-6">
                        {uxData.list.map((li, ix) => (
                            <li key={ix} className="flex items-center gap-[9px] text-left leading-tight">
                                <span className="relative">
                                    <span>
                                        <PriceCheckMark />
                                    </span>
                                    <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 trans-3">
                                        <PriceCheckMarkColored />
                                    </span>
                                </span>
                                {li}
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center justify-center gap-[20px] text-nowrap max-w-full">
                        <div className="text-center">
                            <span className="block text-[54px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[3px]">{countdown.months < 10 ? `0${countdown.months}` : countdown.months} :</span>
                            <span className='text-[20px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[2px]'>Months</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-[54px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[3px]">{countdown.days < 10 ? `0${countdown.days}` : countdown.days} :</span>
                            <span className='text-[20px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[2px]'>Days</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-[54px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[3px]">{countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours}</span>
                            <span className='text-[20px] font-[900] bg-[linear-gradient(100deg,#fff,#8D8D8D)] bg-clip-text text-transparent shadow-inner !stroke-[#8D8D8D] !stroke-[2px]'>Hours</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col bg-[#171718CC] rounded-[20px] px-[32px] xxs:px-[56px] py-[40px] h-full text-left relative overflow-visible group hover:!bg-[#171718] trans-3">
                    <div className="opacity-0 group-hover:opacity-100 bg-[linear-gradient(-270deg,#1fccff,#3060ff)] w-[calc(100%+2px)] h-[calc(100%+2px)] absolute left-[-1px] top-[-1px] rounded-[20px] z-[-1] trans-3" />
                    <h2 className="font-[600] text-[32px] bg-[linear-gradient(90deg,#1fccff,#3060ff)] bg-clip-text text-transparent">UX Camp</h2>
                    <p className='text-white text-[24px]'>Lessons time</p>
                    <p className="text-[#9CA7B4] text-[20px] mb-[20px]">Every day from 8 to 10 PM except Friday and Saturday</p>
                    <div className="grid grid-cols-4 gap-[8px] mb-12 overflow-hidden text-ellipsis">
                        {Array.from({ length: totalLessons }).map((_, index) => (
                            <span
                                key={index}
                                className={`p-[8px] flex items-center gap-1 text-nowrap text-[10px] xxs:text-[14px] rounded bg-[#070707] ${index < completedLessons ? 'text-[#34C759]' : 'text-[#9CA7B4]'}`}
                            >
                                Lesson {index + 1}
                            </span>
                        ))}
                    </div>
                    <div className='mb-11'>
                        <MainBtn text="Meeting Link" className={'w-full'} spanClass={'w-full'} />
                    </div>
                    <p className="text-white text-[24px] mb-[22px]">Certificate Link</p>
                    <div className="flex gap-[10px] flex-wrap items-center justify-center">
                        <MainBtn text="View" className={'w-full'} spanClass={'w-full'} disabled={completedLessons !== totalLessons} hasStars={completedLessons === totalLessons} />
                        <MainBtn text="Download" className={'w-full'} spanClass={'w-full'} disabled={completedLessons !== totalLessons} hasStars={completedLessons === totalLessons} />
                    </div>
                </div>
            );
        }
    };

    const renderRightContent = () => {
        const isStarted = caseType === 'started';
        // const subtitle = isStarted ? 'Download Now' : 'Get $80 worth of materials';
        const sideElement = caseType === 'purchased_not_started' && (
            <label className="relative inline-flex items-center cursor-pointer gap-2">
                <span className="text-[24px] font-bold text-[#9CA7B4]">Notifications</span>
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#070707] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full relative after:leading-tight peer-checked:after:content-['✓'] after:font-bold peer-checked:after:border-white after:content-[''] after:text-[#13151F] after:text-center after:absolute after:top-[2px] after:left-[2px] after:bg-[#E9FAFF] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#137C9C]"></div>
            </label>
        );
        return (
            <div className={`flex flex-col bg-[#171718CC] rounded-[20px] px-[32px] xxs:px-[56px] pb-[40px] h-full relative overflow-visible group hover:!bg-[#171718] trans-3 ${caseType === 'purchased_not_started' ? 'pt-[60px]' : 'pt-[10px]'}`}>
                <div className="opacity-0 group-hover:opacity-100 bg-[linear-gradient(-270deg,#1fccff,#3060ff)] w-[calc(100%+2px)] h-[calc(100%+2px)] absolute left-[-1px] top-[-1px] rounded-[20px] z-[-1] trans-3" />
                <div className='flex justify-between items-end mb-[20px]'>
                    <div className='w-full'>
                        <div className="flex justify-between items-start text-left mb-[10px]">
                            <div>
                                <h2 className="font-[600] text-[32px]">{isStarted ? <span>Material</span> : <span>Included</span>}</h2>
                                <p className="text-[#9CA7B4] text-[18px]">{isStarted ? <span>Download Now</span> : <span>Get <span className='text-white'>$80</span> worth of materials</span>}</p>
                            </div>
                            {sideElement}
                        </div>
                        <div className="flex flex-wrap gap-[10px]">
                            <span className="text-[#FFA500] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap">E-Book</span>
                            <span className="text-[#2D68FF] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap">UI Kit</span>
                            <span className="text-[#2D68FF] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap">Mobile App Template</span>
                            <span className="text-[#2D68FF] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap">Landing Page Template</span>
                            <span className="text-[#2D68FF] bg-[#070707] text-[12px] font-[300] p-[9px] px-[8px] rounded-[4px] text-nowrap flex gap-2 items center">Verified Certificate <Verified /></span>
                        </div>
                    </div>
                    {caseType !== 'purchased_not_started' && (
                        <img src={uxAvatar} alt="Small Image" className="hidden sm:block w-[141px]" />
                    )}
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-[5px]">
                    {['E-book', 'UI Kit', 'Mobile App Template', 'Landing Page Template'].map((item, index) => (
                        <div
                            key={index}
                            className={`relative h-[225px] flex items-center justify-center bg-[#222] rounded-[20px] hover:bg-[#333] object-cover overflow-hidden cursor-${isStarted ? 'pointer' : 'default'}`}
                        >
                            <img src={item === 'E-book' ? ebook : item === 'UI Kit' ? uikit : item === 'Mobile App Template' ? mobileTemplate : item === 'Landing Page Template' ? landingTemplate : ''} className='object-cover w-full min-h-full' />
                            {isStarted ? (
                                <div className="absolute inset-0 flex items-center text-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity p-5 select-none">
                                    <p className="text-white text-[24px] md:text-[32px] font-bold">
                                        Free
                                        <p className='bg-[linear-gradient(90deg,#1fccff,#3060ff)] bg-clip-text text-transparent mb-5'>{item}</p>
                                        <p className='text-center flex items-center justify-center text-[40px] text-[#1FCCFF]'><RiDownloadLine /></p>
                                    </p>
                                </div>
                            ) : (
                                <div className="absolute inset-0 flex items-center text-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity p-5 select-none">
                                    <p className="text-white text-[24px] md:text-[32px] font-bold">
                                        Free
                                        <p className='bg-[linear-gradient(90deg,#1fccff,#3060ff)] bg-clip-text text-transparent mb-5'>{item}</p>
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <section className="relative overflow-x-hidden pt-[100px] !overflow-y-hidden min-h-svh flex flex-col">
                <div className="absolute top-0 left-0 inset-0 size-full z-[-1] select-none pointer-events-none flex items-center justify-center">
                    <img src={bg} className="min-w-full !h-screen object-cover absolute top-0 " />
                </div>
                <div className="content-contain mx-auto xs:text-center flex flex-col justify-start xs:items-center flex-1 mt-[42px] xs:mt-[150px] pb-[50px]">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-[600] text-[36px] xs:text-[48px] md:text-[64px] leading-[100%] select-none">
                        UX Camp
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[#9CA7B4] text-[18px] xs:text-[24px] font-[300] leading-[100%] mt-[20px] mb-[42px] xs:mb-[150px] select-none">
                        Become a profisional UX Designer
                    </motion.span>
                    <div className="w-full flex gap-[10px] flex-wrap md:flex-nowrap">
                        <div className="w-full md:w-1/3">
                            {renderLeftContent()}
                        </div>
                        <div className="w-full md:w-2/3">
                            {renderRightContent()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UXCamp;
import bg from "../../assets/images/bg.webp";
import { motion } from "framer-motion";
import Card from "../../UI/Card";
import PortfolioCard from "../../UI/PortfolioCard";
import CompaniesSection from "../../components/CompaniesSection";
import HaveDesignSection from "../../components/HaveDesignSection";
import fawzy from "../../assets/images/fawzy.png";
import oneBg from "../../assets/images/portfolio/1bg.webp";
import twoBg from "../../assets/images/portfolio/2bg.webp";
import threeBg from "../../assets/images/portfolio/3bg.webp";
import fourBg from "../../assets/images/portfolio/4bg.webp";
import fiveBg from "../../assets/images/portfolio/5bg.webp";
import sixBg from "../../assets/images/portfolio/6bg.webp";
import sevenBg from "../../assets/images/portfolio/7bg.webp";
import p1l from '../../assets/images/portfolio/p1l.webp';
import p2logo from "../../assets/images/portfolio/p2logo.png";
import p2l from "../../assets/images/portfolio/p2l.webp";
import p3l1 from '../../assets/images/portfolio/p3l1.webp';
import p3l2 from '../../assets/images/portfolio/p3l2.webp';
import p4p1 from '../../assets/images/portfolio/p4p1.webp';
import p4p2 from '../../assets/images/portfolio/p4p2.webp';
import p4p3 from '../../assets/images/portfolio/p4p3.webp';
import p4p4 from '../../assets/images/portfolio/p4p4.webp';
import p5l from '../../assets/images/portfolio/p5l.webp';
import p6l from '../../assets/images/portfolio/p6l.webp';
import p7p1 from '../../assets/images/portfolio/p7p1.webp';
import p7p2 from '../../assets/images/portfolio/p7p2.webp';
import p7p3 from '../../assets/images/portfolio/p7p3.webp';
import p7p4 from '../../assets/images/portfolio/p7p4.webp';
import project1landing from '../../assets/images/portfolio/Project1.webp';
import project2landing from '../../assets/images/portfolio/Project2.webp';
import project3landing from '../../assets/images/portfolio/Project3.webp';
import project4landing from '../../assets/images/portfolio/Project4.webp';
import project5landing from '../../assets/images/portfolio/Project5.webp';
import project6landing from '../../assets/images/portfolio/Project6.webp';
import project7landing from '../../assets/images/portfolio/Project7.webp';
import { useEffect, useState } from "react";
import CircleBtn from "../../UI/CircleBtn";
import { IoCloseOutline } from "react-icons/io5";

const partners = [
    {
        id: 1,
        image: fawzy,
        title: "ceo",
        name: "FAWZI SAYED.",
        description: "I am a Product Designer based in Cairo."
    },
    {
        id: 2,
        image: fawzy,
        title: "Head of Designers",
        name: "Habiba Ehab.",
        description: "I’m Habiaba UI UX Team Leader and Founder in BeFiro."
    }
];

const projectLandings = [
    { id: 1, image: project1landing },
    { id: 2, image: project2landing },
    { id: 3, image: project3landing },
    { id: 4, image: project4landing },
    { id: 5, image: project5landing },
    { id: 6, image: project6landing },
    { id: 7, image: project7landing }
];

const Portfolio = () => {
    const [currentPartner, setCurrentPartner] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        document.title = "Bfiro | Portfolio";
    }, []);

    const handlePrev = () => {
        if (currentPartner > 0) {
            setCurrentPartner(currentPartner - 1);
        }
    };

    const handleNext = () => {
        if (currentPartner < partners.length - 1) {
            setCurrentPartner(currentPartner + 1);
        }
    };

    const openModal = (projectId) => {
        setSelectedProject(projectLandings.find(project => project.id === projectId));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const partner = partners[currentPartner];

    return (
        <div>
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
                        Portfolio
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[#9CA7B4] text-[24px] font-[300] leading-[100%] mt-[20px] mb-[150px] select-none">
                        We're working hard to bring you something amazing
                    </motion.span>
                    <div className="grid grid-cols-4 gap-[5px] w-full mb-[5px]">
                        <Card className={'col-span-4 lg:col-span-2'}
                            animateInint={{ opacity: 0 }}
                            animateWhileInView={{ opacity: 1 }}
                            animateTransition={{ duration: 1, delay: 0.6 }}
                        >
                            <div className="flex w-full h-full rounded-lg overflow-hidden gap-6">
                                <div className="rounded-[20px] !min-w-[350px] h-full relative">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="h-full object-cover rounded-[20px] !w-[350px]"
                                    />
                                </div>
                                <div className="flex flex-col justify-between text-left">
                                    <div className="leading-tight">
                                        <h3 className="text-[20px] text-[#9CA7B4] uppercase text-nowrap">{partner.title}</h3>
                                        <h2 className="text-[46px] text-wrap font-[600] text-white mt-3 mb-4">{partner.name}</h2>
                                        <p className="text-[20px] text-[#9CA7B4] font-[600]">{partner.description}</p>
                                    </div>
                                    <div className="flex justify-between pb-2">
                                        <CircleBtn handleClick={handlePrev} text={"Back"} className={`mr-auto ${currentPartner === 0 ? "hidden" : ""}`} dir="left" />
                                        <CircleBtn handleClick={handleNext} text={"Next"} className={`ml-auto ${currentPartner === partners.length - 1 ? "hidden" : ""}`} />
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <div className="col-span-4 lg:col-span-2 flex flex-col gap-[5px]">
                            <Card
                                className="text-[24px] text-left font-[600] leading-normal uppercase !p-6"
                                animateInint={{ opacity: 0 }}
                                animateWhileInView={{ opacity: 1 }}
                                animateTransition={{ duration: 1, delay: 0.6 }}
                            >
                                <span className="opacity-50">LATEST WORK AND</span> PORTFOLIO{" "}
                                <span className="size-3 rounded-full bg-[#9CA7B4] inline-block ml-6" />
                            </Card>
                            <div className="flex gap-[5px] items-center">
                                <div className={'group w-full'} onClick={() => openModal(1)}>
                                    <PortfolioCard background={oneBg} >
                                        <div className="absolute bottom-0 right-[20px] w-[55%] translate-y-[-15%] duration-700 group-hover:translate-y-[-3%]">
                                            <img src={p1l} alt="project one landing" className="rounded-b-[20px] w-full" />
                                        </div>
                                        <div className="absolute top-0 left-[20px] w-[55%] translate-y-[15%] duration-700 group-hover:translate-y-[3%]">
                                            <img src={p1l} alt="project one landing" className="rounded-t-[20px] w-full" />
                                        </div>
                                    </PortfolioCard>
                                </div>
                                <div className={'group w-full'} onClick={() => openModal(2)}>
                                    <PortfolioCard background={twoBg}>
                                        <div className="absolute top-0 left-1/2 translate-x-[-50%] w-[30%] translate-y-[40px] duration-700 group-hover:translate-y-[16px]">
                                            <img src={p2logo} alt="project two logo" />
                                        </div>
                                        <div className="absolute bottom-[-20px] left-1/2 translate-x-[-50%] w-[90%] translate-y-[80px] duration-700 group-hover:translate-y-[35px]">
                                            <img src={p2l} alt="project two landing" className="rounded-t-[20px] w-full" />
                                        </div>
                                    </PortfolioCard>
                                </div>
                            </div>
                        </div>
                        <div className={'group col-span-2 lg:col-span-1'} onClick={() => openModal(3)}>
                            <PortfolioCard background={threeBg} >
                                <div className="absolute bottom-0 right-[20px] w-[55%] translate-y-[-15%] duration-700 group-hover:translate-y-[-3%]">
                                    <img src={p3l1} alt="project three landing" className="rounded-b-[20px] w-full" />
                                </div>
                                <div className="absolute top-0 left-[20px] w-[55%] translate-y-[15%] duration-700 group-hover:translate-y-[3%]">
                                    <img src={p3l2} alt="project three landing" className="rounded-t-[20px] w-full" />
                                </div>
                            </PortfolioCard>
                        </div>
                        <div className={'group col-span-2 lg:hidden'} onClick={() => openModal(5)}>
                            <PortfolioCard background={fiveBg}>
                                <div className="absolute bottom-0 right-[20px] w-[55%] translate-y-[-15%] duration-700 group-hover:translate-y-[-3%]">
                                    <img src={p5l} alt="project five landing" className="rounded-b-[20px] w-full" />
                                </div>
                                <div className="absolute top-0 left-[20px] w-[55%] translate-y-[15%] duration-700 group-hover:translate-y-[3%]">
                                    <img src={p5l} alt="project five landing" className="rounded-t-[20px] w-full" />
                                </div>
                            </PortfolioCard>
                        </div>
                        <div className={'col-span-4 lg:col-span-2 group'} onClick={() => openModal(4)}>
                            <PortfolioCard background={fourBg} >
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[70%] duration-1000 group-hover:translate-x-[550%]">
                                    <img src={p4p4} alt="project four phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[52.5%] duration-1000 group-hover:translate-x-[450%]">
                                    <img src={p4p3} alt="project four phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[35%] duration-1000 group-hover:translate-x-[350%]">
                                    <img src={p4p2} alt="project four phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[17.5%] duration-700">
                                    <img src={p4p1} alt="project four phone" className="rounded-b-[20px] h-full" />
                                </div>
                            </PortfolioCard>
                        </div>
                        <div className={'group hidden lg:block'} onClick={() => openModal(5)}>
                            <PortfolioCard background={fiveBg}>
                                <div className="absolute bottom-0 right-[20px] w-[55%] translate-y-[-15%] duration-700 group-hover:translate-y-[-3%]">
                                    <img src={p5l} alt="project five landing" className="rounded-b-[20px] w-full" />
                                </div>
                                <div className="absolute top-0 left-[20px] w-[55%] translate-y-[15%] duration-700 group-hover:translate-y-[3%]">
                                    <img src={p5l} alt="project five landing" className="rounded-t-[20px] w-full" />
                                </div>
                            </PortfolioCard>
                        </div>
                        <div className={'col-span-4 lg:col-span-2 group'} onClick={() => openModal(6)}>
                            <PortfolioCard background={sixBg}>
                                <div className="absolute w-[75%] bottom-[20%] left-[20%] duration-700 group-hover:translate-y-[12%] group-hover:translate-x-[8%]">
                                    <img src={p6l} alt="project six landing" className="rounded-b-[20px]" />
                                </div>
                                <div className="absolute w-[75%] top-[20%] right-[20%] duration-700 group-hover:translate-y-[-12%] group-hover:translate-x-[-8%]">
                                    <img src={p6l} alt="project six landing" className="rounded-b-[20px]" />
                                </div>
                            </PortfolioCard>
                        </div>
                        <div className={'col-span-4 lg:col-span-2 group'} onClick={() => openModal(7)}>
                            <PortfolioCard background={sevenBg} >
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[17.5%] duration-1000 group-hover:translate-y-[220%]">
                                    <img src={p7p1} alt="project seven phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[35%] duration-1000 group-hover:translate-y-[170%]">
                                    <img src={p7p2} alt="project seven phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[52.5%] duration-1000 group-hover:translate-y-[120%]">
                                    <img src={p7p3} alt="project seven phone" className="rounded-b-[20px] h-full" />
                                </div>
                                <div className="absolute bottom-0 h-[82%] translate-y-[-9%] left-[70%] duration-1000 group-hover:translate-y-[30%] group-hover:scale-[1.3]">
                                    <img src={p7p4} alt="project seven phone" className="rounded-b-[20px] h-full" />
                                </div>
                            </PortfolioCard>
                        </div>
                    </div>
                    <CompaniesSection />
                    <HaveDesignSection />
                </div>
            </section>
            {isModalOpen && selectedProject && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]"
                    onClick={closeModal}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="w-[100vw] max-h-[100vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative flex items-center justify-center">
                            <button
                                onClick={closeModal}
                                className="fixed top-4 right-4 text-2xl font-bold text-[#9CA7B4] trans-3 self-end hover:border-[white]  size-[55px] border-[3px] border-[#424242] rounded-full flex items-center justify-center"
                            >
                                <IoCloseOutline className="text-[46px]" />
                            </button>
                            <img
                                src={selectedProject.image}
                                alt={`Project ${selectedProject.id} landing`}
                                className="w-[60%] object-contain"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default Portfolio;
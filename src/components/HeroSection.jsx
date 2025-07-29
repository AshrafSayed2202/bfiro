import { useState } from "react";
import MainBtn from "../UI/MainBtn";
import rec1 from "../assets/images/heroRec1.png";
import rec2 from "../assets/images/heroRec2.png";
import rec3 from "../assets/images/heroRec3.png";
import bg from "../assets/images/bg.webp";
import { motion } from "framer-motion";
const HeroSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const images = [
        { src: rec1, alt: "rec1" },
        { src: rec2, alt: "rec2" },
        { src: rec3, alt: "rec3" },
    ];

    return (
        <section className="relative overflow-x-hidden pt-[100px] !overflow-y-hidden min-h-svh flex flex-col" >
            <div className="absolute inset-0 size-full z-[-1] select-none pointer-events-none opacity-15">
                <img src={bg} alt="" className="size-full object-cover" />
                {/* <div className="absolute inset-0 size-full bg-[#121212d8]" /> */}
                <div className="absolute inset-0 size-full bg-gradient-to-t from-[#121212] to-transparent" />
            </div>
            <div className="content-contain mx-auto md:overflow-y-hidden flex flex-col justify-between flex-1">
                <div className="flex flex-col items-center justify-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: -80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-[24px] leading-8 md:text-[42px] md:leading-[50px] font-[600] mt-20 text-white mb-[10px]">
                        <p>Skip the Ordinary.</p>
                        <p className="bg-[linear-gradient(190deg,#1fccff,#3060ff)] bg-clip-text text-transparent">
                            Build What Stands Out.
                        </p>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="text-[14px] md:text-[20px] leading-[33px] text-[#9ca7b4] text-center mb-[25px]">
                        Here in{" "}
                        <span className="bg-[linear-gradient(190deg,#1fccff,#3060ff)] bg-clip-text text-transparent font-[700]">
                            Bfiro
                        </span>
                        , we help you craft your big Idea
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <MainBtn text={
                            <span className="flex gap-2 items-center font-[400]">
                                Collaborate with us
                            </span>
                        } />
                    </motion.div>
                </div>

                <div className="mx-auto w-full h-[300px] md:h-[400px] pt-[100px] z-[9]">
                    <div className="absolute left-0 bottom-0 w-screen h-[150px] bg-gradient-to-t from-[#000] to-transparent z-20 select-none pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        viewport={{ once: true }}
                        className="relative size-full translate-x-[-25%] md:translate-x-[-17%]">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                            absolute top-0 z-10 duration-300 rounded-[20px] hover-glow !w-[80%] md:!w-[38%] object-contain left-[50%]
                            ${hoveredIndex !== null && hoveredIndex !== index ? "opacity-10" : "opacity-100"}
                        `}
                                style={{
                                    transform: `${index === 0 ? "translateX(-70%) " : ""}
                                    ${index === 1 ? "translateX(-20%) translateY(-5%) " : ""}
                                    ${index === 2 ? "translateX(30%) translateY(-10%) " : ""}
                                    rotate(32deg) rotateY(30deg) skewY(-19deg)`,
                                    zIndex: hoveredIndex === index ? 30 : 10,
                                }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

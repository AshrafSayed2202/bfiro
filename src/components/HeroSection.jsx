import { useState } from "react";
import MainBtn from "../UI/MainBtn";
import rec1 from "../assets/images/heroRec1.png";
import rec2 from "../assets/images/heroRec2.png";
import rec3 from "../assets/images/heroRec3.png";

const HeroSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const images = [
        { src: rec1, alt: "rec1" },
        { src: rec2, alt: "rec2" },
        { src: rec3, alt: "rec3" },
    ];

    return (
        <section className="relative">
            <div className="content-contain mx-auto overflow-y-hidden">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center text-[42px] leading-[50px] font-[700] mt-20 text-white mb-[10px]">
                        <p>Skip the Ordinary.</p>
                        <p className="bg-[linear-gradient(190deg,#1fccff,#3060ff)] bg-clip-text text-transparent">
                            Build What Stands Out.
                        </p>
                    </div>
                    <p className="text-[20px] leading-[33px] text-[#9ca7b4] text-center mb-[25px]">
                        Here in{" "}
                        <span className="bg-[linear-gradient(190deg,#1fccff,#3060ff)] bg-clip-text text-transparent font-[700]">
                            Bfiro
                        </span>
                        , we help you craft your big Idea
                    </p>
                    <MainBtn text={
                        <span className="flex gap-2 items-center font-[400]">
                            Collaborate with us
                        </span>
                    } />
                </div>

                <div className="mx-auto w-full h-[400px] pt-[100px] z-[9]">
                    <div className="absolute left-0 bottom-0 w-screen h-[300px] bg-gradient-to-t from-[#000] to-transparent z-20 select-none pointer-events-none" />
                    <div className="relative size-full translate-x-[-17%]">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img.src}
                                alt={img.alt}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`
                            absolute top-0 z-10 duration-300 rounded-[20px] hover-glow !w-[38%] object-contain left-[50%]
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

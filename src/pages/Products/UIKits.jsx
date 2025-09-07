import React, { useState, useMemo, useRef, useEffect } from "react";
import bg from "../../assets/images/bg.webp";
import Card from "../../UI/Card";
import MainBtn from "../../UI/MainBtn";
import ItemCard from "../../UI/ItemCard";
import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/project2.png";
import project3 from "../../assets/images/project3.png";
import project4 from "../../assets/images/project4.png";
import Side from "../../UI/Side";
import ConnectForm from "../../UI/ConnectForm";
import { FaSort } from "react-icons/fa6";
import { RiDashboardFill } from "react-icons/ri";
import figmaIcon from "../../assets/images/Formats/figma.png"
import framerIcon from "../../assets/images/Formats/framer.png"
import illustratorIcon from "../../assets/images/Formats/illustrator.png"
import reactIcon from "../../assets/images/Formats/react.png"
import blenderIcon from "../../assets/images/Formats/blender.png"
import { motion, AnimatePresence } from "framer-motion";

const UIKits = () => {
    const [isOpen, setIsOpen] = useState(false);
    const allLabels = ["Mobile", "Web", "Travel", "Food", "Social", "Ecommerce", "Health", "Finance"];
    const formatsList = ["Figma", "Framer", "Illustrator", "React", "Blender"];
    const sortOptions = ["Release Date", "Popularity", "Highest price", "Lowest price"];

    const labelColors = {
        Mobile: '#00BFFF',
        Web: '#32CD32',
        Travel: '#FFD700',
        Food: '#FF4500',
        Social: '#9370DB',
        Ecommerce: '#FF69B4',
        Health: '#90EE90',
        Finance: '#FFD700',
    };

    const formatIcons = {
        "All Format": <RiDashboardFill className="w-6 h-6" />,
        Figma: <img src={figmaIcon} alt="Figma" className="w-6 h-6" />,
        Framer: <img src={framerIcon} alt="Framer" className="w-6 h-6" />,
        Illustrator: <img src={illustratorIcon} alt="Illustrator" className="w-6 h-6" />,
        React: <img src={reactIcon} alt="React" className="w-6 h-6" />,
        Blender: <img src={blenderIcon} alt="Blender" className="w-6 h-6" />,
    };

    const products = useMemo(() => {
        const labels = allLabels;
        const formats = formatsList;
        return Array.from({ length: 200 }, (_, i) => {
            const selectedLabels = [...new Set(Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => labels[Math.floor(Math.random() * labels.length)]))];
            const selectedFormats = [...new Set(Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => formats[Math.floor(Math.random() * formats.length)]))];
            return {
                id: i + 1,
                img: [project1, project2, project3, project4][i % 4],
                title: `UI Kit Variant ${i + 1} - Car Parking and Charging App`,
                type: "UI Kits",
                price: Math.floor(Math.random() * 90) + 10,
                labels: selectedLabels.map(l => ({ text: l, color: labelColors[l] })),
                formats: selectedFormats.map(f => ({ text: f, icon: formatIcons[f] })),
                releaseDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 2)),
                popularity: Math.floor(Math.random() * 1000),
            };
        });
    }, []);

    const [activeLabels, setActiveLabels] = useState(new Set());
    const toggleLabel = (label) => {
        setActiveLabels((prev) => {
            const next = new Set(prev);
            if (next.has(label)) {
                next.delete(label);
            } else {
                next.add(label);
            }
            return next;
        });
    };
    const clearLabels = () => setActiveLabels(new Set());

    const [selectedFormat, setSelectedFormat] = useState("All Format");
    const [formatOpen, setFormatOpen] = useState(false);
    const toggleFormatDropdown = () => setFormatOpen(!formatOpen);
    const selectFormat = (f) => {
        setSelectedFormat(f);
        setFormatOpen(false);
    };

    const [currentSort, setCurrentSort] = useState("Release Date");
    const [sortOpen, setSortOpen] = useState(false);
    const toggleSort = () => setSortOpen(!sortOpen);
    const selectSort = (s) => {
        setCurrentSort(s);
        setSortOpen(false);
    };

    const [visibleCount, setVisibleCount] = useState(40);
    const loadMore = () => setVisibleCount((c) => c + 40);

    let filtered = products;
    if (activeLabels.size > 0) {
        filtered = filtered.filter((p) => p.labels.some((l) => activeLabels.has(l.text)));
    }
    if (selectedFormat !== "All Format") {
        filtered = filtered.filter((p) => p.formats.some((fmt) => fmt.text === selectedFormat));
    }

    let sorted = [...filtered];
    switch (currentSort) {
        case "Release Date":
            sorted.sort((a, b) => b.releaseDate.getTime() - a.releaseDate.getTime());
            break;
        case "Popularity":
            sorted.sort((a, b) => b.popularity - a.popularity);
            break;
        case "Highest price":
            sorted.sort((a, b) => b.price - a.price);
            break;
        case "Lowest price":
            sorted.sort((a, b) => a.price - b.price);
            break;
        default:
            break;
    }

    const displayed = sorted.slice(0, visibleCount);

    const formatRef = useRef(null);
    const sortRef = useRef(null);

    useEffect(() => {
        document.title = "Bfiro - UI Kits";
        const handleClickOutside = (event) => {
            if (formatRef.current && !formatRef.current.contains(event.target)) {
                setFormatOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setSortOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
                        className="font-[600] text-[48px] md:text-[64px] leading-[100%] select-none">UI Kits
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-[#9CA7B4] text-[24px] font-[300] leading-[100%] mt-[20px] mb-[150px] select-none">
                        {products.length} premium UI Kits for mobile & web projects
                    </motion.span>

                    <div className="filters w-full mb-8 flex md:flex-row gap-4 justify-between items-center px-3">
                        <div className="label-filters flex flex-wrap gap-2 text-[18px] font-[600]">
                            <button
                                onClick={clearLabels}
                                className={`px-4 py-2 bg-transparent text-[#9CA7B4] rounded-[50px] border-[2px] border-[#424242] hover:border-white hover:text-white duration-300 ${activeLabels.size === 0 ? "!text-white !border-[#1FCCFF]" : ""}`}
                            >
                                All products
                            </button>
                            {allLabels.map((label) => (
                                <button
                                    key={label}
                                    onClick={() => toggleLabel(label)}
                                    className={`px-4 py-2 rounded-[50px] border-[2px] border-[#424242] text-[#9CA7B4] hover:border-white hover:text-white duration-300 ${activeLabels.has(label) ? "!text-white !border-[#1FCCFF]" : ""}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="format-filter relative" ref={formatRef}>
                                <button
                                    onClick={toggleFormatDropdown}
                                    className={`px-4 py-2 border-[2px] text-nowrap border-[#424242] rounded-[50px] flex items-center gap-2 text-[18px] font-[600] p-4 hover:border-white hover:text-white duration-300 ${selectedFormat !== "All Format" ? "!border-[#1FCCFF] !text-white" : ""}`}
                                >
                                    {selectedFormat}
                                    {formatIcons[selectedFormat]}
                                </button>
                                {formatOpen && (
                                    <div className="absolute top-full right-0 mt-2 bg-[#262626] w-[600px] shadow-lg rounded-[30px] grid grid-cols-3 gap-3 z-10 p-4">
                                        {["All Format", ...formatsList].map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => selectFormat(f)}
                                                className={`px-4 py-2 rounded-[50px] text-nowrap border-[2px] border-[#424242] text-[#9CA7B4] hover:border-white hover:text-white text-left flex items-center gap-2 duration-300 ${f === selectedFormat ? "!border-[#1FCCFF] !text-white" : ""}`}
                                            >
                                                {formatIcons[f]}
                                                {f}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="sort-filter relative" ref={sortRef}>
                                <button
                                    onClick={toggleSort}
                                    className={`p-[4px] size-[47px] border-[2px] border-[#424242] rounded-full flex items-center justify-center hover:border-white duration-300 ${currentSort !== "Release Date" ? "!border-[#1FCCFF]" : ""}`}
                                >
                                    <FaSort className="bg-[#424242cc] text-[24px] p-[3px] rounded-full size-full" />
                                </button>
                                {sortOpen && (
                                    <div className="absolute top-full right-0 mt-2 bg-[#262626] shadow-lg rounded-[30px] p-4 gap-3 flex flex-col z-10 w-[200px]">
                                        {sortOptions.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => selectSort(s)}
                                                className={`px-4 py-2 text-left border-[2px] text-nowrap border-[#424242] rounded-[50px] text-[#9CA7B4] hover:border-white hover:text-white duration-300 ${s === currentSort ? "!border-[#1FCCFF] !text-white" : ""}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Card
                        animateInint={{ opacity: 0 }}
                        animateWhileInView={{ opacity: 1 }}
                        animateTransition={{ duration: 1.5, delay: 1 }}
                        className={
                            "col-span-12 grid sm:grid-cols-4 mt-[5px] w-full gap-[12px] items-center !p-3 relative bg-transparent"
                        }
                    >
                        <AnimatePresence>
                            {displayed.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ItemCard
                                        item={item}
                                        className={`scale-100 !duration-500 !transition-all hover:scale-[1.02] shadow-lg shadow-[#222222] delay-${index % 4 * 100}`}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Card>

                    {visibleCount < sorted.length && (
                        <MainBtn text="View more" onClick={loadMore} className="mx-auto mt-8" />
                    )}
                </div>
            </section>
        </div>
    );
};

export default UIKits;
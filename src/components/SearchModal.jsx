import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Card from "../UI/Card";
import ItemCard from "../UI/ItemCard";
import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.png";
import project4 from "../assets/images/project4.png";
import { FaSort, FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import FormatsIcon from "../assets/images/Formats/formats.svg";
import IllustratorIcon from "../assets/images/Formats/ai-prog.svg";
import PowerPointIcon from "../assets/images/Formats/powerpoint-prog.svg";
import Max3DIcon from "../assets/images/Formats/3ds-prog.svg";
import InVisionIcon from "../assets/images/Formats/invision-prog.svg";
import ReactIcon from "../assets/images/Formats/react-prog.svg";
import AfterEffectsIcon from "../assets/images/Formats/ae-prog.svg";
import KeynoteIcon from "../assets/images/Formats/keynote-prog.svg";
import SketchIcon from "../assets/images/Formats/sketch-prog.svg";
import BlenderIcon from "../assets/images/Formats/blender-prog.svg";
import LottieIcon from "../assets/images/Formats/lottie-prog.svg";
import SwiftIcon from "../assets/images/Formats/swift-prog.svg";
import Cinema4DIcon from "../assets/images/Formats/c4d-prog.svg";
import LunacyIcon from "../assets/images/Formats/lunacy-prog.svg";
import XcodeIcon from "../assets/images/Formats/xcode-prog.svg";
import FigmaIcon from "../assets/images/Formats/figma-prog.svg";
import MayaIcon from "../assets/images/Formats/maya-prog.svg";
import XDIcon from "../assets/images/Formats/xd-prog.svg";
import FramerIcon from "../assets/images/Formats/framer-prog.svg";
import PhotoshopIcon from "../assets/images/Formats/ps-prog.svg";
import { motion, AnimatePresence } from "framer-motion";
import { CgClose } from "react-icons/cg";

const SearchModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const isOpen = searchParams.get('search') === '1';

    const closeModal = useCallback(() => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete('search');
        setSearchParams(newParams, { replace: true });
    }, [searchParams, setSearchParams]);

    const [searchText, setSearchText] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [ticks, setTicks] = useState([]);
    const [currentTick, setCurrentTick] = useState(0);
    const allLabels = ["ui-kit", "coded-template", "icon", "illustration", "font"];
    const shownLabels = {
        "ui-kit": 'UI Kits',
        "coded-template": 'Coded Templates',
        "icon": 'Icons',
        "illustration": 'Illustrations',
        "font": 'Fonts',
    }
    const sortOptions = ["Release Date", "Popularity", "Highest price", "Lowest price"];
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatIcons = {
        "Any format": <img src={FormatsIcon} alt="Illustrator" className="w-6 h-6" />,
        Illustrator: <img src={IllustratorIcon} alt="Illustrator" className="w-6 h-6" />,
        PowerPoint: <img src={PowerPointIcon} alt="PowerPoint" className="w-6 h-6" />,
        "3D Studio Max": <img src={Max3DIcon} alt="3D Studio Max" className="w-6 h-6" />,
        InVision: <img src={InVisionIcon} alt="InVision" className="w-6 h-6" />,
        React: <img src={ReactIcon} alt="React" className="w-6 h-6" />,
        "After Effects": <img src={AfterEffectsIcon} alt="After Effects" className="w-6 h-6" />,
        Keynote: <img src={KeynoteIcon} alt="Keynote" className="w-6 h-6" />,
        Sketch: <img src={SketchIcon} alt="Sketch" className="w-6 h-6" />,
        Blender: <img src={BlenderIcon} alt="Blender" className="w-6 h-6" />,
        Lottie: <img src={LottieIcon} alt="Lottie" className="w-6 h-6" />,
        Swift: <img src={SwiftIcon} alt="Swift" className="w-6 h-6" />,
        "Cinema 4D": <img src={Cinema4DIcon} alt="Cinema 4D" className="w-6 h-6" />,
        Lunacy: <img src={LunacyIcon} alt="Lunacy" className="w-6 h-6" />,
        Xcode: <img src={XcodeIcon} alt="Xcode" className="w-6 h-6" />,
        Figma: <img src={FigmaIcon} alt="Figma" className="w-6 h-6" />,
        Maya: <img src={MayaIcon} alt="Maya" className="w-6 h-6" />,
        XD: <img src={XDIcon} alt="XD" className="w-6 h-6" />,
        Framer: <img src={FramerIcon} alt="Framer" className="w-6 h-6" />,
        Photoshop: <img src={PhotoshopIcon} alt="Photoshop" className="w-6 h-6" />,
    };

    const formatsList = Object.keys(formatIcons).filter(k => k !== "Any format");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const mockResponse = Array.from({ length: 500 }, (_, i) => {
                    const selectedLabels = [...new Set(Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => allLabels[Math.floor(Math.random() * allLabels.length)]))];
                    const selectedFormats = [...new Set(Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () => formatsList[Math.floor(Math.random() * formatsList.length)]))];
                    const cat = selectedLabels[0];
                    return {
                        id: i + 1,
                        img: [project1, project2, project3, project4][i % 4],
                        title: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Design Template ${i + 1}`,
                        type: 'Product',
                        price: Math.floor(Math.random() * 90) + 10,
                        discount: Math.floor(Math.random() * 90) + 10,
                        labels: selectedLabels.map(l => ({ text: l })),
                        formats: selectedFormats.map(f => ({ text: f, icon: formatIcons[f] })),
                        releaseDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 2)),
                        popularity: Math.floor(Math.random() * 1000),
                    };
                });
                setProducts(mockResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
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

    const [selectedFormat, setSelectedFormat] = useState("Any format");
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

    let filtered = products;
    if (debouncedSearch) {
        filtered = filtered.filter((p) =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
            p.labels.some((l) => l.text.toLowerCase().includes(debouncedSearch.toLowerCase()))
        );
    }
    if (activeLabels.size > 0) {
        filtered = filtered.filter((p) => p.labels.some((l) => activeLabels.has(l.text)));
    }
    if (selectedFormat !== "Any format") {
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
    const labelsRef = useRef(null);
    const contentRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const checkArrows = useCallback(() => {
        if (labelsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = labelsRef.current;
            const maxScrollLeft = scrollWidth - clientWidth;
            if (maxScrollLeft <= 0) {
                setTicks([]);
                setCurrentTick(0);
                setShowLeft(false);
                setShowRight(false);
                return;
            }

            const tickSize = 200;
            const fullTicks = Math.floor(maxScrollLeft / tickSize);
            const remainder = maxScrollLeft % tickSize;
            const newTicks = [0];
            for (let i = 1; i <= fullTicks; i++) {
                newTicks.push(i * tickSize);
            }
            if (remainder > 0) {
                newTicks.push(fullTicks * tickSize + remainder);
            }
            setTicks(newTicks);

            const tolerance = 1;
            let closestTickIndex = 0;
            let minDist = Math.abs(newTicks[0] - scrollLeft);
            for (let i = 1; i < newTicks.length; i++) {
                const dist = Math.abs(newTicks[i] - scrollLeft);
                if (dist < minDist) {
                    minDist = dist;
                    closestTickIndex = i;
                }
            }
            if (scrollLeft >= maxScrollLeft - tolerance) {
                closestTickIndex = newTicks.length - 1;
            }
            setCurrentTick(closestTickIndex);

            setShowLeft(scrollLeft > tolerance);
            setShowRight(scrollLeft < maxScrollLeft - tolerance);
        }
    }, []);

    const scrollLeft = useCallback(() => {
        if (labelsRef.current && currentTick > 0 && ticks.length > 0) {
            const newTick = currentTick - 1;
            setCurrentTick(newTick);
            labelsRef.current.scrollTo({ left: ticks[newTick], behavior: 'smooth' });
            setTimeout(() => {
                if (labelsRef.current) {
                    labelsRef.current.scrollTo({ left: ticks[newTick], behavior: 'instant' });
                    checkArrows();
                }
            }, 300);
        }
    }, [currentTick, ticks]);

    const scrollRight = useCallback(() => {
        if (labelsRef.current && currentTick < ticks.length - 1 && ticks.length > 0) {
            const newTick = currentTick + 1;
            setCurrentTick(newTick);
            labelsRef.current.scrollTo({ left: ticks[newTick], behavior: 'smooth' });
            setTimeout(() => {
                if (labelsRef.current) {
                    labelsRef.current.scrollTo({ left: ticks[newTick], behavior: 'instant' });
                    checkArrows();
                }
            }, 300);
        }
    }, [currentTick, ticks]);

    useEffect(() => {
        document.title = "Search | Bfiro";
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

    useEffect(() => {
        const ref = labelsRef.current;
        if (!ref) return;

        const handleScroll = () => checkArrows();
        const handleResize = () => {
            checkArrows();
            if (ticks.length > 0) {
                const { scrollLeft, scrollWidth, clientWidth } = ref;
                const maxScrollLeft = scrollWidth - clientWidth;
                const clampedScrollLeft = Math.min(scrollLeft, maxScrollLeft);
                let closestTickIndex = 0;
                let minDist = Math.abs(ticks[0] - clampedScrollLeft);
                for (let i = 1; i < ticks.length; i++) {
                    const dist = Math.abs(ticks[i] - clampedScrollLeft);
                    if (dist < minDist) {
                        minDist = dist;
                        closestTickIndex = i;
                    }
                }
                if (clampedScrollLeft >= maxScrollLeft - 1) {
                    closestTickIndex = ticks.length - 1;
                }
                setCurrentTick(closestTickIndex);
                ref.scrollTo({ left: ticks[closestTickIndex], behavior: 'smooth' });
            }
        };

        ref.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        setTimeout(checkArrows, 0);

        return () => {
            ref.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [ticks, checkArrows]);

    useEffect(() => {
        setVisibleCount(40);
    }, [debouncedSearch, activeLabels, selectedFormat]);

    useEffect(() => {
        const ref = contentRef.current;
        if (!ref) return;

        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            requestAnimationFrame(() => {
                if (ref.scrollTop + ref.clientHeight >= ref.scrollHeight - 100 && visibleCount < sorted.length && !loading) {
                    setLoading(true);
                    setVisibleCount((prev) => prev + 40);
                    setLoading(false);
                }
                ticking = false;
            });
            ticking = true;
        };

        ref.addEventListener('scroll', handleScroll);
        return () => ref.removeEventListener('scroll', handleScroll);
    }, [visibleCount, sorted.length, loading]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchText]);

    // Move the early return here, after all hooks are declared
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[200] bg-red-500" />
            <div className=" fixed inset-0 z-[201] flex flex-col bg-[#121212]">
                <div className="content-contain flex items-center py-4 flex-shrink-0">
                    <div className="relative flex-1 mr-4">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Type anything to search..."
                            className="w-full bg-transparent text-white placeholder-[#9CA7B4] border-none outline-none text-[32px] pr-10"
                        />
                        {searchText.length > 0 && (
                            <button
                                onClick={() => setSearchText('')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#9CA7B4] hover:text-white"
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button
                        onClick={closeModal}
                        className="flex size-[40px] min-w-[40px] xs:size-[48px] xs:min-w-[48px] items-center justify-center bg-[#121212] border-[2px] border-[#323232] hover:border-white p-2 aspect-square rounded-full text-[#9CA7B4] shadow-2xl"
                    >
                        <CgClose className="w-6 h-6" />
                    </button>
                </div>
                <div ref={contentRef} className="flex-1 overflow-y-auto">
                    <div className={`content-contain pt-3 pb-10 sticky top-0 z-10 backdrop-blur-md bg-[#121212]`}>
                        <div className="flex flex-row gap-4 justify-between items-center">
                            <div className="relative flex gap-2 text-[18px] font-[600] overflow-x-auto sm:overflow-hidden scrollbar-hide">
                                <button
                                    onClick={scrollLeft}
                                    className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#121212] border-[2px] border-[#323232] hover:border-white p-2 h-full aspect-square rounded-full text-[#9CA7B4] shadow-2xl hidden sm:block ${showLeft ? 'sm:!flex justify-center items-center' : '!hidden'}`}
                                >
                                    <FaArrowLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={scrollRight}
                                    className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[rgb(24,24,24)] trans-3 border-[2px] border-[#323232] hover:border-white p-2 h-full aspect-square rounded-full text-[#9CA7B4] shadow-2xl hidden sm:block ${showRight ? 'sm:!flex justify-center items-center' : '!hidden'}`}
                                >
                                    <FaArrowRight className="w-6 h-6" />
                                </button>
                                <div
                                    ref={labelsRef}
                                    className={`relative flex gap-2 text-[18px] font-[600] overflow-x-auto sm:overflow-hidden scrollbar-hide ${showLeft ? 'filters-scroll-left' : ''} ${showRight ? 'filters-scroll-right' : ''} ${showLeft && showRight ? 'filters-scroll-both' : ''}`}
                                >
                                    <button
                                        onClick={clearLabels}
                                        className={`px-4 py-2 bg-transparent text-[#9CA7B4] rounded-[50px] border-[2px] border-[#424242] hover:border-white hover:text-white duration-300 flex-shrink-0 ${activeLabels.size === 0 ? "!text-white !border-[#1FCCFF]" : ""}`}
                                    >
                                        All products
                                    </button>
                                    {allLabels.map((label) => (
                                        <button
                                            key={label}
                                            onClick={() => toggleLabel(label)}
                                            className={`px-4 py-2 rounded-[50px] border-[2px] border-[#424242] text-[#9CA7B4] hover:border-white hover:text-white duration-300 flex-shrink-0 ${activeLabels.has(label) ? "!text-white !border-[#1FCCFF]" : ""}`}
                                        >
                                            {shownLabels[label]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-4">
                                <div className="format-filter relative min-w-[182px] flex items-center justify-end" ref={formatRef}>
                                    <button
                                        onClick={toggleFormatDropdown}
                                        className={`px-4 py-2 border-[2px] w-fit max-w-full  text-nowrap border-[#424242] rounded-[50px] flex items-center gap-2 text-[16px] sm:text-[18px] font-[600] p-4 hover:border-white text-[#9CA7B4] hover:text-white duration-300 ${selectedFormat !== "Any format" ? "!border-[#1FCCFF] !text-white" : ""}`}
                                    >
                                        {formatIcons[selectedFormat]}
                                        {selectedFormat === "Any format" ? "Format" : selectedFormat}
                                    </button>
                                    <AnimatePresence>
                                        {formatOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute top-full right-0 mt-2 bg-[#262626] w-[600px] shadow-lg rounded-[30px] grid grid-cols-3 gap-3 z-10 p-4"
                                            >
                                                {["Any format", ...formatsList].map((f) => (
                                                    <button
                                                        key={f}
                                                        onClick={() => selectFormat(f)}
                                                        className={`px-4 py-2 rounded-[50px] text-nowrap border-[2px] border-[#424242] text-[#9CA7B4] hover:border-white hover:text-white text-left flex items-center gap-2 duration-300 ${f === selectedFormat ? "!border-[#1FCCFF] !text-white" : ""}`}
                                                    >
                                                        {formatIcons[f]}
                                                        {f}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="sort-filter relative" ref={sortRef}>
                                    <button
                                        onClick={toggleSort}
                                        className={`p-[4px] size-[47px] border-[2px] border-[#424242] rounded-full flex items-center justify-center hover:border-white duration-300 ${currentSort !== "Release Date" ? "!border-[#1FCCFF]" : ""}`}
                                    >
                                        <FaSort className="bg-[#424242cc] text-[24px] p-[3px] rounded-full size-full" />
                                    </button>
                                    <AnimatePresence>
                                        {sortOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute top-full right-0 mt-2 bg-[#262626] shadow-lg rounded-[30px] p-4 gap-3 flex flex-col z-10 w-[200px]"
                                            >
                                                {sortOptions.map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => selectSort(s)}
                                                        className={`px-4 py-2 text-left border-[2px] text-nowrap border-[#424242] rounded-[50px] text-[#9CA7B4] hover:border-white hover:text-white duration-300 ${s === currentSort ? "!border-[#1FCCFF] !text-white" : ""}`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-contain">
                        <Card className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full !p-0 bg-transparent">
                            <AnimatePresence>
                                {displayed.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ItemCard
                                            item={item}
                                            className={`scale-100 !bg-[#181818] !duration-500 !transition-all hover:scale-[1.02] delay-${index % 4 * 100}`}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {loading && <div className="col-span-full text-center py-4 text-[#9CA7B4]">Loading more...</div>}
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchModal;
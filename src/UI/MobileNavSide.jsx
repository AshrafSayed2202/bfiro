import { Link, useNavigate } from "react-router-dom"
import ProfileIcon from "../assets/images/svgs/ProfileIcon"
import HeartIcon from "../assets/images/svgs/HeartIcon"
import SettingsIcon from "../assets/images/svgs/SettingsIcon"
import PurchasesIcon from "../assets/images/svgs/PurchasesIcon"
import MainBtn from "./MainBtn"
import { useState } from "react"
import { Disclosure } from "@headlessui/react"
import UIUX from "../assets/images/svgs/UIUX"
import Code from "../assets/images/svgs/Code"
import IconSet from "../assets/images/svgs/IconSet"
import Illustrations from "../assets/images/svgs/Illustrations"
import Fonts from "../assets/images/svgs/Fonts"
import { FaFigma, FaBehance, FaDribbble, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import ConnectForm from "./ConnectForm"
import Side from "./Side"

const MobileNavSide = ({ setIsOpen }) => {
    const [logged, setLogged] = useState(true)
    const [isConnectOpen, setConnectOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="w-full overflow-x-hidden">
            {logged ? (
                <div className="pb-6 border-b border-[#5B5E7933]">
                    <p className="text-[18px] font-[500] mb-4">Fawzi Sayed</p>
                    <div className="grid grid-cols-2 gap-4 mb-7">
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center"
                        >
                            <span className="rounded-full size-[30px] bg-[#5B5E79] flex items-center  justify-center min-w-[30px]">
                                <ProfileIcon className={"size-[20px]"} />
                            </span>
                            Profile
                        </Link>
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center"
                        >
                            <span className="rounded-full size-[30px] bg-[#5B5E79] flex items-center  justify-center min-w-[30px]">
                                <HeartIcon className={"size-[20px]"} />
                            </span>
                            Favorite
                        </Link>
                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center"
                        >
                            <span className="rounded-full size-[30px] bg-[#5B5E79] flex items-center  justify-center min-w-[30px]">
                                <PurchasesIcon className={"size-[20px]"} />
                            </span>
                            Purchases
                        </Link>
                        <Link
                            to="/settings"
                            onClick={() => setIsOpen(false)}
                            className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center"
                        >
                            <span className="rounded-full size-[30px] bg-[#5B5E79] flex items-center  justify-center min-w-[30px]">
                                <SettingsIcon className={"size-[20px]"} />
                            </span>
                            Settings
                        </Link>
                    </div>
                    <MainBtn text={"Sign Out"} onClick={() => setIsOpen(false)} colorScheme="white" spanClass="!text-black w-full" className="w-full" />
                </div>
            ) : (
                <div className="pb-6 border-b border-[#5B5E7933]">
                    <p className="text-[18px] font-[500] mb-4">Get Started</p>
                    <div className="flex items-center justify-between gap-4">
                        <MainBtn text={"Sign up"} onClick={() => { setIsOpen(false); navigate("/signUp") }} colorScheme="white" spanClass="!text-black w-full" divClass="flex-1" className="w-full" />
                        <MainBtn text={"Log in"} onClick={() => { setIsOpen(false); navigate("/login") }} colorScheme="blue" spanClass="w-full" divClass="flex-1" className="w-full" />
                    </div>
                </div>
            )}
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-6 border-b border-[#5B5E7933] text-[20px] text-[#9CA7B4] font-[500]">
                Home
            </Link>
            <div className="pb-6 border-b border-[#5B5E7933]">
                <p className="text-[18px] font-[500] mb-4">Product</p>
                <div className="grid grid-cols-2 gap-4 mb-7">
                    <Link
                        to="/products/ui-kits"
                        onClick={() => setIsOpen(false)}
                        className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center text-nowrap"
                    >
                        <span className="rounded-full min-w-[30px] size-[30px] bg-[#5B5E79] flex items-center  justify-center ">
                            <UIUX className={"size-[20px]"} />
                        </span>
                        UI Kits
                    </Link>
                    <Link
                        to="/products/coded-templates"
                        onClick={() => setIsOpen(false)}
                        className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center text-nowrap"
                    >
                        <span className="rounded-full min-w-[30px] size-[30px] bg-[#5B5E79] flex items-center  justify-center ">
                            <Code className={"size-[20px]"} />
                        </span>
                        Coded Templates
                    </Link>
                    <Link
                        to="/products/icons"
                        onClick={() => setIsOpen(false)}
                        className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center text-nowrap"
                    >
                        <span className="rounded-full min-w-[30px] size-[30px] bg-[#5B5E79] flex items-center  justify-center ">
                            <IconSet className={"size-[20px]"} />
                        </span>
                        Icons
                    </Link>
                    <Link
                        to="/products/illustrations"
                        onClick={() => setIsOpen(false)}
                        className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center text-nowrap"
                    >
                        <span className="rounded-full min-w-[30px] size-[30px] bg-[#5B5E79] flex items-center  justify-center ">
                            <Illustrations className={"size-[20px]"} />
                        </span>
                        Illustrations
                    </Link>
                    <Link
                        to="/products/fonts"
                        onClick={() => setIsOpen(false)}
                        className="gap-[12px] cursor-pointer text-[#9CA7B4] hover:text-white group flex items-center text-nowrap"
                    >
                        <span className="rounded-full min-w-[30px] size-[30px] bg-[#5B5E79] flex items-center  justify-center ">
                            <Fonts className={"size-[20px]"} />
                        </span>
                        Fonts
                    </Link>
                </div>
            </div>
            <Link to="/portfolio" onClick={() => setIsOpen(false)} className="block py-6 border-b border-[#5B5E7933] text-[20px] text-[#9CA7B4] font-[500]">
                Portfolio
            </Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="block py-6 border-b border-[#5B5E7933] text-[20px] text-[#9CA7B4] font-[500]">
                Pricing
            </Link>
            <Link to="/ux-camp/1" onClick={() => setIsOpen(false)} className="block py-6 text-[20px] font-[700] mb-6 trans-3 border-b border-[#5B5E7933] relative overflow-hidden group trans-3 hover:bg-blue-gradient text-gray-400 hover:text-white text-blue-gradient">
                <span className="p-2 bg-[#ffffff33] rounded-[8px]">
                    UX Camp
                </span>
            </Link>
            <Link to="/" onClick={() => { setConnectOpen(true); }} className="block py-6 text-[20px] text-[#9CA7B4] font-[500] mb-6">
                Contact us
            </Link>
            <div className="py-4 px-5 flex items-center justify-between gap-2 text-[#9CA7B4]">
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <FaFigma className="size-[25px]" />
                </a>
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <FaBehance className="size-[25px]" />
                </a>
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <FaDribbble className="size-[25px]" />
                </a>
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <FaInstagram className="size-[25px]" />
                </a>
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <TfiEmail className="size-[25px]" />
                </a>
                <a href="#" target="_blank" className="rounded-full size-[50px] border-[3px] border-[#424242] p-1 flex items-center justify-center hover:text-white hover:border-white duration-300">
                    <FaLinkedin className="size-[25px]" />
                </a>
            </div>
            <p className="text-[#424242] text-xs text-center">2025 Powered by Bfiro </p>
            <Side isOpen={isConnectOpen} setIsOpen={setConnectOpen}>
                <ConnectForm />
            </Side>
        </div>
    )
}
export default MobileNavSide
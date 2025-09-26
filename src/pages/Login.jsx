import { useEffect, useState } from "react";
import Logo from "../assets/images/bfiro.png";
import bg from "../assets/images/loginBg.jpg";
import Google from "../assets/images/Google.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import CustomInput from "../UI/CustomInput";
import MainBtn from "../UI/MainBtn";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Bfiro - Login";
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full h-full max-h-screen flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-[60%] absolute h-[300px] sm:h-screen sm:relative">
                <img
                    src={bg}
                    alt="login background"
                    className="w-full h-full object-cover"
                />
                <span className="w-full sm:w-[20%] h-[20%] sm:h-full absolute right-0 bottom-0 sm:top-0 bg-[linear-gradient(to_top,#121212_0%,transparent_100%)] sm:bg-[linear-gradient(to_left,#121212_0%,transparent_100%)]" />
            </div>
            <div className="sm:w-[40%] h-screen items-center sm:h-screen flex flex-col">
                <div className="w-full flex flex-col justify-end sm:justify-center items-center relative flex-1">
                    <span className="rounded-full bg-[#000] size-[70px] xs:size-[100px] flex justify-center items-center mb-3 xs:mb-6 cursor-pointer border border-transparent hover:border-[#424242] trans-3" onClick={() => navigate("/")}>
                        <img src={Logo} alt="logo" className="w-[50%]" />
                    </span>
                    <h2 className="font-[600] text-[24px] xs:text-[32px] text-white mb-2 text-center">
                        Log in your account
                    </h2>
                    <form onSubmit={handleSubmit} className="w-full flex justify-center items-center">
                        <div className="relative w-[80%] sm:w-[60%]">
                            <div className="w-full relative group mb-6">
                                <CustomInput
                                    label={"Email"}
                                    type="email"
                                    inputClass={"pr-[50px]"}
                                    spanClass={"!top-[-10px]"}
                                    placeholder={"designer@example.com"}
                                >
                                </CustomInput>
                            </div>
                            <div className="w-full relative group">
                                <CustomInput
                                    label={`Password`}
                                    secondLabel={<Link to="/password-reset" className="hover:underline cursor-pointer text-[10px] xs:text-[14px] float-right truncate w-fit">Forgot password?</Link>}
                                    type={showPassword ? "text" : "password"}
                                    inputClass={"pr-[50px]"}
                                    spanClass={"!top-[-10px]"}
                                    placeholder={"password"}
                                >
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-[#424242] hover:text-white text-[20px] z-10"
                                    >
                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </span>
                                </CustomInput>
                            </div>
                        </div>
                    </form>
                    <MainBtn
                        text={"Log in"}
                        className={"mt-8 w-full"}
                        divClass={"w-[80%] sm:w-[60%] "}
                        spanClass={"w-full"}
                        noScale={true}
                    />
                    <MainBtn
                        text={<div className="flex items-center justify-center gap-2 text-black font-[600]">
                            <img src={Google} alt="google logo" /> Google
                        </div>}
                        className={"mt-6 w-full"}
                        divClass={"w-[80%] sm:w-[60%]"}
                        spanClass={"w-full"}
                        colorScheme="white"
                        noScale={true}

                    />
                    <div className="text-[#9CA7B4] text-[16px] mt-8">
                        Don't have an account? <Link to="/signup" className="text-white hover:underline">Sign up</Link>
                    </div>
                </div>
                <span className="text-[#424242] text-[16px] bottom-[10px] text-center mb-[30px]">
                    {new Date().getFullYear()} Powered by Bfiro
                </span>
            </div>
        </div>
    );
};

export default Login;
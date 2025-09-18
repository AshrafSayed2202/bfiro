import { useEffect, useState } from "react";
import Logo from "../assets/images/bfiro.png";
import bg from "../assets/images/loginBg.jpg";
import Google from "../assets/images/Google.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import CustomInput from "../UI/CustomInput";
import MainBtn from "../UI/MainBtn";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        document.title = "Bfiro - Sign Up";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full h-full flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-[60%] h-[50%] sm:h-screen relative">
                <img
                    src={bg}
                    alt="signup background"
                    className="w-full h-full object-cover"
                />
                <span className="w-full sm:w-[20%] h-[20%] sm:h-full absolute right-0 bottom-0 sm:top-0 bg-[linear-gradient(to_top,#121212_0%,transparent_100%)] sm:bg-[linear-gradient(to_left,#121212_0%,transparent_100%)]" />
            </div>
            <div className="sm:w-[40%] sm:h-screen flex flex-col">
                <div className="w-full flex flex-col justify-start sm:justify-center items-center relative flex-1">
                    <span className="rounded-full bg-[#000] w-[100px] h-[100px] flex justify-center items-center mb-6">
                        <img src={Logo} alt="logo" />
                    </span>
                    <h2 className="font-[500] text-[32px] text-white mb-2 text-center">
                        Create your account
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
                                />
                            </div>
                            <div className="w-full relative group mb-6">
                                <CustomInput
                                    label={"Password"}
                                    type="password"
                                    inputClass={"pr-[50px]"}
                                    spanClass={"!top-[-10px]"}
                                    placeholder={"password"}
                                />
                            </div>
                            <div className="w-full relative group">
                                <CustomInput
                                    label={"Confirm Password"}
                                    type="password"
                                    inputClass={"pr-[50px]"}
                                    spanClass={"!top-[-10px]"}
                                    placeholder={"confirm password"}
                                />
                            </div>
                        </div>
                    </form>
                    <MainBtn
                        text={"Sign up"}
                        className={"mt-8 w-full"}
                        divClass={"w-[80%] sm:w-[60%] "}
                        spanClass={"w-full"}
                    />
                    <MainBtn
                        text={
                            <div className="flex items-center justify-center gap-2 text-black font-[600]">
                                <img src={Google} alt="google logo" /> Google
                            </div>
                        }
                        className={"mt-6 w-full"}
                        divClass={"w-[80%] sm:w-[60%]"}
                        spanClass={"w-full"}
                        colorScheme="white"
                    />
                    <div className="text-[#9CA7B4] text-[16px] mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
                <span className="text-[#424242] text-[16px] bottom-[10px] text-center mb-[30px]">
                    {new Date().getFullYear()} Powered by Bfiro
                </span>
            </div>
        </div>
    );
};

export default Signup;
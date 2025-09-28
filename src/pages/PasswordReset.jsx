import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.png";
import bg from "../assets/images/resetBg.jpg";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../UI/CustomInput";
import MainBtn from "../UI/MainBtn";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Bfiro - Password Reset";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-full h-full max-h-screen flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-[60%] absolute h-[300px] sm:h-screen sm:relative">
                <img
                    src={bg}
                    alt="password reset background"
                    className="w-full h-full object-cover"
                />
                <span className="w-full sm:w-[20%] h-[20%] sm:h-full absolute right-0 bottom-0 sm:top-0 bg-[linear-gradient(to_top,#121212_0%,transparent_100%)] sm:bg-[linear-gradient(to_left,#121212_0%,transparent_100%)]" />
            </div>
            <div className="sm:w-[40%] h-screen items-center sm:h-screen flex flex-col">
                <div className="w-full flex flex-col justify-end sm:justify-center items-center relative flex-1">
                    <span className="rounded-full bg-[#000] size-[70px] xs:size-[100px] flex justify-center items-center mb-3 xs:mb-6 cursor-pointer outline outline-transparent hover:outline-[#424242] trans-3" onClick={() => navigate("/")}>
                        <img src={Logo} alt="logo" className="w-[70%]" />
                    </span>
                    <h2 className="font-[600] text-[24px] xs:text-[32px] text-white mb-2 text-center">
                        Reset your password
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
                        </div>
                    </form>
                    <MainBtn
                        text={"Reset"}
                        className={" w-full"}
                        divClass={"w-[80%] sm:w-[60%]"}
                        spanClass={"w-full"}
                        noScale={true}
                    />
                    <div className="text-[#9CA7B4] text-[16px] mt-8">
                        Have your password?{" "}
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

export default PasswordReset;
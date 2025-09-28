import { useEffect, useState } from "react";
import Logo from "../assets/images/bfiro.png";
import bg from "../assets/images/loginBg.jpg";
import Google from "../assets/images/Google.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import CustomInput from "../UI/CustomInput";
import MainBtn from "../UI/MainBtn";
import { Link, useNavigate } from "react-router-dom";
import INIT_DATA from "../data/Login/data.json";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/features/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const baseURL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [formData, setFormData] = useState(INIT_DATA);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Bfiro - Login";
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorObject = { status: false, message: "" };
    if (name == "email") {
      if (value.trim() === "") {
        errorObject = { status: true, message: "Email is required" };
      } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorObject = { status: true, message: "Invalid email address" };
        }
      }
    }

    if (name == "password") {
      if (value.trim() === "") {
        errorObject = { status: true, message: "Password is required" };
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: { value: value, hasError: errorObject },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    const extractedData = {};
    Object.keys(formData).forEach((key) => {
      extractedData[key] = formData[key].value;
    });
    try {
      setIsSubmitting(true);
      await axios
        .post(baseURL + "actions/users/login.php", extractedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.status == 1) {
            toast.success("Account was logged in successfully");
            dispatch(fetchUser());
            navigate("/");
          } else if (data.status == 0) {
            if (data.errors && typeof data.errors === "object") {
              const newFormData = { ...formData };
              Object.entries(data.errors).forEach(([field, error]) => {
                if (newFormData[field]) {
                  newFormData[field].hasError = {
                    status: true,
                    message: error.message || error,
                  };
                }
              });
              setFormData(newFormData);
            } else {
              toast.error(data?.message, {
                position: "top-center",
              });
            }
          } else {
            toast.info("Error while handling form.");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message, { position: "top-center" });
          } else {
            toast.error("An error occurred. Please try again.");
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      setIsSubmitting(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSubmitGooogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((userInfo) => {
          if (userInfo?.email_verified) {
            axios
              .post(
                baseURL + "actions/users/googleSignUp.php",
                { ...userInfo },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  withCredentials: true,
                }
              )
              .then(({ data }) => {
                if (data.status == 1) {
                  toast.success("Google account was logged in successfully", {
                    position: "top-center",
                  });
                  dispatch(fetchUser());
                  navigate("/");
                } else if (data.status == 0) {
                  if (data.errors && Array.isArray(data.errors)) {
                    const newFormData = { ...formData };
                    data.errors.forEach((error) => {
                      if (newFormData[error.field]) {
                        newFormData[error.field].hasError = {
                          status: true,
                          message: error.message,
                        };
                      }
                    });
                    setFormData(newFormData);
                  } else {
                    toast.error(data?.message, {
                      position: "top-center",
                    });
                  }
                } else {
                  toast.info("Error while handling form.", {
                    position: "top-center",
                  });
                }
              })
              .catch((err) => {
                if (
                  err.response &&
                  err.response.data &&
                  err.response.data.message
                ) {
                  toast.error(err.response.data.message, {
                    position: "top-center",
                  });
                } else {
                  toast.error("An error occurred. Please try again.", {
                    position: "top-center",
                  });
                }
              })
              .finally(() => {
                setIsSubmitting(false);
              });
          } else {
            toast.error("Google account email not verified");
          }
        });
    },
    onError: () => console.log("Login Failed"),
    flow: "implicit",
  });
  useEffect(() => {
    const isFormValid = Object.keys(formData).every((key) => {
      return (
        formData[key].value.trim() !== "" && !formData[key].hasError.status
      );
    });
    setIsValid(isFormValid);
  }, [formData]);

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
          <span
            className="rounded-full bg-[#000] size-[70px] xs:size-[100px] flex justify-center items-center mb-3 xs:mb-6 cursor-pointer border border-transparent hover:border-[#424242] trans-3"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" className="w-[50%]" />
          </span>
          <h2 className="font-[600] text-[24px] xs:text-[32px] text-white mb-2 text-center">
            Log in your account
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center"
          >
            <div className="relative w-[80%] sm:w-[60%]">
              <div className="w-full relative group mb-6">
                <CustomInput
                  label={"Email"}
                  type="email"
                  name="email"
                  value={formData.email.value}
                  hasError={formData.email.hasError}
                  onChange={handleChange}
                  inputClass={"pr-[50px]"}
                  spanClass={"!top-[-10px]"}
                  placeholder={"designer@example.com"}
                ></CustomInput>
              </div>
              <div className="w-full relative group">
                <CustomInput
                  label={`Password`}
                  name="password"
                  value={formData.password.value}
                  hasError={formData.password.hasError}
                  onChange={handleChange}
                  secondLabel={
                    <Link
                      to="/password-reset"
                      className="hover:underline cursor-pointer text-[10px] xs:text-[14px] float-right truncate w-fit"
                    >
                      Forgot password?
                    </Link>
                  }
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
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
          <MainBtn
            text={
              <div className="flex items-center justify-center gap-2 text-black font-[600]">
                <img src={Google} alt="google logo" /> Google
              </div>
            }
            onClick={() => handleSubmitGooogle()}
            className={"mt-6 w-full"}
            divClass={"w-[80%] sm:w-[60%]"}
            spanClass={"w-full"}
            colorScheme="white"
            noScale={true}
          />
          <div className="text-[#9CA7B4] text-[16px] mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Sign up
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

export default Login;

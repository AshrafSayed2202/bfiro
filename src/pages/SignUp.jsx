import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.png";
import bg from "../assets/images/loginBg.jpg";
import Google from "../assets/images/Google.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import CustomInput from "../UI/CustomInput";
import MainBtn from "../UI/MainBtn";
import { Link, useNavigate } from "react-router-dom";
import INIT_DATA from "../data/SignUp/data.json";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/features/authSlice";

const baseURL = import.meta.env.VITE_BASE_URL;
const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(INIT_DATA);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bfiro - Sign Up";
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorObject = { status: false, message: "" };

    if (name == "name") {
      if (value.trim() === "") {
        errorObject = { status: true, message: "Name is required" };
      } else {
        if (value.trim().length < 3) {
          errorObject = {
            status: true,
            message: "Name must be at least 3 characters long",
          };
        } else if (value.trim().length > 35) {
          errorObject = {
            status: true,
            message: "Name must be less than 35 characters",
          };
        } else {
          if (!/^[a-zA-Z\s]+$/.test(value)) {
            errorObject = {
              status: true,
              message: "Name can only contain letters and spaces",
            };
          }
        }
      }
    }

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
      } else {
        if (value.length < 6) {
          errorObject = {
            status: true,
            message: "Must be at least 6 characters long",
          };
        } else if (!/[A-Z]/.test(value)) {
          errorObject = {
            status: true,
            message: "Must contain at least 1 uppercase letter",
          };
        } else if (!/[a-z]/.test(value)) {
          errorObject = {
            status: true,
            message: "Must contain at least 1 lowercase letter",
          };
        } else if (!/[0-9]/.test(value)) {
          errorObject = {
            status: true,
            message: "Must contain at least 1 digit",
          };
        } else if (!/[!@#$%^&*]/.test(value)) {
          errorObject = {
            status: true,
            message: "Must contain at least 1 special character",
          };
        }
        if (formData.confirmPassword.value) {
          if (value !== formData.confirmPassword.value) {
            setFormData((prevData) => ({
              ...prevData,
              confirmPassword: {
                value: prevData.confirmPassword.value,
                hasError: { status: true, message: "Passwords do not match" },
              },
            }));
          } else {
            setFormData((prevData) => ({
              ...prevData,
              confirmPassword: {
                value: prevData.confirmPassword.value,
                hasError: { status: false, message: "" },
              },
            }));
          }
        }
      }
    }

    if (name == "confirmPassword") {
      if (value.trim() === "") {
        errorObject = { status: true, message: "Confirm Password is required" };
      } else if (value !== formData.password.value) {
        errorObject = { status: true, message: "Passwords do not match" };
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
        .post(baseURL + "actions/users/signup.php", extractedData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          if (data.status == 1) {
            toast.success(
              "Account was created successfully, Activate it now.",
              {
                position: "top-center",
              }
            );
            navigate("/login?email=" + extractedData.email);
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
      <div className="w-full sm:w-[60%] absolute h-[200px] sm:h-screen sm:relative">
        <img
          src={bg}
          alt="signup background"
          className="w-full h-full object-cover"
        />
        <span className="w-full sm:w-[20%] h-[20%] sm:h-full absolute right-0 bottom-0 sm:top-0 bg-[linear-gradient(to_top,#121212_0%,transparent_100%)] sm:bg-[linear-gradient(to_left,#121212_0%,transparent_100%)]" />
      </div>
      <div className="sm:w-[40%] h-screen items-center sm:h-screen flex flex-col">
        <div className="w-full flex flex-col justify-end sm:justify-center items-center relative flex-1">
          <span
            className="rounded-full bg-[#000] size-[70px] xs:size-[100px] flex justify-center items-center mb-3 xs:mb-6 cursor-pointer outline outline-transparent hover:outline-[#424242] trans-3"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="logo" className="w-[70%]" />
          </span>
          <h2 className="font-[600] text-[24px] xs:text-[32px] text-white mb-2 text-center">
            Create your account
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex justify-center items-center"
          >
            <div className="relative w-[80%] sm:w-[60%]">
              <div className="w-full relative group mb-6">
                <CustomInput
                  label={"Name"}
                  type="text"
                  value={formData.name.value}
                  hasError={formData.name.hasError}
                  name={"name"}
                  onChange={handleChange}
                  inputClass={"pr-[50px]"}
                  spanClass={"!top-[-10px]"}
                  placeholder={"Your name"}
                />
              </div>
              <div className="w-full relative group mb-6">
                <CustomInput
                  label={"Email"}
                  type="email"
                  value={formData.email.value}
                  hasError={formData.email.hasError}
                  name={"email"}
                  onChange={handleChange}
                  inputClass={"pr-[50px]"}
                  spanClass={"!top-[-10px]"}
                  placeholder={"designer@example.com"}
                />
              </div>
              <div className="w-full relative group mb-6">
                <CustomInput
                  label={"Password"}
                  value={formData.password.value}
                  hasError={formData.password.hasError}
                  name={"password"}
                  onChange={handleChange}
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
              <div className="w-full relative group">
                <CustomInput
                  label={"Confirm Password"}
                  value={formData.confirmPassword.value}
                  hasError={formData.confirmPassword.hasError}
                  name={"confirmPassword"}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  inputClass={"pr-[50px]"}
                  spanClass={"!top-[-10px]"}
                  placeholder={"confirm password"}
                >
                  <span
                    onClick={toggleConfirmPasswordVisibility}
                    className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-[#424242] hover:text-white text-[20px] z-10"
                  >
                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                </CustomInput>
              </div>
            </div>
          </form>
          <MainBtn
            text={"Sign up"}
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
            className={"mt-6 w-full"}
            divClass={"w-[80%] sm:w-[60%]"}
            spanClass={"w-full"}
            onClick={() => handleSubmitGooogle()}
            colorScheme="white"
            noScale={true}
            disabled={isSubmitting}
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

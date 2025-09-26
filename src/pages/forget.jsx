import { motion } from "framer-motion";
import { em, input } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobal } from "../context/globalContext";

export default function ForgetPassword() {
  const { sendOtp, changePassword, navigate, setLoginForm } = useGlobal();
  const [isDisplayed, setIsDisplayed] = useState("email");
  const [email, setEmail] = useState("");
  const inputOneRef = useRef(null);
  const inputTwoRef = useRef(null);
  const inputThreeRef = useRef(null);
  const inputFourRef = useRef(null);
  const inputFiveRef = useRef(null);
  const inputSixRef = useRef(null);
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");
  const [inputFive, setInputFive] = useState("");
  const [inputSix, setInputSix] = useState("");
  const [loading, setLoading] = useState(false);
  const otp = `${inputOne}${inputTwo}${inputThree}${inputFour}${inputFive}${inputSix}`;
  const [confirm, setConfirm] = useState("");
  const [forgetForm, setForgetForm] = useState({
    email: email,
    otp: otp,
    newPassword: "",
  });
  useEffect(() => {
    setForgetForm({
      email: email,
      otp: otp,
      newPassword: "",
    });
  }, [email, otp]);
  const formChange = (e) => {
    const { name, value } = e.target;
    setForgetForm({ ...forgetForm, [name]: value });
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.warning("Enter your email", { autoClose: 2000 });
    try {
      setLoading(true);
      await sendOtp(email);
      setLoading(false);
      setIsDisplayed("otp");
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 2000 });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!forgetForm.newPassword || !confirm)
      return toast.warning("Enter new password", { autoClose: 2000 });
    if (confirm !== forgetForm.newPassword)
      return toast.error("Mismatchedd Passwords", { autoClose: 2000 });
    try {
      setLoading(true);
      await changePassword(forgetForm);
      setLoading(false);
      toast.success("Password Changed Sucessfully", { autoClose: 1500 });
      setLoginForm({
        email: email,
        password: forgetForm.newPassword,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Invalid or expired token", { autoClose: 2000 });
    }
  };

  return (
    <div className="bg-[url(./assets/02.jpg)] min-h-screen w-full flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white/20 backdrop-blur-lg rounded-xl py-6 px-6 w-105 shadow-lg text-white">
        {isDisplayed === "email" ? (
          <>
            <h2 className="text-center pb-3 font-bold lg:text-2xl text-xl">
              Enter Email
            </h2>
            <form action="" className="" onSubmit={handleSendOtp}>
              <div className="">
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-3 py-2.5 placeholder:text-[#60aff1]"
                  placeholder="Email *"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {loading ? (
                <button className="bg-white/20 mt-3 backdrop-blur-lg cursor-not-allowed w-full py-2 shadow rounded-full flex items-center justify-center space-x-2">
                  <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                  <p className="animate-pulse">Loading...</p>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white/20 mt-3 backdrop-blur-lg cursor-pointer w-full py-2 shadow rounded-full"
                >
                  Send OTP
                </motion.button>
              )}
              <div className="mt-3 pb-4 border-b border-white/30">
                <p className="text-center text-[11px]">
                  By continuing, you agree to our{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    User Agreement
                  </span>{" "}
                  and acknowledge that you understand the{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
              <div className="py-3">
                <p className="text-center text-[11px]">
                  Want to get your own software? Contact Us at 09136079969
                </p>
              </div>
            </form>
          </>
        ) : isDisplayed === "otp" ? (
          <>
            <h2 className="text-center font-bold  lg:text-2xl text-xl">
              Enter OTP
            </h2>
            <p className="text-center pb-3 text-[11px]">
              An otp has been sent to your email enter it to proceed, otp expires 2 minutes after it has been sent
            </p>
            <form
              action=""
              className=""
              onSubmit={() => {
                if (otp.length < 6)
                  return toast.error("OTP must have 6 characters", {
                    autoClose: 2000,
                  });
                setIsDisplayed("password");
              }}
            >
              <div className="w-full grid grid-cols-6 gap-5">
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputOne(e.target.value);
                    if (inputOne === "") {
                      inputTwoRef.current.focus();
                    }
                  }}
                  maxLength={1}
                  ref={inputOneRef}
                />
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputTwo(e.target.value);
                    if (inputTwo === "") {
                      inputThreeRef.current.focus();
                    }
                  }}
                  maxLength={1}
                  ref={inputTwoRef}
                />
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputThree(e.target.value);
                    if (inputThree === "") {
                      inputFourRef.current.focus();
                    }
                  }}
                  maxLength={1}
                  ref={inputThreeRef}
                />
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputFour(e.target.value);
                    if (inputFour === "") {
                      inputFiveRef.current.focus();
                    }
                  }}
                  ref={inputFourRef}
                />
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputFive(e.target.value);
                    if (inputFive === "") {
                      inputSixRef.current.focus();
                    }
                  }}
                  ref={inputFiveRef}
                />
                <input
                  type="text"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-4.5 py-2.5 placeholder:text-[#60aff1]"
                  onChange={(e) => {
                    setInputSix(e.target.value);
                  }}
                  ref={inputSixRef}
                />
              </div>
              {loading ? (
                <button className="bg-white/20 mt-3 backdrop-blur-lg cursor-not-allowed w-full py-2 shadow rounded-full flex items-center justify-center space-x-2">
                  <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                  <p className="animate-pulse">Loading...</p>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white/20 mt-3 backdrop-blur-lg cursor-pointer w-full py-2 shadow rounded-full"
                >
                  Send OTP
                </motion.button>
              )}
              <div className="mt-3 pb-4 border-b border-white/30">
                <p className="text-center text-[11px]">
                  By continuing, you agree to our{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    User Agreement
                  </span>{" "}
                  and acknowledge that you understand the{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
              <div className="py-3">
                <p className="text-center text-[11px]">
                  Want to get your own software? Contact Us at 09136079969
                </p>
              </div>
            </form>
          </>
        ) : isDisplayed === "password" ? (
          <>
            <h2 className="text-center font-bold pb-3 lg:text-2xl text-xl">
              Change Password
            </h2>
            <form action="" className="" onSubmit={handleChangePassword}>
              <div className="mb-6">
                <input
                  type="password"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-3 py-2.5 placeholder:text-[#60aff1]"
                  placeholder="New Password *"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setForgetForm({ ...forgetForm, [name]: value });
                  }}
                  value={forgetForm.newPassword}
                  name="newPassword"
                />
              </div>
              <div className="mb-1">
                <input
                  type="password"
                  className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-3 py-2.5 placeholder:text-[#60aff1]"
                  placeholder="Confirm Password *"
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
              </div>
              {loading ? (
                <button className="bg-white/20 mt-3 backdrop-blur-lg cursor-not-allowed w-full py-2 shadow rounded-full flex items-center justify-center space-x-2">
                  <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                  <p className="animate-pulse">Loading...</p>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="bg-white/20 mt-3 backdrop-blur-lg cursor-pointer w-full py-2 shadow rounded-full"
                >
                  Change Password
                </motion.button>
              )}
              <div className="mt-3 pb-4 border-b border-white/30">
                <p className="text-center text-[11px]">
                  By continuing, you agree to our{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    User Agreement
                  </span>{" "}
                  and acknowledge that you understand the{" "}
                  <span className="hover:text-blue-500 cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
              <div className="py-3">
                <p className="text-center text-[11px]">
                  Want to get your own software? Contact Us at 09136079969
                </p>
              </div>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}

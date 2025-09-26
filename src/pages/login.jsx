import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useGlobal } from "../context/globalContext";
import { ToastContainer } from "react-toastify";

export default function Login() {
  const { navigate, login, loginLoading, loginChange, loginForm } = useGlobal();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <ToastContainer />
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-white/20 backdrop-blur-lg absolute top-2 left-2 px-5 py-1.5 rounded-full cursor-pointer shadow text-white font-semibold flex items-center"
      >
        <FaArrowRightLong className="rotate-180 mr-2 mt-0.5" /> Home
      </button>
      <div className="bg-[url(./assets/02.jpg)] min-h-screen w-full flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-lg rounded-xl py-6 px-6 lg:w-105 w-78 md:w-105 shadow-lg text-white">
          <h2 className="text-center font-bold pb-3 lg:text-2xl text-xl">
            Log in
          </h2>
          <form action="" className="" onSubmit={login}>
            <div className="mb-6">
              <input
                type="text"
                className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-3 py-2.5 placeholder:text-[#60aff1]"
                placeholder="Email *"
                onChange={loginChange}
                value={loginForm.email}
                name="email"
              />
            </div>
            <div className="mb-1">
              <input
                type="password"
                className="w-full rounded-full bg-white text-[#60aff1] shadow outline-0 ps-3 py-2.5 placeholder:text-[#60aff1]"
                placeholder="Password *"
                onChange={loginChange}
                value={loginForm.password}
                name="password"
              />
            </div>
            <div className="flex items-end justify-end">
              <p className="text-sm hover:text-blue-500 cursor-pointer transition-all">
                <Link to={"/forget"}>Forget Password?</Link>
              </p>
            </div>
            {loginLoading ? (
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
                Log in
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
        </div>
      </div>
    </>
  );
}

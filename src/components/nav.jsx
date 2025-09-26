import { motion, useScroll } from "framer-motion";
import img from "../assets/orbis_logo.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import { useGlobal } from "../context/globalContext";

export default function Navbar() {
  const [showSideNav, setShowSideNav] = useState(false);
  const { token } = useGlobal();
  return (
    <div>
      <div className="bg-white fixed z-40 w-full shadow-lg py-1.5 lg:flex hidden items-center justify-between pe-3">
        <Link to={"/"}>
          <div className="">
            <img src={img} className="h-12" alt="" />
          </div>
        </Link>
        <div className="flex space-x-6">
          <motion.p
            whileHover={{ y: -1.5 }}
            className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-[#146ebd]"
          >
            <a href="#specialization">Specialization</a>
          </motion.p>
          <motion.p
            whileHover={{ y: -1.5 }}
            className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-[#146ebd]"
          >
            <a href="#departments">Departments</a>
          </motion.p>
          <motion.p
            whileHover={{ y: -1.5 }}
            className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-[#146ebd]"
          >
            <a href="#services">Services</a>
          </motion.p>
          <motion.p className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-[#146ebd]">
            <a href="#doctors">Our Doctors</a>
          </motion.p>
          <motion.p
            whileHover={{ y: -1.5 }}
            className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-[#146ebd]"
          >
            <a href="#contact">Contact</a>
          </motion.p>
        </div>
        <div>
          {token ? (
            <Link to={"/dashboard"}>
              <button className="bg-[#146ebd] flex items-center cursor-pointer text-white font-semibold rounded-full py-1.5 px-5">
                Access Dashboard <FaArrowRightLong className="ml-2" />
              </button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="bg-[#146ebd] flex items-center cursor-pointer text-white font-semibold rounded-full py-1.5 px-5">
                Sign In <FaArrowRightLong className="ml-2" />
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-white fixed w-full shadow-lg z-40  flex lg:hidden justify-between items-center pe-3 py-1.5">
        <Link to={"/"}>
          <div className="">
            <img src={img} className="h-12" alt="" />
          </div>
        </Link>
        <div
          onClick={() => {
            setShowSideNav(true);
          }}
          className="transition-all hover:bg-blue-200 cursor-pointer p-2 rounded-md"
        >
          <FiMenu size={30} />
        </div>
      </div>
      <div
        className={`fixed top-0 w-full h-screen lg:hidden z-50  bg-[#00000049] ${
          showSideNav ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`bg-white fixed lg:hidden  z-60 transition-all top-0 w-[55%] md:w-[40%] -left-[100%] side py-2.5 px-2 h-screen overflow-y-scroll ${
          showSideNav ? "left-0" : ""
        }`}
      >
        <div className="flex justify-between">
          <Link to={"/"}>
            <h2 className="font-test text-3xl text-[#146ebd]">Orbis</h2>
          </Link>
          <div
            onClick={() => {
              setShowSideNav(false);
            }}
            className="transition-all hover:bg-blue-200 cursor-pointer p-1.5 rounded-md"
          >
            <HiXMark size={25} />
          </div>
        </div>
        <div className="py-2 ">
          {token ? (
            <Link to={"/dashboard"}>
              <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
                <p>Access Dashboard</p>
              </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
                <p>Sign up</p>
              </div>
            </Link>
          )}
          <Link>
            <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
              <p>Our Doctors</p>
            </div>
          </Link>
          <Link>
            <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
              <p>Contact</p>
            </div>
          </Link>
          <Link>
            <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
              <p>About Us</p>
            </div>
          </Link>
          <Link>
            <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
              <p>Terms of use</p>
            </div>
          </Link>
          <Link>
            <div className="hover:bg-blue-100 hover:text-blue-500 transition-all flex space-x-2 items-center  w-full px-2 py-2 rounded-md">
              <p>Privacy Policy</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

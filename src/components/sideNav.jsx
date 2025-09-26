import { useGlobal } from "../context/globalContext";
import img from "../assets/orbis_logo.png";
import { AiFillPrinter } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaUserNurse } from "react-icons/fa6";
import { MdLocalPharmacy } from "react-icons/md";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";
import { RiMedicineBottleLine } from "react-icons/ri";
import { FaRegCalendar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaUserDoctor } from "react-icons/fa6";
import { FaBed } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { CiMoneyBill, CiUser } from "react-icons/ci";
import { FcDepartment } from "react-icons/fc";
import { FaDiagnoses } from "react-icons/fa";

export default function SideNav() {
  const { path, navigate, currentUser, userRole, signOut, userId } =
    useGlobal();
  const [display, setDisplay] = useState(false);
  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    setActive(path);
    setDisplay(false);
  }, [navigate]);

  if (path && path.includes("dashboard"))
    return (
      <>
        <div className="bg-white fixed w-full shadow-lg z-1  flex lg:hidden justify-between items-center pe-3 py-1.5">
          <Link to={"/"}>
            <div className="">
              <img src={img} className="h-12" alt="" />
            </div>
          </Link>
          <div
            onClick={() => {
              setDisplay(true);
            }}
            className="transition-all hover:bg-blue-200 cursor-pointer p-2 rounded-md"
          >
            <FiMenu size={30} />
          </div>
        </div>
        <div
          className={`lg:hidden block fixed z-2 top-0 w-full h-screen ${
            display ? "block" : "hidden"
          } bg-[#00000049]`}
        ></div>
        <div
          className={`${
            display ? "left-0" : "left-[-100%]"
          } lg:left-0 fixed lg:w-[20%] md:w-[40%] w-[60%] h-screen z-3 overflow-y-scroll transition-all side bg-[#156dbd] px-2 py-3`}
        >
          <div className="pb-1 flex justify-between items-center">
            <Link to={"/"}>
              <h2 className="font-test px-2 text-3xl text-white">Orbis</h2>
            </Link>
            <div
              onClick={() => {
                setDisplay(false);
              }}
              className="transition-all lg:hidden text-white/50 cursor-pointer p-1.5 rounded-md"
            >
              <HiXMark size={25} />
            </div>
          </div>
          <ul className="py-2 text-white">
            <Link to={"/dashboard"}>
              <li
                className={`flex items-center mb-1 space-x-2 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard" ? "bg-[#3587ca]" : ""
                }`}
              >
                <AiFillPrinter className="text-lg" />{" "}
                <span className="lg:text-lg">Dashboard</span>
              </li>
            </Link>
            <Link
              to={
                userRole === "patient"
                  ? `/dashboard/diagnostic/${userId}`
                  : "/dashboard/patients"
              }
              className={`${userRole === "accountant" ? "hidden" : "block"}`}
            >
              <li
                className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard/patients" ||
                  active.includes("diagnostic")
                    ? "bg-[#3587ca]"
                    : ""
                }`}
              >
                {userRole === "patient" ? (
                  <FaDiagnoses className="text-lg" />
                ) : (
                  <CiUser className="text-lg" />
                )}{" "}
                <span className="lg:text-lg">
                  {userRole === "patient" ? "Diagnostic" : "Patients"}
                </span>
              </li>
            </Link>
            {userRole === "admin" && (
              <Link to={"/dashboard/doctors"}>
                <li
                  className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                    active === "/dashboard/doctors" ? "bg-[#3587ca]" : ""
                  }`}
                >
                  <FaUserDoctor className="text-lg" />{" "}
                  <span className="lg:text-lg">Doctors</span>
                </li>
              </Link>
            )}
            {/* {userRole === "admin" ||
              userRole === "doctor" ||
              (userRole === "receptionist" && (
  
              ))} */}
            <Link to={"/dashboard/appointments"}>
              <li
                className={`flex ${
                  userRole === "admin" ||
                  userRole === "doctor" ||
                  userRole === "patient" ||
                  userRole === "receptionist"
                    ? "block"
                    : "hidden"
                } items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard/appointments" ? "bg-[#3587ca]" : ""
                }`}
              >
                <FaRegCalendar className="text-lg" />{" "}
                <span className="lg:text-lg">Appointments</span>
              </li>
            </Link>
            {userRole === "admin" && (
              <>
                <Link to={"/dashboard/nurses"}>
                  <li
                    className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                      active === "/dashboard/nurses" ? "bg-[#3587ca]" : ""
                    }`}
                  >
                    <FaUserNurse className="text-lg" />{" "}
                    <span className="lg:text-lg">Nurses</span>
                  </li>
                </Link>
                <Link to={"/dashboard/accountants"}>
                  <li
                    className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                      active === "/dashboard/accountants" ? "bg-[#3587ca]" : ""
                    }`}
                  >
                    <MdOutlineAttachMoney size={21} className="text-lg" />{" "}
                    <span className="lg:text-lg">Accountants</span>
                  </li>
                </Link>
                <Link to={"/dashboard/pharmacists"}>
                  <li
                    className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                      active === "/dashboard/pharmacists" ? "bg-[#3587ca]" : ""
                    }`}
                  >
                    <MdLocalPharmacy size={21} className="text-lg" />{" "}
                    <span className="lg:text-lg">Pharmacists</span>
                  </li>
                </Link>
                <Link to={"/dashboard/receptionists"}>
                  <li
                    className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                      active === "/dashboard/receptionists"
                        ? "bg-[#3587ca]"
                        : ""
                    }`}
                  >
                    <IoIosPerson size={21} className="text-lg" />{" "}
                    <span className="lg:text-lg">Receptionists</span>
                  </li>
                </Link>
              </>
            )}
            <Link
              to={"/dashboard/drugs"}
              className={`${
                userRole === "admin" ||
                userRole === "pharmacist" ||
                userRole === "headPharmacist" ||
                userRole === "patient"
                  ? "block"
                  : "hidden"
              }`}
            >
              <li
                className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard/drugs" ? "bg-[#3587ca]" : ""
                }`}
              >
                <RiMedicineBottleLine size={21} className="text-lg" />{" "}
                <span className="lg:text-lg">Drugs</span>
              </li>
            </Link>
            <Link
              to={"/dashboard/billing"}
              className={`${
                userRole === "accountant" ||
                userRole === "admin" ||
                userRole === "patient"
                  ? "block"
                  : "hidden"
              }`}
            >
              <li
                className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard/billing" ? "bg-[#3587ca]" : ""
                }`}
              >
                <CiMoneyBill size={21} className="text-lg" />{" "}
                <span className="lg:text-lg">
                  {userRole === "patient" ? "Payment History" : "Billing"}
                </span>
              </li>
            </Link>
            {userRole === "admin" && (
              <Link to={"/dashboard/departments"}>
                <li
                  className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                    active === "/dashboard/departments" ||
                    active.includes("department")
                      ? "bg-[#3587ca]"
                      : ""
                  }`}
                >
                  <FcDepartment size={21} className="text-lg" />{" "}
                  <span className="lg:text-lg">Departments</span>
                </li>
              </Link>
            )}
            <Link
              to={
                userRole === "nurse" && currentUser
                  ? `/dashboard/wards/${currentUser.ward._id}`
                  : "/dashboard/wards"
              }
              className={`${
                userRole === "admin" || userRole === "nurse"
                  ? "block"
                  : "hidden"
              }`}
            >
              <li
                className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active.includes("wards") ? "bg-[#3587ca]" : ""
                }`}
              >
                <FaBed size={21} className="text-lg" />{" "}
                <span className="lg:text-lg">Wards</span>
              </li>
            </Link>
            <Link
              to={"/dashboard/profile"}
              className={`${userRole === "admin" ? "block" : "hidden"}`}
            >
              <li
                className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2 ${
                  active === "/dashboard/profile" ? "bg-[#3587ca]" : ""
                }`}
              >
                <ImProfile size={21} className="text-lg" />{" "}
                <span className="lg:text-lg">Profile</span>
              </li>
            </Link>
            <li
              onClick={signOut}
              className={`flex items-center space-x-2 mb-1 cursor-pointer transition-all rounded-xl text-white hover:bg-[#3587ca] px-2 py-2`}
            >
              <FaSignOutAlt size={21} className="text-lg" />{" "}
              <span className="lg:text-lg">Sign Out</span>
            </li>
          </ul>
        </div>
        <div className="lg:ml-[20%] pt-15 lg:pt-0 py-1 lg:block hidden bg-[#f5f9ff]">
          <div className="py-3 px-6">
            <div className="flex justify-between items-center">
              <h2 className="lg:text-3xl capitalize font-semibold">
                {path === "/dashboard"
                  ? "Dashboard"
                  : path === "/dashboard/drugs" && userRole === "patient"
                  ? "Available Drugs"
                  : path === "/dashboard/profile"
                  ? "My Profile"
                  : path.includes("department")
                  ? "Department Management"
                  : path.includes("ward")
                  ? "Ward Management"
                  : path.includes("diagnostic")
                  ? "Patient's Diagnostic"
                  : `${path.slice(11, path.length)} Management`}
              </h2>
              <div className="bg-white flex space-x-2 items-center rounded-xl border py-1 px-4 border-white/30 shadow">
                <CiUser size={21} className="text-[#156dbd]" />
                <span className="capitalize">
                  {currentUser ? currentUser.name : ""} (
                  {currentUser ? `${currentUser.role.slice(0, 3)}.` : ""})
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/nav";
import { GoMoveToTop } from "react-icons/go";
import Test from "./components/test";
import Home from "./pages/home";
import Login from "./pages/login";
import ForgetPassword from "./pages/forget";
import Dashboard from "./pages/dashboard";
import SideNav from "./components/sideNav";
import Patients from "./pages/patients";
import Doctors from "./pages/doctors";
import Nurses from "./pages/nurses";
import Pharmacists from "./pages/pharmacists";
import Accountants from "./pages/accountants";
import Profile from "./pages/profile";
import Moulder from "./components/moulder";
import Receptionist from "./pages/receptionists";
import Departments from "./pages/departments";
import { ToastContainer } from "react-toastify";
import SingleDepartment from "./pages/singleDepartment";
import Wards from "./pages/wards";
import SingleWards from "./pages/singleWard";
import Appointment from "./pages/appointment";
import Diagnostic from "./pages/diagnostic";
import Medicine from "./pages/medicine";
import Billing from "./pages/billing";

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div>
      {/* <Test /> */}
      <Moulder />
      <SideNav />
      <ToastContainer />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/patients" element={<Patients />} />
          <Route path="/dashboard/appointments" element={<Appointment />} />
          <Route path="/dashboard/doctors" element={<Doctors />} />
          <Route path="/dashboard/nurses" element={<Nurses />} />
          <Route path="/dashboard/accountants" element={<Accountants />} />
          <Route path="/dashboard/departments" element={<Departments />} />
          <Route path="/dashboard/department/:id" element={<SingleDepartment />} />
          <Route path="/dashboard/pharmacists" element={<Pharmacists />} />
          <Route path="/dashboard/receptionists" element={<Receptionist />} />
          <Route path="/dashboard/wards" element={<Wards />} />
          <Route path="/dashboard/wards/:id" element={<SingleWards />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/diagnostic/:id" element={<Diagnostic />} />
          <Route path="/dashboard/drugs" element={<Medicine />} />
          <Route path="/dashboard/billing" element={<Billing />} />
        </Routes>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className={`fixed bottom-2 right-2 rounded-full z-60  p-3 cursor-pointer bg-[#146ebd] items-center justify-center ${
          show ? "flex" : "hidden"
        }`}
      >
        <GoMoveToTop className="text-white" size={20} />
      </motion.button>
    </div>
  );
}

export default App;

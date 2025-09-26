import { FaAngleDoubleRight } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosCall } from "react-icons/io";
import { MdDoubleArrow, MdEmail } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import Navbar from "../components/nav";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="lg:pt-15 pt-11">
        <div className="bg-[url('./assets/1.jpg')] cursor-pointer h-[90.5vh] bg-cover bg-no-repeat bg-center lg:px-13 px-6 flex justify-center flex-col">
          <h2 className="font-bold lg:text-4xl md:text-3xl text-2xl mb-1">
            Best Medical Center
          </h2>
          <h1 className="font-bold lg:text-6xl leading-15 md:text-5xl text-3xl lg:leading-18">
            <span className="text-[#146ebd]">Bringing Health</span> To <br />
            life for the whole <br />
            family
          </h1>
          <div className="mt-5">
            <button className="bg-[#146ebd] px-4 py-2 flex items-center cursor-pointer text-white">
              Get Appointment
              <FaAngleDoubleRight className="ml-2" size={19} />
            </button>
          </div>
        </div>
        <motion.div
          id="specialization"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="py-21 bg-[#f5f9ff]"
        >
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center font-light"
          >
            We Offer Specialized{" "}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center text-3xl font-bold mt-2.5"
          >
            Orthopedics To Meet Your Needs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-10 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7"
          >
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="hover:transition-all hover:shadow-xl hover:-translate-y-1 bg-white p-5"
            >
              <div className="pb-3">
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/feature/1.png"
                  className="h-15 w-15"
                  alt=""
                />
              </div>
              <h2 className="text-xl font-semibold pb-3">Medical Treatment</h2>
              <p className="text-md text-gray-600 pb-3">
                We try to ensure the best Medical treatment to restores health
                through diagnosis, medication and surgery
              </p>
              <button className="font-semibold flex items-center cursor-pointer transition-colors hover:text-blue-600">
                Read More <FaAngleDoubleRight className="ml-1 text-sm mt-1" />
              </button>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="hover:transition-all hover:shadow-xl hover:-translate-y-1 bg-white p-5"
            >
              <div className="pb-3">
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/feature/2.png"
                  className="h-15 w-15"
                  alt=""
                />
              </div>
              <h2 className="text-xl font-semibold pb-3">Emergency Help</h2>
              <p className="text-md text-gray-600 pb-3">
                Our Clinic provides urgent emergency help, offering fast
                treatment, care, and medical support anytime.
              </p>
              <button className="font-semibold flex items-center cursor-pointer transition-colors hover:text-blue-600">
                Read More <FaAngleDoubleRight className="ml-1 text-sm mt-1" />
              </button>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="hover:transition-all hover:shadow-xl hover:-translate-y-1 bg-white p-5"
            >
              <div className="pb-3">
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/feature/3.png"
                  className="h-15 w-15"
                  alt=""
                />
              </div>
              <h2 className="text-xl font-semibold pb-3">Medical Treatment</h2>
              <p className="text-md text-gray-600 pb-3">
                Our Medical professionals in the clinic offer expert care,
                diagnosis, treatment, and patient support daily.
              </p>
              <button className="font-semibold flex items-center cursor-pointer transition-colors hover:text-blue-600">
                Read More <FaAngleDoubleRight className="ml-1 text-sm mt-1" />
              </button>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="hover:transition-all hover:shadow-xl hover:-translate-y-1 bg-white p-6"
            >
              <div className="pb-3">
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/feature/4.png"
                  className="h-15 w-15"
                  alt=""
                />
              </div>
              <h2 className="text-xl font-semibold pb-3">Medical Treatment</h2>
              <p className="text-md text-gray-600 pb-3">
                The Qualified doctors in the clinic provide expert medical care,
                diagnosis, and trusted health support.
              </p>
              <button className="font-semibold flex items-center cursor-pointer transition-colors hover:text-blue-600">
                Read More <FaAngleDoubleRight className="ml-1 text-sm mt-1" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div className="pt-20" id="departments">
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center font-light"
          >
            We Are The{" "}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center mt-2 font-bold"
          >
            Best at Our Departments{" "}
          </motion.h2>
          <div className=" lg:grid-cols-9 pt-13 px-15 grid-cols-2 grid gap-3">
            {Array.from({ length: 9 }, (_, i) => 1 + i).map((index) => (
              <motion.div
                key={index}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="cursor-poiinter bg-[#f5f9ff] flex items-center justify-center p-6"
              >
                <div className="">
                  <img
                    src={`https://labartisan.net/demo/mukti/assets/images/depart/icon/0${index}.png`}
                    className="h-15 w-15"
                    alt=""
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:px-10 px-3 py-5">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-white shadow-2xl z-20 relative p-3 flex lg:flex-row flex-col-reverse space-x-2"
            >
              <div className="lg:w-1/2 py-7 lg:px-6">
                <h2 className="font-semibold text-2xl">
                  Speciality Opthamology
                </h2>
                <p className="py-5 text-gray-600 leading-7">
                  Our ophthalmologist combines medical expertise with
                  compassionate care, offering accurate diagnoses and effective
                  treatments for eye conditions. They use advanced technology,
                  listen to patient concerns, and are dedicated to preserving
                  and improving vision, ensuring the best possible eye health
                  outcomes.
                </p>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-2.5 lg:gap-y-3 text-gray-600">
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>Qualified Doctors</span>
                  </p>
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>Feels Like Home Service</span>
                  </p>
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>24 x 7 Emergency Services</span>
                  </p>
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>Outdoor Checkup</span>
                  </p>
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>General Medical</span>
                  </p>
                  <p className="flex space-x-1 items-center">
                    <FaCheck className="text-[#146ebd]" />
                    <span>Easy and Affordable Billing</span>
                  </p>
                </div>
                <div className="mt-10">
                  <button className="bg-[#146ebd] px-4 py-2 flex items-center cursor-pointer text-white">
                    Get Appointment
                    <FaAngleDoubleRight className="ml-2" size={19} />
                  </button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/depart/07.jpg"
                  className="w-full h-full"
                  alt=""
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="bg-[#146ebd] lg:px-23 z-10 lg:py-21 py-10 gap-15 relative -top-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-20"
          >
            <div className="flex justify-center items-center space-x-4">
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/counter/01.png"
                  alt=""
                />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-3xl">10 +</h2>
                <p>Patients Every Day</p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/counter/02.png"
                  alt=""
                />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-3xl">24 +</h2>
                <p>Qualified Docotrs</p>
              </div>
            </div>
            <div className="flex  justify-center items-center space-x-4">
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/counter/03.png"
                  alt=""
                />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-3xl">3 +</h2>
                <p>Years Experience</p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/counter/04.png"
                  alt=""
                />
              </div>
              <div className="text-white">
                <h2 className="font-bold text-3xl">22 +</h2>
                <p>Diagnosis Verify</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:-mt-7  pt-21 pb-15 bg-[#f5f9ff]"
          id="services"
        >
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center font-light"
          >
            We Are{" "}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center mt-2 font-bold"
          >
            Offering Reliable Services{" "}
          </motion.h2>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="lg:px-10 lg:pt-14 py-5 px-3"
          >
            <div className="grid lg:grid-cols-2 grid-cols-1">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/service/01.jpg"
                  alt=""
                  className="w-full h-full"
                />
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="bg-white px-5 py-6"
              >
                <h2 className="text-xl font-bold">Family Health Solutions</h2>
                <p className="py-4 text-gray-600 leading-7">
                  Family health solutions focus on comprehensive care for all
                  ages, addressing physical, mental, and emotional well-being.
                  These services include preventive care, chronic disease
                  management, vaccinations, and health education. They aim to
                  promote long-term wellness and support healthier lifestyles
                  for every family member.
                </p>
                <div className="mt-5">
                  <Link to={"/register"}>
                    <button className="bg-[#146ebd] px-4 py-2 flex items-center cursor-pointer text-white">
                      Register Now
                      <FaAngleDoubleRight className="ml-2" size={19} />
                    </button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="flex lg:flex-row flex-col"
              >
                <div className="lg:w-1/2">
                  <img
                    src="https://labartisan.net/demo/mukti/assets/images/service/02.jpg"
                    alt=""
                    className="h-full w-full"
                  />
                </div>
                <div className="lg:w-1/2 bg-[#146ebd] text-white py-6 px-5">
                  <h2 className="font-bold text-xl">Eye Care Solutions</h2>
                  <p className="py-4">
                    We carry out include regular check-ups, vision correction,
                    treatment for eye diseases. These services help maintain
                    clear vision, prevent issues, and support overall eye health
                    at every age.
                  </p>
                  <div className="mt-5">
                    <Link to={"/register"}>
                      <button className="bg-white px-4 py-2 flex items-center cursor-pointer text-[#146ebd]">
                        Register Now
                        <FaAngleDoubleRight className="ml-2" size={19} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="flex lg:flex-row flex-col"
              >
                <div className="lg:w-1/2">
                  <img
                    src="https://labartisan.net/demo/mukti/assets/images/service/03.jpg"
                    alt=""
                    className="h-full w-full"
                  />
                </div>
                <div className="lg:w-1/2 bg-[#379ff4] text-white py-6 px-5">
                  <h2 className="font-bold text-xl">Eye Care Solutions</h2>
                  <p className="py-4">
                    We carry out include regular check-ups, vision correction,
                    treatment for eye diseases. These services help maintain
                    clear vision, prevent issues, and support overall eye health
                    at every age.
                  </p>
                  <div className="mt-5">
                    <Link to={"/register"}>
                      <button className="bg-white px-4 py-2 flex items-center cursor-pointer text-[#379ff4]">
                        Register Now
                        <FaAngleDoubleRight className="ml-2" size={19} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="flex lg:flex-row flex-col-reverse">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="bg-white px-5 py-6 lg:w-1/2"
              >
                <h2 className="text-xl font-bold">Dental Surgery</h2>
                <p className="py-4 text-gray-600 leading-7">
                  We carry out Dental surgeries which involves specialized
                  procedures to treat complex oral health issues, including
                  tooth extractions, implants, and corrective jaw surgeries.
                  Performed by skilled oral surgeons, these treatments aim to
                  restore function, relieve pain, and improve the appearance and
                  health of a patient’s teeth and gums.
                </p>
                <div className="mt-5">
                  <Link to={"/register"}>
                    <button className="bg-[#146ebd] px-4 py-2 flex items-center cursor-pointer text-white">
                      Register Now
                      <FaAngleDoubleRight className="ml-2" size={19} />
                    </button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="lg:w-1/2"
              >
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/service/01.jpg"
                  alt=""
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
        <div className="pt-20 pb-15" id="doctors">
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center font-light"
          >
            Meet Our{" "}
          </motion.h2>
          <motion.h2
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-3xl text-center mt-2 font-bold"
          >
            Orbis Professional Doctors{" "}
          </motion.h2>
          <div className="lg:px-10 lg:pt-14 py-5 px-3 grid lg:grid-cols-4 gap-7 md:lg-grid-cols-2 grid-cols-1">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-white hover:transition-all hover:shadow-xl"
            >
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/team/01.jpg"
                  className="w-full"
                  alt=""
                />
              </div>
              <div className="bg-[#37c9dd] py-4.5 px-5  text-white">
                <h2 className="text-xl font-semibold mb-1">
                  Dr Jason Kovalsky
                </h2>
                <p>Cardiologist</p>
              </div>
              <div className="px-5 py-4">
                <p>Phone: 09136079969</p>
                <p>Email: ucantseeme@gmail.com</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-white hover:transition-all hover:shadow-xl"
            >
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/team/02.jpg"
                  className="w-full"
                  alt=""
                />
              </div>
              <div className="bg-[#3fa5eb] py-4.5 px-5  text-white">
                <h2 className="text-xl font-semibold mb-1">Patricia Mcneel</h2>
                <p>Pediatrist</p>
              </div>
              <div className="px-5 py-4">
                <p>Phone: 09136079969</p>
                <p>Email: ucantseeme@gmail.com</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-white hover:transition-all hover:shadow-xl"
            >
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/team/03.jpg"
                  className="w-full"
                  alt=""
                />
              </div>
              <div className="bg-[#0383cd] py-4.5 px-5  text-white">
                <h2 className="text-xl font-semibold mb-1">William Khanna</h2>
                <p>Throat Specialist</p>
              </div>
              <div className="px-5 py-4">
                <p>Phone: 09136079969</p>
                <p>Email: ucantseeme@gmail.com</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="bg-white hover:transition-all hover:shadow-xl"
            >
              <div>
                <img
                  src="https://labartisan.net/demo/mukti/assets/images/team/04.jpg"
                  className="w-full"
                  alt=""
                />
              </div>
              <div className="bg-[#3156a3] py-4.5 px-5  text-white">
                <h2 className="text-xl font-semibold mb-1">Eric Patterson</h2>
                <p>Therapy</p>
              </div>
              <div className="px-5 py-4">
                <p>Phone: 09136079969</p>
                <p>Email: ucantseeme@gmail.com</p>
              </div>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <div className="mt-5">
              <Link to={"/register"}>
                <button className="px-4 py-2 flex items-center cursor-pointer text-white bg-[#146ebd]">
                  Register Now
                  <FaAngleDoubleRight className="ml-2" size={19} />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-15 pb-15">
          <div className="flex lg:flex-row flex-col">
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="lg:w-1/2 bg-[url('./assets/01.jpg')] py-15 px-12 text-white"
            >
              <h2 className="font-bold lg:text-4xl text-2xl">24 Hours</h2>
              <h2 className="font-bold lg:text-4xl mt-2 text-2xl">
                Opening Our Services
              </h2>
              <div className="pt-12 pb-9 space-y-5">
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Saturday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Sunday</h2>
                  <h2>6:00 am-8:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Monday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Tuesday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Wednesday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Thursday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Friday</h2>
                  <h2>Closed</h2>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="lg:w-1/2 bg-[url('./assets/02.jpg')] py-15 px-12 text-white"
            >
              <h2 className="font-bold lg:text-4xl text-2xl mb-2">
                The Perfect Hospital
              </h2>
              <p className="py-3">
                Orbisis a powerful, integrated solution designed to optimize and
                automate the daily operations of healthcare facilities. From
                patient registration and appointment scheduling to billing, lab
                reports, pharmacy management, and electronic health records, our
                system ensures smooth coordination across all departments. It
                enhances data accuracy, reduces manual errors, and improves
                decision-making with real-time analytics and reporting tools.
              </p>
              <p className="py-3">
                With a user-friendly interface and customizable modules, the
                system is suitable for hospitals of all sizes. It supports
                multi-location operations, data security, role-based access, and
                compliance with healthcare regulations. Staff can focus more on
                patient care while administrative tasks are handled efficiently.
              </p>
              <p className="py-3">
                Whether you're looking to improve workflow, increase efficiency,
                or deliver better patient experiences, our Hospital Management
                System is the ideal solution. Empower your facility with the
                technology it needs to thrive in today’s fast-paced healthcare
                environment.
              </p>
              <div className="mt-10">
                <button className="text-[#146ebd] px-4 py-2 flex items-center cursor-pointer bg-white">
                  Get Appointment
                  <FaAngleDoubleRight className="ml-2" size={19} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="pt-10"
          id="contact"
        >
          <div className="bg-[#146ebd] text-white py-10 px-7 flex lg:space-y-0 space-y-4 lg:flex-row lg:justify-between flex-col">
            <div className="text-center lg:text-left">
              <h2 className="font-bold lg:text-3xl">Visit Us Now</h2>
              <p className="text-sm mt-1">
                at the dondada plaza plot 234 nowhere avenue everywhere
              </p>
            </div>
            <div className="lg:text-right text-center mt-2 lg:mt-0">
              <h2 className="font-bold lg:text-3xl">Or Contact us at</h2>
              <p className="text-sm">
                +23491929957, +2348068932068, +2348133557845
              </p>
            </div>
          </div>
        </motion.div>
        <motion.footer
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="bg-[url(./assets/bg1.png)] lg:px-14 px-1.5 pt-17 pb-10"
        >
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 pb-10">
            <div>
              <h2 className="font-bold lg:text-2xl">Contact Info</h2>
              <p className="py-5 text-gray-600">
                For more information or assistance, please contact us anytime
                via phone, email, website, or social media.
              </p>
              <div className="space-y-2">
                <p className="flex text-gray-600 items-center space-x-2.5">
                  <FaHouseChimney className="text-blue-500" />
                  <span>Suite 02 New Elephant Road usa</span>
                </p>
                <p className="flex text-gray-600 items-center space-x-2.5">
                  <IoIosCall className="text-blue-500" />
                  <span>+23491929957, +2348068932068</span>
                </p>
                <p className="flex items-center space-x-2.5">
                  <MdEmail className="text-blue-500" />
                  <span> info@mukti.com</span>
                </p>

                <p className="flex items-center space-x-2.5">
                  <CiGlobe className="text-blue-500" />
                  <span> info@mukti.com</span>
                </p>
              </div>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <h2 className="font-bold lg:text-2xl mr-2">Our Doctors</h2>
              <div className="space-y-2 py-5">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
                  <p key={index} className="flex  items-center space-x-1 hover:text-blue-500 lg:hover:translate-x-2.5 cursor-pointer transition-all">
                    <FaAngleDoubleRight className="text-sm" />
                    <span className="text-black hover:text-blue-500">
                      {index === 1
                        ? "Dr Nick Simmons"
                        : index === 2
                        ? "Dr Max Turner"
                        : index === 5
                        ? "Dr Amy Adams"
                        : "Dr Micheal Linden"}
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:flex flex-col justify-center items-center">
              <h2 className="font-bold lg:text-2xl mr-8">Our Services</h2>
              <div className="space-y-2 py-5">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((index) => (
                  <p key={index} className="flex text-gray-600  items-center space-x-1 hover:text-blue-500 lg:hover:translate-x-2.5 cursor-pointer transition-all">
                    <FaAngleDoubleRight className="text-sm" />
                    <span className="text-black hover:text-blue-500">
                      {index === 1
                        ? "Outpatient Surgery"
                        : index === 2
                        ? "Opthamology Clinic"
                        : index === 5
                        ? "Cardiac Clinic"
                        : "Gynaecologyical Clinic"}
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col  ">
              <h2 className="font-bold lg:text-2xl mb-5">Opening Hours</h2>
              <div className="space-y-1">
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Saturday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Sunday</h2>
                  <h2>6:00 am-8:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Monday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Tuesday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Wednesday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Thursday</h2>
                  <h2>8:00 am-10:00 pm</h2>
                </div>
                <div className="flex justify-between items-center border-b border-white pb-2.5">
                  <h2>Friday</h2>
                  <h2>Closed</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-gray-600 border-gray-200">
            Copyright &copy; 2025{" "}
            <span className="text-blue-500 font-semibold">Orbis</span> .
            Designed by <span className="font-semibold text-black">OneBoy</span>
          </div>
        </motion.footer>
      </div>
    </>
  );
}

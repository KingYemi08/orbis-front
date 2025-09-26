import { CiEdit, CiUser } from "react-icons/ci";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaDownload, FaRegCalendar } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import img from "../assets/person_1.jpg";
import { useGlobal } from "../context/globalContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const {
    base_url,
    Bearer,
    loading,
    setLoading,
    departments,
    userRole,
    getAllDepartments,
    setDisplayMoulder,
    setMoulderContent,
    patients,
    userId,
    appointments,
    getAppointmentForPatient,
    getPatientDiagnostic,
    downloadDiagnostic,
    getAppointmentForDoctor,
    diagnostic,
    getAppointments,
    getPatients,
    currentUser,
    getAllPayments,
    payments,
  } = useGlobal();
  const [error, setError] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [nurses, setNurses] = useState([]);
  const [pharmacists, setPharmacists] = useState([]);

  const getDoctor = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/worker/role/doctor`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setDoctors(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  // console.log(currentUser);

  const getNurse = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/worker/role/nurse`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setNurses(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const getPharmacist = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/worker/role/pharmacist`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setPharmacists(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    if (userRole === "admin") {
      getAllDepartments();
      getDoctor();
      getAllPayments();
      getNurse();
      getPharmacist();
      getPatients();
      getAppointments();
    } else if (userRole === "patient") {
      getAppointmentForPatient(userId);
      getPatientDiagnostic(userId);
    } else if (userRole === "doctor") {
      getAppointmentForDoctor(userId);
    }
  }, []);

  if (loading) return <Loader />;

  if (!currentUser) return <Loader />;

  if (error)
    return (
      <div className="lg:ml-[20%] flex flex-col items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <p className="text-2xl">Something went wrong</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            window.location.reload();
          }}
          className="bg-[#156dbd] py-1.5 px-4 mt-2 rounded-lg cursor-pointer text-white font-semibold"
        >
          Refresh
        </motion.button>
      </div>
    );

  if (userRole !== "admin")
    return (
      <div className="lg:ml-[20%] pt-17 pb-5 lg:pt-3 lg:min-h-[89vh] min-h-[100vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <div className="lg:flex lg:space-x-3">
          <div className="lg:w-[65%]">
            <div className="grid grid-cols-2 gap-2">
              <div className="py-5 flex flex-col items-center justify-center bg-white rounded-lg shadow-lg">
                <div className="">
                  <img
                    src={currentUser.image}
                    className="rounded-full h-35 w-35 "
                    alt=""
                  />
                </div>
                <div className="py-2 space-y-1">
                  <h2 className="font-bold text-2xl">{currentUser.name}</h2>
                  <div className="flex text-sm items-center justify-center space-x-1 text-gray-600">
                    <span>Joined on:</span>
                    <p className="capitalize">
                      {currentUser.createdAt.slice(0, 10)}
                    </p>
                  </div>
                  <p className="text-center text-gray-600 text-sm">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <div className="py-5 px-3.5 bg-white rounded-lg shadow-lg">
                <div className="flex space-x-2">
                  <h2 className="font-semibold text-xl">General Information</h2>
                  <div
                    onClick={() => {
                      setDisplayMoulder(true);
                      setMoulderContent("userEdit");
                    }}
                    className="lg:bg-gray-200 p-2 rounded-full cursor-pointer"
                  >
                    <CiEdit />
                  </div>
                </div>
                <div className="pt-3">
                  <div className="flex font-semibold border-b pt-2 pb-3 border-gray-200 space-x-5">
                    <span>Name:</span>
                    <p className="capitalize">{currentUser.name}</p>
                  </div>
                  <div className="flex font-semibold border-b pb-3 border-gray-200 space-x-5">
                    <span>Age:</span>
                    <p>{currentUser.age} years</p>
                  </div>
                  <div className="flex font-semibold border-b pt-2 pb-3 border-gray-200 space-x-5">
                    <span>Gender:</span>
                    <p className="capitalize">{currentUser.gender}</p>
                  </div>
                  <div className="flex font-semibold pt-2 pb-3 border-gray-200 space-x-5">
                    <span>Phone:</span>
                    <p className="capitalize">{currentUser.phone[0]}</p>
                  </div>
                </div>
              </div>
            </div>
            {appointments.length !== 0 && (
              <div
                className={`${
                  userRole === "patient" || userRole === "doctor"
                    ? "block"
                    : "hidden"
                } mt-3`}
              >
                <div className="bg-white rounded-lg shadow-lg pt-5 px-3">
                  <div className="flex justify-between items-center pb-2.5">
                    <h2 className="font-semibold text-xl">
                      Recent Appointment
                    </h2>
                    <div className="flex">
                      <Link to={"/dashboard/appointments"} className="flex">
                        <span className="text-sm">See all </span>
                        <MdKeyboardArrowRight
                          size={20}
                          className="font-light"
                        />
                      </Link>
                    </div>
                  </div>
                  <div>
                    {appointments.slice(0, 3).map((a) => (
                      <div
                        key={a._id}
                        className="flex justify-between border-b border-gray-200 py-2 items-center"
                      >
                        <div className="flex space-x-2.5">
                          <div>
                            <p className="font-semibold capitalize lg:text-md md:text-[15px] text-[12px]">
                              {a.patient.name}
                            </p>
                            <h4 className="text-[13px] -mt-0.5 font-light">
                              {a.patient.age} years
                            </h4>
                          </div>
                        </div>
                        <div className="text-gray-600 text-[11px] lg:text-sm ">
                          <h3>
                            {a.time.slice(0, 10)} {"  "}
                            {a.time.slice(11, 16)}
                            {"  "}
                            {parseInt(a.time.slice(11, 16)) >= 12 ? "PM" : "AM"}
                          </h3>
                          <h4>Dr. {a.doctor.name}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {userRole === "nurse" && (
              <Link to={`/dashboard/wards/${currentUser.ward._id}`}>
                <div className="bg-white py-5 px-3 shadow-lg rounded-lg mt-3">
                  <h2 className="font-semibold text-2xl">
                    {currentUser.ward.name}
                  </h2>
                  <p className="mt-3 text-gray-600">
                    Ward Capacity: {currentUser.ward.capacity}
                  </p>
                  <p className="mt-3 text-gray-600">
                    Number of Patients: {currentUser.ward.patients.length}
                  </p>
                  <p className="mt-3 text-gray-600">
                    Number of Nurses: {currentUser.ward.nurses.length}
                  </p>
                </div>
              </Link>
            )}
          </div>
          <div className="lg:block hidden lg:w-[35%]">
            {userRole === "patient" && (
              <div className="py-5 px-3.5 bg-white rounded-lg shadow-lg">
                <div className="flex space-x-2">
                  <h2 className="font-semibold text-xl">Medical Information</h2>
                </div>
                <div className="pt-3">
                  <div className="flex font-semibold border-b pb-3 border-gray-200 space-x-5">
                    <span>Blood Group:</span>
                    <p>{currentUser.bloodGroup}</p>
                  </div>
                  <div className="flex font-semibold border-b pt-2 pb-3 border-gray-200 space-x-5">
                    <span>Genotype:</span>
                    <p className="capitalize">{currentUser.genotype}</p>
                  </div>
                  <div className="flex font-semibold border-b pt-2 pb-3 border-gray-200 space-x-5">
                    <span>Weight:</span>
                    <p className="">{currentUser.weight} kg</p>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-3">
              {userRole === "patient" ? (
                <>
                  {diagnostic.length !== 0 && (
                    <>
                      <h2 className="font-semibold text-xl pb-2">
                        Recent Diagnostic
                      </h2>
                      {diagnostic.slice(0, 1).map((d) => (
                        <div
                          key={d._id}
                          className="bg-white relative rounded-lg shadow-xl py-4.5 px-4"
                        >
                          <div className="flex justify-between relative">
                            <div>
                              <h2 className="pb-1 font-semibold">
                                Patient's Symptoms
                              </h2>
                              <ul className="text-gray-600 text-sm">
                                {d.symptoms.map((s) => (
                                  <li key={s} className="capitalize">
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="absolute right-0">
                              <p className="text-[12px] text-gray-600">
                                Created by <br /> Dr. {d.doctor.name} on <br />{" "}
                                {d.createdAt.slice(0, 10)}{" "}
                                {d.createdAt.slice(11, 16)}{" "}
                                {parseInt(d.createdAt.slice(11, 13)) >= 12
                                  ? "PM"
                                  : "AM"}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h2 className="pb-1 font-semibold text-left">
                              Diagnosis
                            </h2>
                            <p className="text-gray-600">{d.diagnosis}</p>
                          </div>
                          <div className="mt-3">
                            <h2 className="pb-1 font-semibold text-left">
                              Recomendation
                            </h2>
                            <p className="text-gray-600">{d.prescription}</p>
                          </div>
                          <div
                            onClick={() => {
                              downloadDiagnostic(d._id);
                            }}
                            className="absolute right-3 top-3 cursor-pointer"
                          >
                            <FaDownload />
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              ) : userRole === "doctor" ? (
                <div>
                  <h2 className="font-semibold text-xl pb-2">Department</h2>
                  <div className="bg-white rounded overflow-hidden shadow-2xl">
                    <div className="w-full">
                      <img
                        src={currentUser.department.image}
                        alt={currentUser.department.name}
                        className="w-full"
                      />
                    </div>
                    <div className="py-3">
                      <h2 className="font-semibold text-xl text-center">
                        {currentUser.department.name}
                      </h2>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="lg:ml-[20%] pt-17 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="lg:flex lg:space-x-4">
        <div className="lg:w-[65%] w-full space-y-4">
          <div className="bg-white rounded-md border border-blue-200 pt-3 pb-5 px-5">
            <h2 className="font-semibold lg:text-2xl pb-2.5">Statistics</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex space-x-3 items-center rounded-md py-3 px-5 bg-[#f5f9ff]">
                <div>
                  <p>
                    <CiUser size={45} className="text-blue-600 font-bold" />
                  </p>
                </div>
                <div>
                  <span className="lg:text-3xl text-xl font-bold">
                    {patients.length}
                  </span>{" "}
                  <br />
                  <span className="lg:text-xl">Patients</span>
                </div>
              </div>
              <div className="flex space-x-3 items-center rounded-md py-3 px-5 bg-[#f5f9ff]">
                <div>
                  <p>
                    <FaUserDoctor size={42} className="text-blue-600" />
                  </p>
                </div>
                <div>
                  <span className="lg:text-3xl text-xl font-bold">
                    {doctors.length}
                  </span>{" "}
                  <br />
                  <span className="lg:text-xl">Doctors</span>
                </div>
              </div>
              <div className="flex space-x-3 items-center rounded-md py-3 px-5 bg-[#f5f9ff]">
                <div>
                  <p>
                    <FaRegCalendar size={42} className="text-blue-600" />
                  </p>
                </div>
                <div>
                  <span className="lg:text-3xl text-xl items-center font-bold">
                    {appointments.length}
                  </span>{" "}
                  <br />
                  <span className="lg:text-xl">Appointments</span>
                </div>
              </div>
              <div className="flex space-x-1 rounded-md py-3 px-5 bg-[#f5f9ff]">
                <div>
                  <p>
                    <MdOutlineAttachMoney size={50} className="text-blue-600" />
                  </p>
                </div>
                <div>
                  <span className="lg:text-3xl text-xl font-bold">
                    ₦{payments.reduce((acc, items) => acc + items.amount, 0)}
                  </span>{" "}
                  <br />
                  <span className="lg:text-xl">Revenue</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-blue-200 pt-3 px-5">
            <div className="flex justify-between items-center pb-2.5">
              <h2 className="font-semibold lg:text-2xl">Recent Appointments</h2>
              <Link to={"/dashboard/appointments"}>
                <div className="flex">
                  <span className="text-sm">See all </span>
                  <MdKeyboardArrowRight size={20} className="font-light" />
                </div>
              </Link>
            </div>
            <div>
              {appointments.slice(0, 3).map((a) => (
                <div
                  key={a._id}
                  className="flex justify-between border-b border-gray-200 py-2 items-center"
                >
                  <div className="flex space-x-2.5">
                    <div>
                      <img
                        src={a.patient.image}
                        className="rounded-full  h-10 w-10"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="font-semibold capitalize lg:text-md md:text-[15px] text-[12px]">
                        {a.patient.name}
                      </p>
                      <h4 className="text-[13px] -mt-0.5 font-light">
                        {a.patient.age} years
                      </h4>
                    </div>
                  </div>
                  <div className="text-gray-600 text-[11px] lg:text-sm ">
                    <h3>
                      {a.time.slice(0, 10)} {"  "}
                      {a.time.slice(11, 16)}
                      {"  "}
                      {parseInt(a.time.slice(11, 16)) >= 12 ? "PM" : "AM"}
                    </h3>
                    <h4>Dr. {a.doctor.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-md border border-blue-200 pt-3 px-5">
              <div className="flex justify-between items-center pb-2">
                <h2 className="font-semibold lg:text-2xl">Doctors</h2>
                <Link to={"/dashboard/doctors"}>
                  <div className="flex">
                    <span className="text-sm">See all </span>
                    <MdKeyboardArrowRight size={20} className="font-light" />
                  </div>
                </Link>
              </div>
              <div>
                {doctors.slice(0, 3).map((d, index) => (
                  <div
                    key={index}
                    className={`flex space-x-2.5 py-2 ${
                      index === 3 ? "" : "border-b"
                    } border-gray-200`}
                  >
                    <img
                      src={d.image}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold lg:text-md md:text-[15px] text-[12px]">
                        {d.name}
                      </p>
                      <h4 className="text-[13px] -mt-0.5 font-light">
                        {d.department.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-md border border-blue-200 pt-3 px-5">
              <div className="flex justify-between items-center pb-2">
                <h2 className="font-semibold lg:text-2xl">Nurses</h2>
                <Link to={"/dashboard/nurses"}>
                  <div className="flex">
                    <span className="text-sm">See all </span>
                    <MdKeyboardArrowRight size={20} className="font-light" />
                  </div>
                </Link>
              </div>
              <div>
                {nurses.slice(0, 3).map((n, index) => (
                  <div
                    key={index}
                    className={`flex space-x-2.5 py-2 ${
                      index === 3 ? "" : "border-b"
                    } border-gray-200`}
                  >
                    <img
                      src={n.image}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold lg:text-md md:text-[15px] text-[12px]">
                        {n.name}
                      </p>
                      <h4 className="text-[13px] -mt-0.5 font-light">
                        {n.ward ? n.ward.name : "No wards"}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:block hidden lg:w-[35%] space-y-3">
          <div className="bg-white rounded-md border border-blue-200 pt-3 pb-5 px-5">
            <h2 className="font-semibold lg:text-2xl pb-2.5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => {
                  setDisplayMoulder(true);
                  setMoulderContent("addPatient");
                }}
                className="rounded-md cursor-pointer py-3 px-3 bg-[#f5f9ff]"
              >
                <div>
                  <p className="p-2 rounded-full bg-blue-200 h-15 w-15 flex items-center justify-center">
                    <CiUser size={45} className="text-blue-600 font-bold" />
                  </p>
                </div>
                <div>
                  <span className="lg:text-xl font-semibold text-xl mt-0.5">
                    Add <br /> Patients
                  </span>{" "}
                </div>
              </div>
              <div
                onClick={() => {
                  setDisplayMoulder(true);
                  setMoulderContent("addAppointment");
                }}
                className="rounded-md cursor-pointer py-3 px-3 bg-[#f5f9ff]"
              >
                <div>
                  <p className="p-2 rounded-full bg-blue-200 h-15 w-15 flex items-center justify-center">
                    <FaRegCalendar
                      size={38}
                      className="text-blue-600 font-bold"
                    />
                  </p>
                </div>
                <div>
                  <span className="lg:text-xl font-semibold text-xl">
                    Schedule <br /> Appointment
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border border-blue-200 pt-3 px-5">
            <div className="flex justify-between items-center pb-2">
              <h2 className="font-semibold lg:text-2xl">Pharmacists</h2>
              <Link to={"/dashboard/pharmacists"}>
                <div className="flex">
                  <span className="text-sm">See all </span>
                  <MdKeyboardArrowRight size={20} className="font-light" />
                </div>
              </Link>
            </div>
            <div>
              {pharmacists.slice(0, 3).map((p, index) => (
                <div
                  key={index}
                  className={`flex space-x-2.5 items-center py-2 ${
                    index === 3 ? "" : "border-b"
                  } border-gray-200`}
                >
                  <img
                    src={p.image}
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold lg:text-md md:text-[15px] text-[12px]">
                      {p.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-md border border-blue-200 pt-3 px-5">
            <div className="flex justify-between items-center pb-2">
              <h2 className="font-semibold lg:text-2xl">Departments</h2>
              <Link to={"/dashboard/departments"}>
                <div className="flex">
                  <span className="text-sm">See all </span>
                  <MdKeyboardArrowRight size={20} className="font-light" />
                </div>
              </Link>
            </div>
            <div>
              {departments.slice(0, 3).map((d, index) => (
                <div
                  key={index}
                  className={`flex space-x-2.5 items-center py-2 ${
                    index === 3 ? "" : "border-b"
                  } border-gray-200`}
                >
                  <img
                    src={d.image}
                    className="h-10 w-10 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold lg:text-md md:text-[15px] text-[12px]">
                      {d.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

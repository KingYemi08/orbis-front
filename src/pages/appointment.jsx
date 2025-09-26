import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { motion } from "framer-motion";
import { TfiAngleDoubleRight, TfiAngleRight } from "react-icons/tfi";
import { useState, useEffect, useRef } from "react";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/loader";
import img from "../assets/empty.jpg";

export default function Appointment() {
  const {
    appointments,
    getAppointments,
    loading,
    error,
    setDisplayMoulder,
    setMoulderContent,
    cancelAppointment,
    appointmentForm,
    setEditingId,
    getAppointmentForPatient,
    getAppointmentForDoctor,
    setDiagnosticForm,
    userRole,
    getDiagnosticById,
    currentUser,
    userId,
    setAppId,
  } = useGlobal();
  const [specificIndex, setSpecificIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [newIndex, setNewIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const dropRef = useRef({});
  const otherRef = useRef({});
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startSlice = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideAny = Object.entries(dropRef.current).some(
        ([id, ref]) => ref && ref.contains(event.target)
      );

      if (!clickedInsideAny) {
        setSpecificIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideAny = Object.entries(otherRef.current).some(
        ([id, ref]) => ref && ref.contains(event.target)
      );

      if (!clickedInsideAny) {
        setNewIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [otherRef]);

  useEffect(() => {
    if (userRole === "doctor") {
      getAppointmentForDoctor(userId);
    } else if (userRole === "patient") {
      getAppointmentForPatient(userId);
    } else {
      getAppointments();
    }
  }, []);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedApp = appointments.filter((p) => {
    const patient_name = p.patient.name.toLowerCase();
    const doctor_name = p.doctor.name.toLowerCase();
    if (search !== "")
      return (
        patient_name.includes(search.toLowerCase()) ||
        doctor_name.includes(search.toLowerCase())
      );
    return appointments;
  });

  const handleCancel = async (id) => {
    if (confirm("Are you sure")) {
      await cancelAppointment(id);
      getAppointments();
    }
  };

  const startEdit = (w) => {
    setDisplayMoulder(true);
    setMoulderContent("addDiagnostic");
    setEditingId(w.diagnostic._id);
    setDiagnosticForm({
      diagnosis: w.diagnostic.diagnosis,
      prescription: w.diagnostic.prescription,
      doctor: userId,
    });
  };

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="lg:ml-[20%] flex flex-col items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[100vh] lg:min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
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

  return (
    <div className="lg:ml-[20%] pt-18 pb-10 lg:pt-3 lg:min-h-[89vh] min-h-[98vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="flex items-center justify-between">
        <div className="border lg:w-105 md:w-95 w-full border-gray-400 ps-2.5 flex items-center rounded-lg text-gray-400">
          <BsSearch />
          <input
            type="text"
            className=" w-full outline-0 py-1.5 text-black placeholder:text-gray-400 ps-2"
            placeholder={
              userRole === "admin"
                ? "Enter Doctor or Patient's name"
                : userRole === "patient"
                ? "Enter Doctor's name"
                : "Enter Patient's name"
            }
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addAppointment");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd]  lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" ||
            userRole === "doctor" ||
            userRole === "receptionist"
              ? "md:block"
              : "hidden"
          }`}
        >
          Add New Appointment
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addAppointment");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd] lg:text-md text-sm md:hidden  cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" || userRole === "doctor" || userRole === "receptionist"
              ? "lg:block"
              : "hidden"
          }`}
        >
          Add New Appointment
        </motion.button>
      </div>
      {displayedApp.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-50 h-52" alt="" />
            <p className="text-gray-600">No Appointment Found....</p>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-t-lg md:block hidden lg:block border border-b-0 border-gray-200">
            <table className="w-full ">
              <thead className="">
                <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                  <th className="text-center">S/N</th>
                  <th className="text-center">Patient Name</th>
                  <th className="text-center">Patient Age</th>
                  {userRole !== "doctor" && (
                    <th className="text-center">Doctor Name</th>
                  )}
                  <th className="text-center">Date</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Status</th>
                  <th
                    className={`text-center ${
                      userRole === "admin" || userRole === "doctor"
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="w-full test">
                {displayedApp
                  .slice(startSlice, startSlice + itemsPerPage)
                  .map((w, index) => (
                    <tr
                      key={w._id}
                      className="h-11 z-1 border-b capitalize border-gray-300"
                    >
                      <td className="text-center">{startSlice + index + 1}</td>
                      <td className="text-center">{w.patient.name}</td>
                      <td className="text-center">{w.patient.age}</td>
                      {userRole !== "doctor" && (
                        <td className="text-center">{w.doctor.name}</td>
                      )}
                      <td className="text-center">{w.time.slice(0, 10)}</td>
                      <td className="text-center">
                        {w.time.slice(11, 16)}
                        {"  "}
                        {parseInt(w.time.slice(11, 16)) >= 12 ? "PM" : "AM"}
                      </td>
                      <td
                        className={`text-center ${
                          w.status === "pending"
                            ? "text-yellow-500"
                            : w.status === "cancelled"
                            ? "text-red-500"
                            : w.status === "overdue"
                            ? "text-red-400"
                            : "text-green-500"
                        }`}
                      >
                        {w.status}
                      </td>
                      <td
                        className={`flex relative justify-center ${
                          userRole === "admin" || userRole === "doctor"
                            ? "block"
                            : "hidden"
                        }`}
                      >
                        <button
                          ref={(el) => (dropRef.current[w._id] = el)}
                          // disabled={specificIndex === index ? true : false}
                          onClick={() => {
                            setSpecificIndex((prev) =>
                              prev === index ? null : index
                            );
                          }}
                          className="top-1.5 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                        >
                          <BsThreeDotsVertical size={20} />
                          {specificIndex === index && (
                            <>
                              {w.status === "cancelled" ? (
                                <div className="bg-white text-left z-10 px-2.5 py-2 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                                  <span>Appointment has been Cancelled</span>
                                </div>
                              ) : (
                                <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                                  <p
                                    onClick={() => {
                                      handleCancel(w._id);
                                    }}
                                    className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Cancel
                                  </p>
                                  <p
                                    onClick={() => {
                                      appointmentForm.time = w.time;
                                      setDisplayMoulder(true);
                                      setMoulderContent("addAppointment");
                                      setEditingId(w._id);
                                    }}
                                    className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Reschedule
                                  </p>
                                  {userRole === "doctor" && (
                                    <>
                                      {w.diagnostic ? (
                                        <p
                                          onClick={() => {
                                            startEdit(w);
                                          }}
                                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                        >
                                          Update Diagnostic
                                        </p>
                                      ) : (
                                        <p
                                          onClick={() => {
                                            setDisplayMoulder(true);
                                            setMoulderContent("addDiagnostic");
                                            setAppId(w._id);
                                          }}
                                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                        >
                                          Add Diagnostic
                                        </p>
                                      )}
                                    </>
                                  )}
                                  {w.diagnostic && (
                                    <p
                                      onClick={() => {
                                        getDiagnosticById(w.diagnostic._id);
                                      }}
                                      className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                    >
                                      View Diagnostic
                                    </p>
                                  )}
                                </div>
                              )}
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="lg:flex hidden absolute bottom-3 right-130 items-center justify-center">
            <div className="flex space-x-2 items-center">
              <div className="flex space-x-1 items-center">
                <TfiAngleDoubleRight
                  onClick={() => {
                    changePage(1);
                  }}
                  className="rotate-180 cursor-pointer"
                  size={12}
                />
                <TfiAngleRight
                  onClick={() => {
                    changePage(currentPage - 1);
                  }}
                  className="rotate-180 cursor-pointer"
                  size={12}
                />
              </div>
              <div className="px-3 py-1.5 text-white rounded font-semibold bg-[#156dbd]">
                {currentPage}
              </div>
              <div className="flex space-x-1  items-center">
                <TfiAngleRight
                  onClick={() => {
                    changePage(currentPage + 1);
                  }}
                  className="cursor-pointer"
                  size={12}
                />
                <TfiAngleDoubleRight
                  onClick={() => {
                    changePage(totalPages);
                  }}
                  className="cursor-pointer"
                  size={12}
                />
              </div>
            </div>
          </div>
          <div className="grid md:hidden gap-4 grid-cols-1 lg:hidden">
            {displayedApp.map((w, index) => (
              <div
                key={w._id}
                className="relative rounded-t-lg bg-white transition-all shadow-lg "
              >
                <div className="mt-7 grid capitalize gap-y-2 grid-cols-2 px-3 py-2">
                  <div>
                    <span className="font-semibold">Patient Name:</span>{" "}
                    <span>{w.patient.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Doctor Name:</span>{" "}
                    <span className="">{w.doctor.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Patient Age:</span>{" "}
                    <span>{w.patient.age}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span>{w.status}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span>{" "}
                    <span>{w.time.slice(0, 10)}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Time:</span>{" "}
                    <span>
                      {w.time.slice(11, 16)} {"  "}
                      {parseInt(w.time.slice(11, 16)) >= 12 ? "PM" : "AM"}
                    </span>
                  </div>
                </div>
                <div className="absolute top-10 right-10">
                  <button
                    ref={(el) => (otherRef.current[w._id] = el)}
                    onClick={() => {
                      setNewIndex((prev) => (prev === index ? null : index));
                    }}
                    className="-top-8 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                  >
                    <BsThreeDotsVertical size={20} />

                    {newIndex === index && (
                      <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                        <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                          Delete
                        </p>
                        <p
                          onClick={() => {
                            handleCancel(w._id);
                          }}
                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          Cancel
                        </p>
                        <p
                          onClick={() => {
                            appointmentForm.time = w.time;
                            setDisplayMoulder(true);
                            setMoulderContent("addAppointment");
                            setEditingId(w._id);
                          }}
                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          Reschedule
                        </p>
                        {userRole === "doctor" && (
                          <>
                            {w.diagnostic ? (
                              <p
                                onClick={() => {
                                  startEdit(w);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Update Diagnostic
                              </p>
                            ) : (
                              <p
                                onClick={() => {
                                  setDisplayMoulder(true);
                                  setMoulderContent("addDiagnostic");
                                  setAppId(w._id);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Add Diagnostic
                              </p>
                            )}
                          </>
                        )}
                        {w.diagnostic && (
                          <p
                            onClick={() => {
                              getDiagnosticById(w.diagnostic._id);
                            }}
                            className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                          >
                            View Diagnostic
                          </p>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

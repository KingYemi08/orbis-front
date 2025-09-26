import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import img from "../assets/empty.jpg";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/loader";
import { TfiAngleDoubleRight, TfiAngleRight } from "react-icons/tfi";
import { Link } from "react-router-dom";

export default function Patients() {
  const {
    setMoulderContent,
    setDisplayMoulder,
    getPatients,
    dischargePatient,
    setEditingId,
    patients,
    setPatients,
    loading,
    setIsPatient,
    setPrevWardId,
    currentUser,
    appointments,
    setPatientForm,
    getAppointmentForDoctor,
    deletePatient,
    getPatientForWard,
    userRole,
    error,
    userId,
  } = useGlobal();
  const [specificIndex, setSpecificIndex] = useState(null);
  const [appPatients, setAppPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newIndex, setNewIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const dropRef = useRef({});
  const otherRef = useRef({});

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (filter === "all" && userRole === "admin") {
      getPatients();
    } else if (filter === "all" && currentUser && userRole === "nurse") {
      getPatientForWard(currentUser.ward._id);
    }
  }, [filter]);

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
    if (filter === "gender") {
      const sortedData = [...patients];
      sortedData.sort((a, b) => {
        return a.gender.localeCompare(b.gender);
      });
      setPatients(sortedData);
      return;
    }
    if (filter === "genotype") {
      const sortedData = [...patients];
      sortedData.sort((a, b) => {
        return a.genotype.localeCompare(b.genotype);
      });
      setPatients(sortedData);
      return;
    }
    if (filter === "bloodGroup") {
      const sortedData = [...patients];
      sortedData.sort((a, b) => {
        return a.bloodGroup.localeCompare(b.bloodGroup);
      });
      setPatients(sortedData);
      return;
    }
  }, [filter]);

  useEffect(() => {
    if (
      userRole === "admin" ||
      userRole === "doctor" ||
      userRole === "receptionist" ||
      userRole === "pharmacist"
    ) {
      getPatients();
      getAppointmentForDoctor(userId);
    } else if (currentUser && userRole === "nurse") {
      getPatientForWard(currentUser.ward._id);
    }
  }, []);

  const displayedPatient = patients.filter((p) => {
    const name = p.name.toLowerCase();
    if (search !== "") return name.includes(search.toLowerCase());
    return patients;
  });

  const totalPages = Math.ceil(patients.length / itemsPerPage);
  const startSlice = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const patientIds = [...new Set(appointments.map((a) => a.patient._id))];

    const patient = patients.filter((patient) =>
      patientIds.includes(patient._id)
    );

    setAppPatients(patient);
  }, [appointments]);

  const startEdit = (patient) => {
    setPatientForm({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      age: patient.age,
      image: null,
      bloodGroup: patient.bloodGroup,
      genotype: patient.genotype,
      weight: patient.weight,
    });
    setDisplayMoulder(true);
    setMoulderContent("addPatient");
    setEditingId(patient._id);
  };

  const startDelete = (id) => {
    if (confirm("Are you sure")) {
      deletePatient(id);
    }
  };

  if (loading) return <Loader />;

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

  return (
    <div className="lg:ml-[20%] pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="flex items-center justify-between">
        <div className="border lg:w-105 md:w-95 w-full border-gray-400 ps-2.5 flex items-center rounded-lg text-gray-400">
          <BsSearch />
          <input
            type="text"
            className=" w-full outline-0 py-1.5 text-black placeholder:text-gray-400 ps-2"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center space-x-1">
          <span>Filter: </span>{" "}
          <select
            name=""
            className="w-30 border lg:block hidden outline-0 ps-0.5 border-gray-400 py-1.5 rounded-lg"
            id=""
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          >
            <option value="all">Latest</option>
            <option value="gender">Gender</option>
            <option value="genotype">Genotype</option>
            <option value="bloodGroup">Blood Group</option>
          </select>
        </div>{" "}
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addPatient");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd] lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" || userRole === "receptionist"
              ? "md:block"
              : "hidden"
          }`}
        >
          Add New Patient
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addPatient");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd] md:hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" || userRole === "receptionist"
              ? "lg:block"
              : "hidden"
          }`}
        >
          Add New Patient
        </motion.button>
      </div>
      {displayedPatient.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[72vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-70 h-70" alt="" />
            <p className="text-gray-600">
              {userRole === "nurse"
                ? "No Patients in your ward..."
                : "No Patients Found...."}
            </p>
          </div>
        </div>
      ) : (
        <>
          {userRole === "doctor" ? (
            <>
              <div className="rounded-t-lg hidden lg:block border border-b-0 border-gray-200">
                <table className="w-full ">
                  <thead className="">
                    <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                      <th className="text-center">S/N</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Gender</th>
                      <th className="text-center">Weight</th>
                      <th className="text-center">Genotype</th>
                      <th className="text-center">Blood Group</th>
                      <th className="text-center">Ward</th>
                      <th
                        className={`${
                          userRole === "receptionist" ? "hidden" : "block"
                        } text-center mt-2`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full capitalize test">
                    {appPatients
                      .slice(startSlice, startSlice + itemsPerPage)
                      .map((p, index) => (
                        <tr
                          key={index}
                          className="h-11 z-1 border-b border-gray-300"
                        >
                          <td className="text-center">
                            {startSlice + index + 1}
                          </td>
                          <td className="flex items-center justify-center">
                            {" "}
                            <img
                              src={p.image}
                              className="h-9 w-9  mt-1 rounded-full"
                              alt=""
                            />
                          </td>
                          <td className="text-center">{p.name}</td>
                          <td className="text-center lowercase">{p.email}</td>
                          <td className="text-center">{p.age}</td>
                          <td className="text-center">{p.gender}</td>
                          <td className="text-center lowercase">
                            {p.weight} kg
                          </td>
                          <td className="text-center">{p.genotype}</td>
                          <td className="text-center">{p.bloodGroup}</td>
                          <td className="text-center">
                            {p.ward ? p.ward.name : "Out Patient"}
                          </td>
                          <td
                            className={`flex relative justify-center ${
                              userRole === "receptionist" ? "hidden" : "block"
                            }`}
                          >
                            <button
                              ref={(el) => (dropRef.current[p._id] = el)}
                              onClick={() => {
                                setSpecificIndex((prev) =>
                                  prev === index ? null : index
                                );
                              }}
                              className="-top-8 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                            >
                              <BsThreeDotsVertical size={20} />
                              {specificIndex === index && (
                                <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                                  {userRole === "admin" && (
                                    <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                      Delete
                                    </p>
                                  )}
                                  <p className="px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer">
                                    <Link
                                      to={`/dashboard/diagnostic/${p._id}`}
                                      className="w-full"
                                    >
                                      View Diagnostics
                                    </Link>
                                  </p>
                                </div>
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
                        console.log("cl");
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
            </>
          ) : (
            <>
              <div className="rounded-t-lg hidden lg:block border border-b-0 border-gray-200">
                <table className="w-full ">
                  <thead className="">
                    <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                      <th className="text-center">File Number</th>
                      <th className="text-center">Image</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Phone</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Gender</th>
                      <th className="text-center">Weight</th>
                      <th className="text-center">Genotype</th>
                      <th className="text-center">Blood Group</th>
                      {userRole === "nurse" ? null : (
                        <th className="text-center">Ward</th>
                      )}
                      <th
                        className={`${
                          userRole === "receptionist" ? "hidden" : "block"
                        } text-center mt-2`}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full capitalize test">
                    {displayedPatient
                      .slice(startSlice, startSlice + itemsPerPage)
                      .map((p, index) => (
                        <tr
                          key={index}
                          className="h-11 z-1 border-b border-gray-300"
                        >
                          <td className="text-center">
                            {p.fileNumber
                              ? p.fileNumber
                              : startSlice + index + 1}
                          </td>
                          <td className="flex items-center justify-center">
                            {" "}
                            <img
                              src={p.image}
                              className="h-9 w-9  mt-1 rounded-full"
                              alt=""
                            />
                          </td>
                          <td className="text-center">{p.name}</td>
                          <td className="text-center lowercase">{p.email}</td>
                          <td className="text-center lowercase">
                            {p.phone[0]}
                          </td>
                          <td className="text-center">{p.age}</td>
                          <td className="text-center">{p.gender}</td>
                          <td className="text-center lowercase">
                            {p.weight} kg
                          </td>
                          <td className="text-center">{p.genotype}</td>
                          <td className="text-center">{p.bloodGroup}</td>
                          {userRole === "nurse" ? null : (
                            <td className="text-center">
                              {p.ward ? p.ward.name : "Out Patient"}
                            </td>
                          )}
                          <td
                            className={`flex relative justify-center ${
                              userRole === "receptionist" ? "hidden" : "block"
                            }`}
                          >
                            <button
                              ref={(el) => (dropRef.current[p._id] = el)}
                              onClick={() => {
                                setSpecificIndex((prev) =>
                                  prev === index ? null : index
                                );
                              }}
                              className="-top-8 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                            >
                              <BsThreeDotsVertical size={20} />
                              {specificIndex === index && (
                                <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                                  {userRole === "admin" && (
                                    <p
                                      onClick={() => {
                                        startDelete(p._id);
                                      }}
                                      className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                    >
                                      Delete
                                    </p>
                                  )}
                                  {userRole === "admin" && (
                                    <p
                                      onClick={() => {
                                        startEdit(p);
                                      }}
                                      className="px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer"
                                    >
                                      Update
                                    </p>
                                  )}
                                  <>
                                    {p.ward ? (
                                      <p
                                        onClick={() => {
                                          setDisplayMoulder(true);
                                          setMoulderContent("assignWard");
                                          setEditingId(p._id);
                                          setPrevWardId(p.ward._id);
                                          setIsPatient(true);
                                        }}
                                        className={`${
                                          userRole === "admin" ||
                                          userRole === "nurse"
                                            ? "block"
                                            : "hidden"
                                        } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                                      >
                                        Transfer Ward
                                      </p>
                                    ) : (
                                      <p
                                        onClick={() => {
                                          setDisplayMoulder(true);
                                          setMoulderContent("assignWard");
                                          setEditingId(p._id);
                                          setIsPatient(true);
                                        }}
                                        className={`${
                                          userRole === "admin" ||
                                          userRole === "nurse"
                                            ? "block"
                                            : "hidden"
                                        } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                                      >
                                        Assign Ward
                                      </p>
                                    )}
                                    {p.ward && (
                                      <p
                                        onClick={() => {
                                          if (confirm("Are you sure")) {
                                            dischargePatient(p.ward._id, p._id);
                                          }
                                        }}
                                        className={`${
                                          userRole === "admin" ||
                                          userRole === "nurse"
                                            ? "block"
                                            : "hidden"
                                        } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                                      >
                                        Discharge
                                      </p>
                                    )}
                                  </>
                                  <p
                                    className={`px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer ${
                                      userRole === "doctor" ||
                                      userRole === "admin"
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <Link
                                      to={`/dashboard/diagnostic/${p._id}`}
                                      className="w-full"
                                    >
                                      View Diagnostics
                                    </Link>
                                  </p>
                                  <p
                                    className={`px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer ${
                                      userRole === "pharmacist"
                                        ? "block"
                                        : "hidden"
                                    }`}
                                  >
                                    <Link
                                      to={`/dashboard/diagnostic/${p._id}`}
                                      className="w-full"
                                    >
                                      View Prescription
                                    </Link>
                                  </p>
                                </div>
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
                        console.log("cl");
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
            </>
          )}
        </>
      )}
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1 lg:hidden">
        {displayedPatient.map((w, index) => (
          <div
            key={index}
            className="relative rounded-t-lg bg-white transition-all hover:shadow-lg overflow-hidden"
          >
            <div className="">
              <img src={w.image} className="w-full h-65" alt="" />
            </div>
            <div className="grid gap-y-1.5 capitalize grid-cols-2 px-3 py-2">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                <span>{w.name}</span>
              </div>
              <div>
                <span className="font-semibold">Age:</span> <span>{w.age}</span>
              </div>
              <div>
                <span className="font-semibold">Gender:</span>{" "}
                <span>{w.gender}</span>
              </div>
              <div>
                <span className="font-semibold">Genotype:</span>{" "}
                <span>{w.genotype}</span>
              </div>
              <div>
                <span className="font-semibold">Blood Group:</span>{" "}
                <span>{w.bloodGroup}</span>
              </div>
              <div>
                <span className="font-semibold">Weight:</span>{" "}
                <span>{w.weight} kg</span>
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                <span>{w.phone[0]}</span>
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                <span className="lowercase">
                  {" "}
                  {w.email.length > 6 ? `${w.email.slice(0, 6)}...` : w.email}
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
                    {userRole === "admin" && (
                      <p
                        onClick={() => {
                          startDelete(w._id);
                        }}
                        className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </p>
                    )}
                    {userRole === "admin" && (
                      <p
                        onClick={() => {
                          startEdit(w);
                        }}
                        className="px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer"
                      >
                        Update
                      </p>
                    )}
                    <>
                      {w.ward ? (
                        <p
                          onClick={() => {
                            setDisplayMoulder(true);
                            setMoulderContent("assignWard");
                            setEditingId(p._id);
                            setPrevWardId(p.ward._id);
                            setIsPatient(true);
                          }}
                          className={`${
                            userRole === "admin" || userRole === "nurse"
                              ? "block"
                              : "hidden"
                          } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                        >
                          Transfer Ward
                        </p>
                      ) : (
                        <p
                          onClick={() => {
                            setDisplayMoulder(true);
                            setMoulderContent("assignWard");
                            setEditingId(w._id);
                            setIsPatient(true);
                          }}
                          className={`${
                            userRole === "admin" || userRole === "nurse"
                              ? "block"
                              : "hidden"
                          } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                        >
                          Assign Ward
                        </p>
                      )}
                      {w.ward && (
                        <p
                          onClick={() => {
                            if (confirm("Are you sure")) {
                              dischargePatient(w.ward._id, w._id);
                            }
                          }}
                          className={`${
                            userRole === "admin" || userRole === "nurse"
                              ? "block"
                              : "hidden"
                          } px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer`}
                        >
                          Discharge
                        </p>
                      )}
                    </>
                    <p className="px-2.5 py-1.5 w-full hover:bg-gray-100 cursor-pointer">
                      <Link
                        to={`/dashboard/diagnostic/${w._id}`}
                        className="w-full"
                      >
                        View Diagnostics
                      </Link>
                    </p>
                  </div>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

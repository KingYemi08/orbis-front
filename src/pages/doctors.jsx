import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";
import img from "../assets/empty.jpg";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { TfiAngleDoubleRight } from "react-icons/tfi";
import { TfiAngleRight } from "react-icons/tfi";

export default function Doctors() {
  const {
    getWorkerByRole,
    setWorkerForm,
    setMoulderContent,
    loading,
    error,
    setDisplayMoulder,
    currentPage,
    itemsPerPage,
    startSlice,
    changePage,
    totalPages,
    filteredWorkers,
    setEditingId,
    deleteWorker,
    getUserById,
    suspendUser,
    setSearch,
  } = useGlobal();
  const [specificIndex, setSpecificIndex] = useState(null);
  const [newIndex, setNewIndex] = useState(null);
  const dropRef = useRef({});
  const otherRef = useRef({});

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
    setSearch("");
    getWorkerByRole("doctor");
  }, []);

  useEffect(() => {
    setWorkerForm({
      name: "",
      email: "",
      password: "1234",
      phone: [],
      gender: "",
      age: "",
      image: null,
      department: "",
      role: "doctor",
    });
  }, []);

  const startEdit = (worker) => {
    setWorkerForm({
      name: worker.name,
      email: worker.email,
      phone: worker.phone,
      gender: worker.gender,
      age: worker.age,
      image: null,
      department: worker.department ? worker.department._id : null,
      role: worker.role,
    });
    setDisplayMoulder(true);
    setMoulderContent("addWorker");
    setEditingId(worker._id);
  };

  const startDelete = (worker) => {
    if (confirm("Are you sure")) {
      deleteWorker(worker.role, worker._id);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="lg:ml-[20%] flex items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <p className="text-red-500 text-2xl font-semibold">{error}</p>
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
        {/* <select
          name=""
          className="w-30 border lg:block hidden outline-0 ps-0.5 border-gray-400 py-1.5 rounded"
          id=""
        >
          <option value="">Filter</option>
        </select>{" "} */}
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addWorker");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] md:block lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Doctor
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addWorker");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] lg:text-md text-sm md:hidden lg:block cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Doctor
        </motion.button>
      </div>
      {filteredWorkers.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-50 h-52" alt="" />
            <p className="text-gray-600">No Doctors Found....</p>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-t-lg hidden lg:block border border-b-0 border-gray-200">
            <table className="w-full ">
              <thead className="">
                <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                  <th className="text-center">S/N</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Age</th>
                  <th className="text-center">Gender</th>
                  <th className="text-center">Department</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="w-full test">
                {filteredWorkers
                  .slice(startSlice, startSlice + itemsPerPage)
                  .map((w, index) => (
                    <tr
                      key={w._id}
                      className="h-11 z-1 border-b capitalize border-gray-300"
                    >
                      <td className="text-center">{index + 1}</td>
                      <td className="flex items-center justify-center">
                        {" "}
                        <img
                          src={w.image}
                          className="h-9 w-9  mt-1 rounded-full"
                          alt=""
                        />
                      </td>
                      <td className="text-center">{w.name}</td>
                      <td className="text-center lowercase">{w.email}</td>
                      <td className="text-center">{w.phone[0]}</td>
                      <td className="text-center">{w.age}</td>
                      <td className="text-center">
                        {w.gender === "female" ? "F " : "M"}
                      </td>
                      <td className="text-center">
                        {w.department ? w.department.name : "No department"}
                      </td>
                      <td
                        className={`text-center ${
                          w.isSuspended ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {w.isSuspended ? "Suspended" : "Active"}
                      </td>
                      <td className="flex relative justify-center">
                        <button
                          ref={(el) => (dropRef.current[w._id] = el)}
                          // disabled={specificIndex === index ? true : false}
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
                              <p
                                onClick={() => {
                                  startDelete(w);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Delete
                              </p>
                              <p
                                onClick={() => {
                                  startEdit(w);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Update
                              </p>
                              <p
                                onClick={() => {
                                  async function suspend() {
                                    if (confirm("Are you sure")) {
                                      await suspendUser(w._id);
                                      await getWorkerByRole("doctor");
                                      toast.success(
                                        `User account ${
                                          w.isSuspended
                                            ? "Reactivated"
                                            : "Suspended"
                                        }`,
                                        { autoClose: 1500 }
                                      );
                                    }
                                  }
                                  suspend();
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                {w.isSuspended ? "Reactivate" : "Suspend"}
                              </p>
                              <p
                                onClick={() => {
                                  getUserById(w.role, w._id);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                View Profile
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
          <div className="grid md:grid-cols-2 gap-4 grid-cols-1 lg:hidden">
            {filteredWorkers.map((w, index) => (
              <div
                key={w._id}
                className="relative rounded-t-lg bg-white transition-all hover:shadow-lg overflow-hidden"
              >
                <div className="">
                  <img src={w.image} className="w-full h-65" alt="" />
                </div>
                <div className=" grid capitalize gap-y-2 grid-cols-2 px-3 py-2">
                  <div>
                    <span className="font-semibold">Name:</span>{" "}
                    <span>{w.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <span className="lowercase">
                      {w.email.length > 6
                        ? `${w.email.slice(0, 6)}...`
                        : w.email}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Age:</span>{" "}
                    <span>{w.age}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Gender:</span>{" "}
                    <span>{w.gender}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Phone:</span>{" "}
                    <span>{w.phone[0]}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Department:</span>{" "}
                    <span className="">
                      {w.department && w.department.name.length > 6
                        ? `${w.department.name.slice(0, 6)}...`
                        : w.department
                        ? w.department.name
                        : "No department"}
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
                        <p
                          onClick={() => {
                            startDelete(w);
                          }}
                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          Delete
                        </p>
                        <p
                          onClick={() => {
                            async function suspend() {
                              if (confirm("Are you sure")) {
                                await suspendUser(w._id);
                                await getWorkerByRole("doctor");
                                toast.success(
                                  `User account ${
                                    w.isSuspended ? "Reactivated" : "Suspended"
                                  }`,
                                  { autoClose: 1500 }
                                );
                              }
                            }
                            suspend();
                          }}
                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          {w.isSuspended ? "Reactivate" : "Suspend"}
                        </p>
                        <p
                          onClick={() => {
                            getUserById(w.role, w._id);
                          }}
                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                        >
                          View Profile
                        </p>
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

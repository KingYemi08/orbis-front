import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { motion, scale } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import img from "../assets/empty.jpg";
import { useGlobal } from "../context/globalContext";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader";

export default function SingleWards() {
  const {
    singleWard,
    getWardById,
    loading,
    setDisplayMoulder,
    setMoulderContent,
    setPrevWardId,
    setEditingId,
    error,
    deleteWard,
    setWardForm,
    prevWardId,
    userRole,
  } = useGlobal();
  const [displayed, setDisplayed] = useState("patients");
  const [specificIndex, setSpecificIndex] = useState(null);
  const [newIndex, setNewIndex] = useState(null);
  const otherRef = useRef({});
  const dropRef = useRef({});

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

  const { id } = useParams();

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
    getWardById(id);
  }, [id]);

  const startEdit = () => {
    setWardForm({
      name: singleWard.name,
      capacity: singleWard.capacity,
    });
    setDisplayMoulder(true);
    setMoulderContent("addWard");
    setEditingId(singleWard._id);
  };

  const startDelete = () => {
    if (confirm("Are you sure")) {
      deleteWard(singleWard._id);
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

  if (!singleWard) return <Loader />;

  return (
    <div className="lg:ml-[20%] pt-17 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="flex justify-between relative">
        <div className="lg:text-[14px] text-[11px] py-1.5">
          <h2 className="text-2xl font-semibold">{singleWard.name}</h2>
          <p className="py-1 text-gray-600">Capacity: {singleWard.capacity}</p>
          <p className="py-1 text-gray-600">
            Number of Nurses: {singleWard.nurses.length}
          </p>
          <p className="py-1 text-gray-600">
            Number of Patients: {singleWard.patients.length}
          </p>
        </div>
        {userRole === "admin" && (
          <div className="flex lg:flex-row space-y-2 lg:space-y-0 flex-col items-center mt-3.5 lg:mt-0 md:mt-0 lg:space-x-2 lg:absolute lg:right-0 lg:bottom-0">
            <button
              onClick={startDelete}
              className="bg-red-500 flex cursor-pointer items-center rounded-lg px-3 py-1.5  hover:bg-red-600 font-semibold text-white"
            >
              <MdDelete className="mr-1.5" size={20} /> Delete
            </button>
            <button
              onClick={startEdit}
              className="bg-blue-500 flex cursor-pointer items-center rounded-lg px-3 py-1.5  hover:bg-blue-600 font-semibold text-white"
            >
              <CiEdit className="mr-1.5" size={20} /> Edit
            </button>
          </div>
        )}
      </div>
      <div className={`${userRole === "nurse" ? "hidden" : "block"} py-7`}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setDisplayed((prev) =>
              prev === "patients" ? "nurses" : "patients"
            );
          }}
          className="bg-[#156dbd] flex items-center rounded-lg px-3 py-1.5 cursor-pointer font-semibold text-white"
        >
          View {displayed === "patients" ? "Nurses" : "Patients"}
        </motion.button>
      </div>
      {userRole === "nurse" ? (
        <>
          <h2 className="pb-3 text-xl font-semibold">
            Nurses Available
          </h2>
          {singleWard.nurses.length === 0 ? (
            <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
              <div className="w-full h-full flex flex-col items-center justify-center">
                <img src={img} className="w-50 h-52" alt="" />
                <p className="text-gray-600">No Nurses Available....</p>
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
                      {userRole === "admin" && (
                        <th className="text-center">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="w-full test">
                    {singleWard.nurses.map((w, index) => (
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
                        {userRole === "admin" && (
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
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    Delete
                                  </p>
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    Suspend
                                  </p>
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    View Profile
                                  </p>
                                  <p
                                    onClick={() => {
                                      setDisplayMoulder(true);
                                      setMoulderContent("assignWard");
                                      setEditingId(w._id);
                                      setPrevWardId(w.ward);
                                    }}
                                    className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Transfer Ward
                                  </p>
                                </div>
                              )}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="grid md:grid-cols-2 gap-4 grid-cols-1 lg:hidden">
                {singleWard.nurses.map((w, index) => (
                  <div
                    key={w._id}
                    className="relative rounded-t-lg bg-white transition-all shadow-lg overflow-hidden"
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
                    </div>
                    <div className="absolute top-10 right-10">
                      <button
                        ref={(el) => (otherRef.current[w._id] = el)}
                        onClick={() => {
                          setNewIndex((prev) =>
                            prev === index ? null : index
                          );
                        }}
                        className="-top-8 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                      >
                        <BsThreeDotsVertical size={20} />

                        {newIndex === index && (
                          <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                            <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                              Delete
                            </p>
                            <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                              Suspend
                            </p>
                            <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                              View Profile
                            </p>
                            <p
                              onClick={() => {
                                setDisplayMoulder(true);
                                setMoulderContent("assignWard");
                                setEditingId(w._id);
                                setPrevWardId(singleWard._id);
                              }}
                              className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                            >
                              Transfer Ward
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
        </>
      ) : (
        <div className="pt-3">
          <h2 className="pb-3 text-xl font-semibold">
            {displayed === "patients" ? "Patients" : "Nurses"} Available
          </h2>
          <div>
            {displayed === "patients" ? (
              <>
                {singleWard.patients.length === 0 ? (
                  <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <img src={img} className="w-50 h-52" alt="" />
                      <p className="text-gray-600">
                        No Patients in this ward....
                      </p>
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
                            <th className="text-center">Age</th>
                            <th className="text-center">Gender</th>
                            <th className="text-center">Genotype</th>
                            <th className="text-center">Blood Group</th>
                            <th className="text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="w-full test">
                          {singleWard.patients.map((p, index) => (
                            <tr
                              key={index}
                              className="h-11 z-1 border-b border-gray-300"
                            >
                              <td className="text-center">1</td>
                              <td className="flex items-center justify-center">
                                {" "}
                                <img
                                  src={p.image}
                                  className="h-9 w-9  mt-1 rounded-full"
                                  alt=""
                                />
                              </td>
                              <td className="text-center">{p.name}</td>
                              <td className="text-center">{p.age}</td>
                              <td className="text-center">{p.gender}</td>
                              <td className="text-center">{p.genotype}</td>
                              <td className="text-center">{p.bloodGroup}</td>
                              <td className="flex relative justify-center">
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
                                    <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-3 top-8  absolute min-w-30">
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
                                                dischargePatient(
                                                  p.ward._id,
                                                  p._id
                                                );
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
                    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 lg:hidden">
                      {singleWard.patients.map((index) => (
                        <div className="rounded-t-lg bg-white transition-all hover:shadow-lg overflow-hidden">
                          <div className="">
                            <img src={img} className="w-full h-65" alt="" />
                          </div>
                          <div className=" grid grid-cols-2 px-3 py-2">
                            <div>
                              <span className="font-semibold">Name:</span>{" "}
                              <span>John Doe</span>
                            </div>
                            <div>
                              <span className="font-semibold">Age:</span>{" "}
                              <span>21</span>
                            </div>
                            <div>
                              <span className="font-semibold">Gender:</span>{" "}
                              <span>Male</span>
                            </div>
                            <div>
                              <span className="font-semibold">Genotype:</span>{" "}
                              <span>AA</span>
                            </div>
                            <div>
                              <span className="font-semibold">
                                Blood Group:
                              </span>{" "}
                              <span>O+</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {singleWard.nurses.length === 0 ? (
                  <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <img src={img} className="w-50 h-52" alt="" />
                      <p className="text-gray-600">No Nurses Available....</p>
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
                            {userRole === "admin" && (
                              <th className="text-center">Actions</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="w-full test">
                          {singleWard.nurses.map((w, index) => (
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
                              <td className="text-center lowercase">
                                {w.email}
                              </td>
                              <td className="text-center">{w.phone[0]}</td>
                              <td className="text-center">{w.age}</td>
                              <td className="text-center">
                                {w.gender === "female" ? "F " : "M"}
                              </td>
                              {userRole === "admin" && (
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
                                        <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                          Delete
                                        </p>
                                        <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                          Suspend
                                        </p>
                                        <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                          View Profile
                                        </p>
                                        <p
                                          onClick={() => {
                                            setDisplayMoulder(true);
                                            setMoulderContent("assignWard");
                                            setEditingId(w._id);
                                            setPrevWardId(w.ward);
                                          }}
                                          className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                        >
                                          Transfer Ward
                                        </p>
                                      </div>
                                    )}
                                  </button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 grid-cols-1 lg:hidden">
                      {singleWard.nurses.map((w, index) => (
                        <div
                          key={w._id}
                          className="relative rounded-t-lg bg-white transition-all shadow-lg overflow-hidden"
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
                          </div>
                          <div className="absolute top-10 right-10">
                            <button
                              ref={(el) => (otherRef.current[w._id] = el)}
                              onClick={() => {
                                setNewIndex((prev) =>
                                  prev === index ? null : index
                                );
                              }}
                              className="-top-8 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                            >
                              <BsThreeDotsVertical size={20} />

                              {newIndex === index && (
                                <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    Delete
                                  </p>
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    Suspend
                                  </p>
                                  <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                                    View Profile
                                  </p>
                                  <p
                                    onClick={() => {
                                      setDisplayMoulder(true);
                                      setMoulderContent("assignWard");
                                      setEditingId(w._id);
                                      setPrevWardId(singleWard._id);
                                    }}
                                    className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                                  >
                                    Transfer Ward
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

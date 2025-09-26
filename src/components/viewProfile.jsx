import { BiUser } from "react-icons/bi";
import { useGlobal } from "../context/globalContext";
import { CgUser } from "react-icons/cg";
import { FaRegCalendar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import img from "../assets/empty.jpg";
import { useScroll } from "framer-motion";

export default function ViewProfile() {
  const { singleUser, getAppointmentForDoctor, appointments } = useGlobal();
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (singleUser.role === "doctor") {
      getAppointmentForDoctor(singleUser._id);
    }
  }, []);
  const displayedApp = appointments.filter((a) => {
    if (filter !== "all") return a.status === filter;
    return appointments;
  });
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white relative rounded-md shadow-lg lg:h-[96vh] h-[90vh] min-w-[80%] side overflow-y-scroll ">
        <div className="border-b border-gray-500 rounded-t-lg  bg-white w-full py-2 px-3">
          <div className="flex  w-full py-3  space-x-2 items-center">
            <BiUser size={22} className="text-[#156dbd]" />
            <h2 className="font-semibold text-xl">Employee Information</h2>
          </div>
        </div>
        <div className="p-5">
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-[#f5f9ff] border rounded border-gray-200 p-3">
              <div className="flex items-center space-x-2.5 pb-3">
                <CgUser size={28} className="text-[#156dbd]" />
                <h2 className="font-semibold text-xl">Basic Information</h2>
              </div>
              <ul className="space-y-1">
                <li>
                  <span className="text-gray-600 text-sm">Full name</span>{" "}
                  <br />
                  <span className="font-semibold">{singleUser.name}</span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Email</span> <br />
                  <span className="font-semibold">{singleUser.email}</span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Phone</span> <br />
                  <span className="font-semibold">{singleUser.phone[0]}</span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Age</span> <br />
                  <span className="font-semibold capitalize">
                    {singleUser.age} years
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Gender</span> <br />
                  <span className="font-semibold capitalize">
                    {singleUser.gender}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#f5f9ff] border rounded border-gray-200 p-3">
              <div className="flex items-center space-x-2.5 pb-3">
                <CgUser size={28} className="text-[#156dbd]" />
                <h2 className="font-semibold text-xl">
                  Department Information
                </h2>
              </div>
              <ul className="space-y-1">
                <li>
                  <span className="text-gray-600 text-sm">Name</span> <br />
                  <span className="font-semibold">
                    {singleUser.department.name}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Description</span>{" "}
                  <br />
                  <span className="font-semibold">
                    {singleUser.department.descp}
                  </span>
                </li>
                <li>
                  <span className="text-gray-600 text-sm">Joined On</span>{" "}
                  <br />
                  <span className="font-semibold">
                    {singleUser.createdAt.slice(0, 10)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-6">
            <div className="flex items-center space-x-2">
              <FaRegCalendar size={22} className="text-[#156dbd]" />
              <h2 className="font-semibold text-xl">Appointments</h2>
            </div>
            <div className="flex space-x-3 py-3 items-center">
              <button
                onClick={() => {
                  setFilter("all");
                }}
                className={` rounded-lg cursor-pointer px-4 py-1.5  ${
                  filter === "all"
                    ? "bg-blue-200 text-blue-500"
                    : "bg-[#f5f9ff]"
                }`}
              >
                All Appointments
              </button>
              <button
                onClick={() => {
                  setFilter("pending");
                }}
                className={`${
                  filter === "pending"
                    ? "bg-blue-200 text-blue-500"
                    : "bg-[#f5f9ff]"
                } rounded-lg px-4 py-1.5 cursor-pointer`}
              >
                Pending
              </button>
              <button
                onClick={() => {
                  setFilter("done");
                }}
                className={`${
                  filter === "done"
                    ? "bg-blue-200 text-blue-500"
                    : "bg-[#f5f9ff]"
                } rounded-lg px-4 py-1.5 cursor-pointer`}
              >
                Done
              </button>
              <button
                onClick={() => {
                  setFilter("overdue");
                }}
                className={`${
                  filter === "overdue"
                    ? "bg-blue-200 text-blue-500"
                    : "bg-[#f5f9ff]"
                } bg-[#f5f9ff] rounded-lg  px-4 py-1.5 cursor-pointer`}
              >
                Overdue
              </button>
              <button
                onClick={() => {
                  setFilter("cancelled");
                }}
                className={`${
                  filter === "cancelled"
                    ? "bg-blue-200 text-blue-500"
                    : "bg-[#f5f9ff]"
                } bg-[#f5f9ff] rounded-lg  px-4 py-1.5 cursor-pointer`}
              >
                Cancelled
              </button>
            </div>
            <div className="py-1">
              {displayedApp.length === 0 ? (
                <div className="bg-white w-full rounded-lg min-h-[25vh] py-2 px-4">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img src={img} className="w-32 h-32" alt="" />
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
                          <th className="text-center">Patient Phone</th>
                          <th className="text-center">Date</th>
                          <th className="text-center">Time</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="w-full test">
                        {displayedApp.map((w, index) => (
                          <tr
                            key={w._id}
                            className="h-11 z-1 border-b capitalize border-gray-300"
                          >
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{w.patient.name}</td>
                            <td className="text-center">{w.patient.age}</td>
                            <td className="text-center">{w.patient.phone}</td>
                            <td className="text-center">
                              {w.time.slice(0, 10)}
                            </td>
                            <td className="text-center">
                              {w.time.slice(11, 16)}
                              {"  "}
                              {parseInt(w.time.slice(11, 16)) >= 12
                                ? "PM"
                                : "AM"}
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                              {parseInt(w.time.slice(11, 16)) >= 12
                                ? "PM"
                                : "AM"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import img from "../assets/empty.jpg";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/loader";
import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function SingleDepartment() {
  const { id } = useParams();
  const {
    singleDepartment,
    getDepartmentById,
    setPreviewImage,
    setDisplayMoulder,
    deleteDepartment,
    setMoulderContent,
    loading,
    userRole,
    setEditingId,
    error,
    setDepartmentForm,
  } = useGlobal();

  const [specificIndex, setSpecificIndex] = useState(null);

  const dropRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setSpecificIndex(null);
      }
    }
    if (specificIndex) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [specificIndex]);

  useEffect(() => {
    getDepartmentById(id);
  }, [id]);

  const startEdit = () => {
    setDepartmentForm({
      name: singleDepartment.name,
      descp: singleDepartment.descp,
      image: null,
    });
    setDisplayMoulder(true);
    setMoulderContent("addDepartment");
    setEditingId(singleDepartment._id);
    setPreviewImage(singleDepartment.image);
  };

  const startDelete = () => {
    if (confirm("Are you sure")) {
      deleteDepartment(singleDepartment._id);
    }
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="lg:ml-[20%] flex items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <p className="text-red-500 text-2xl font-semibold">{error}</p>
      </div>
    );
  if (!singleDepartment) return <Loader />;
  return (
    <div className="lg:ml-[20%] pt-18 pb-5 lg:pt-3 lg:min-h-[89vh] min-h-screen lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="lg:flex md:flex justify-between relative">
        <div className="flex space-x-2">
          <div className="h-32 rounded-md overflow-hidden">
            <img
              src={singleDepartment.image}
              alt={singleDepartment.name}
              className="h-full w-full"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">
              {singleDepartment.name} Department
            </h2>
            <p className="py-1 text-gray-600"> {singleDepartment.descp}</p>
          </div>
        </div>
        {userRole === "admin" && (
          <div className="flex items-center mt-3.5 lg:mt-0 md:mt-0 space-x-2 lg:absolute lg:right-0 lg:bottom-0">
            <button
              onClick={startDelete}
              className="bg-red-500 flex items-center rounded-lg px-3 py-1.5  hover:bg-red-600 font-semibold text-white"
            >
              <MdDelete className="mr-1.5" size={20} /> Delete
            </button>
            <button
              onClick={startEdit}
              className="bg-blue-500 flex items-center rounded-lg px-3 py-1.5  hover:bg-blue-600 font-semibold text-white"
            >
              <CiEdit className="mr-1.5" size={20} /> Edit
            </button>
          </div>
        )}
      </div>
      <div className="py-5">
        <h2 className="pb-2.5 text-xl font-semibold">Doctors Available</h2>
        {singleDepartment.doctors.length === 0 ? (
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
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="w-full test">
                  {singleDepartment.doctors.map((d, index) => (
                    <tr
                      key={d._id}
                      className="h-11 capitalize z-1 border-b border-gray-300"
                    >
                      <td className="text-center">{index + 1}</td>
                      <td className="flex items-center justify-center">
                        {" "}
                        <img
                          src={d.image}
                          className="h-9 w-9  mt-1 rounded-full"
                          alt=""
                        />
                      </td>
                      <td className="text-center">{d.name}</td>
                      <td className="text-center lowercase">{d.email}</td>
                      <td className="text-center">{d.phone[0]}</td>
                      <td className="text-center">{d.age}</td>
                      <td className="text-center">{d.gender}</td>
                      <td className="flex relative justify-center">
                        <button
                          disabled={specificIndex === index ? true : false}
                          onClick={() => {
                            setSpecificIndex(index);
                          }}
                          className="-top-9 mt-0.5 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                        >
                          <BsThreeDotsVertical size={20} />
                        </button>
                        {specificIndex === index && (
                          <div
                            ref={dropRef}
                            className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-17  absolute min-w-30"
                          >
                            {/* <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                            Profile
                          </p> */}
                            <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                              Suspend
                            </p>
                            <p className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer">
                              Delete
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:hidden grid md:grid-cols-2 grid-cols-1 gap-3">
              {singleDepartment.doctors.map((d) => (
                <div key={d._id} className="rounded-t-lg bg-white transition-all shadow-xl overflow-hidden">
                  <div className="">
                    <img src={d.image} className="w-full h-65" alt="" />
                  </div>
                  <div className=" grid gap-y-2 capitalize grid-cols-2 px-3 py-2">
                    <div>
                      <span className="font-semibold">Name:</span>{" "}
                      <span>{d.name}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      <span className="lowercase">
                        {d.email.length > 6
                          ? `${d.email.slice(0, 6)}...`
                          : d.email}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span>{" "}
                      <span>{d.phone[0]}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Age:</span>{" "}
                      <span>{d.age}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Gender:</span>{" "}
                      <span>{d.gender}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

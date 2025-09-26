import { CiEdit } from "react-icons/ci";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/loader";
import { useEffect } from "react";

export default function Profile() {
  const {
    workerForm,
    setWorkerForm,
    currentUser,
    setMoulderContent,
    setDisplayMoulder,
    setIsAdmin,
    userRole,
  } = useGlobal();





  //   console.log(currentUser);
  if (!currentUser) return <Loader />;
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
                    setIsAdmin(true)
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
        </div>
      </div>
    </div>
  );
}

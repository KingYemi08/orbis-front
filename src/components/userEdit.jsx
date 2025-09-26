import { useEffect, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function UserEdit() {
  const {
    currentUser,
    formChange,
    formData,
    setFormData,
    updatePatient,
    updateWorker,
    userId,
    setDisplayMoulder,
    userRole,
  } = useGlobal();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setFormData({
      name: currentUser.name,
      age: currentUser.age,
      gender: currentUser.gender,
      phone: currentUser.phone[0],
    });
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault()
    console.log(formData);
    if (
      !formData.name ||
      !formData.phone ||
      !formData.gender ||
      !formData.age
    )
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);

      if (userRole === "patient") {
        await updatePatient(userId);
      } else {
        await updateWorker(userId);
      }

      setFormData({
        name: "",
        age: "",
        gender: "",
        phone: "",
      });
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("An error occured");
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">Update Profile</h2>
        <form action="" onSubmit={handleEdit} className="space-y-2">
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">full name</span>
            </div>
            <div>
              <input
                type="text"
                name="name"
                onChange={formChange}
                value={formData.name}
                placeholder="Enter Full Name"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">age</span>
            </div>
            <div>
              <input
                type="text"
                name="age"
                onChange={formChange}
                value={formData.age}
                placeholder="Enter age"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Gender</span>
            </div>
            <div>
              <select
                className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                name="gender"
                onChange={formChange}
                value={formData.gender}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">phone</span>
            </div>
            <div>
              <input
                type="text"
                name="phone"
                onChange={formChange}
                value={formData.phone}
                placeholder="Enter Phone number"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="lg:flex md:flex hidden items-end justify-end pt-2 ">
            {loading ? (
              <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                <p className="animate-pulse">
                  {"Updating..."}
                </p>
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 rounded-md py-1 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                Update
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

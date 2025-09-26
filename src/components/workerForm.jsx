import { GoUpload } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { toast } from "react-toastify";

export default function WorkerForm({ setDisplayedInput, displayedInput }) {
  const {
    workerForm,
    setWorkerForm,
    addWorker,
    workerChange,
    getAllDepartments,
    departments,
    previewImage,
    getWorkerByRole,
    previewName,
    setPreviewImage,
    setPreviewName,
    setMoulderContent,
    updateWorker,
    editingId,
    setEditingId,
    setDisplayMoulder,
  } = useGlobal();
  const fileInputRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllDepartments();
  }, []);
  const handlePostWorker = async () => {
    if (phone.length === 11 && !workerForm.phone.includes(phone)) {
      workerForm.phone.push(phone);
    }
    if (workerForm.phone.length === 0 && phone.length !== 11)
      return toast.warning("Invalid phone number", { autoClose: 2000 });
    if (
      !workerForm.name ||
      !workerForm.email ||
      !workerForm.password ||
      workerForm.phone.length === 0 ||
      !workerForm.gender ||
      !workerForm.age
    )
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    if (workerForm.role === "doctor" && !workerForm.department)
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await addWorker();
      getWorkerByRole(workerForm.role);
      setWorkerForm({
        name: "",
        email: "",
        password: "1234",
        phone: [],
        gender: "",
        age: "",
        image: null,
        department: "",
        role: "",
      });
      setPreviewImage();
      setPreviewName("");
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured");
    }
  };
  const handleEdit = async () => {
    if (phone.length === 11 && !workerForm.phone.includes(phone)) {
      workerForm.phone.push(phone);
    }
    if (workerForm.phone.length === 0 && phone.length !== 11)
      return toast.warning("Invalid phone number", { autoClose: 2000 });
    if (
      !workerForm.name ||
      !workerForm.email ||
      workerForm.phone.length === 0 ||
      !workerForm.gender ||
      !workerForm.age
    )
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    if (workerForm.role === "doctor" && !workerForm.department)
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      console.log(workerForm);
      await updateWorker(editingId);
      getWorkerByRole(workerForm.role);
      setWorkerForm({
        name: "",
        email: "",
        password: "1234",
        phone: [],
        gender: "",
        age: "",
        image: null,
        department: "",
        role: "",
      });
      setPreviewImage();
      setPreviewName("");
      setEditingId("");
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured");
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-170 md:min-w-160 min-w-84">
        <h2 className="font-semibold text-xl pb-3">Add Worker</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          action=""
          className="hidden lg:block md:block"
        >
          <div className="py-2 grid-cols-1 lg:grid-cols-2 gap-4 lg:grid md:grid md:grid-cols-2 hidden">
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">full name</span>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  onChange={workerChange}
                  value={workerForm.name}
                  placeholder="Enter Full Name"
                  className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">Email</span>
              </div>
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={workerChange}
                  value={workerForm.email}
                  placeholder="Enter Email"
                  className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
            {!editingId && (
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Password</span>
                </div>
                <div>
                  <input
                    type={workerForm.password === "1234" ? "text" : "password"}
                    name="password"
                    onChange={workerChange}
                    value={workerForm.password}
                    placeholder="Enter Password"
                    className="w-full ps-1.5 py-1.5 border  outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">Phone</span>
              </div>
              <div className="w-full border flex border-gray-200 outline-0 overflow-hidden rounded-lg">
                <input
                  type="text"
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  className="w-full ps-1.5 py-1.5 focus:outline-2 focus:outline-blue-400 rounded-tl-lg rounded-bl-lg"
                />
                <button
                  onClick={() => {
                    if (!workerForm.phone.includes(phone)) {
                      workerForm.phone.push(phone);
                    }
                    setPhone("");
                  }}
                  className="px-3.5 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">Age</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter Age"
                  name="age"
                  onChange={workerChange}
                  value={workerForm.age}
                  className="w-full ps-1.5 py-1.5 border  outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              name="image"
              onChange={workerChange}
              accept="image/*"
              ref={fileInputRef}
            />
            <div>
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">image</span>
              </div>
              <div
                onClick={() => {
                  fileInputRef.current.click();
                }}
                className="border items-center cursor-pointer text-[#7f7f7f] border-gray-200 rounded-lg w-full py-1.5 px-2 flex space-x-2"
              >
                <GoUpload className={`${previewName ? "hidden" : ""}`} />
                <span>{previewName ? previewName : "Click to Upload"}</span>
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
                  onChange={workerChange}
                  value={workerForm.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            {workerForm.role === "doctor" && (
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Department</span>
                </div>
                <div>
                  <select
                    name="department"
                    onChange={workerChange}
                    value={workerForm.department}
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}
          <div className="lg:flex md:flex hidden items-end justify-end pt-2 ">
            {loading ? (
              <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                <p className="animate-pulse">
                  {editingId ? "Updating..." : "Creating..."}
                </p>
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={editingId ? handleEdit : handlePostWorker}
                className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                {editingId ? "Update" : "Create User"}
              </motion.button>
            )}
          </div>
        </form>
        <div className="lg:hidden md:hidden">
          {displayedInput === "name" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">full name</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="name"
                    onChange={workerChange}
                    value={workerForm.name}
                    placeholder="Enter Full Name"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.name)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("email");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "email" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Email</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    onChange={workerChange}
                    value={workerForm.email}
                    placeholder="Enter Email"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.email)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput(editingId ? "phone" : "password");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "password" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Password</span>
                </div>
                <div>
                  <input
                    type={workerForm.password ? "text" : "password"}
                    name="password"
                    onChange={workerChange}
                    value={workerForm.password}
                    placeholder="Enter Password"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.password)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("phone");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "phone" ? (
            <>
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">Phone</span>
              </div>
              <div className="w-full border flex border-gray-200 outline-0 overflow-hidden rounded-lg">
                <input
                  type="text"
                  placeholder="Enter Phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  className="w-full ps-1.5 py-1.5 focus:outline-2 focus:outline-blue-400 rounded-tl-lg rounded-bl-lg"
                />
                <button
                  onClick={() => {
                    workerForm.phone.push(phone);
                    setPhone("");
                  }}
                  className="px-3.5 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all"
                >
                  Add
                </button>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!phone)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("age");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "age" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Age</span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Age"
                    name="age"
                    onChange={workerChange}
                    value={workerForm.age}
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.age)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("gender");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "gender" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Gender</span>
                </div>
                <div>
                  <select
                    name="gender"
                    onChange={workerChange}
                    value={workerForm.gender}
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                    id=""
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.gender)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput(
                      workerForm.role === "doctor" ? "department" : ""
                    );
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : displayedInput === "department" &&
            workerForm.role === "doctor" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Department</span>
                </div>
                <div>
                  <select
                    name="department"
                    onChange={workerChange}
                    value={workerForm.department}
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                    id=""
                  >
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep._id} value={dep._id}>
                        {dep.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!workerForm.department && workerForm.role === "doctor")
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("image");
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                >
                  {" "}
                  Next
                </motion.button>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">image</span>
                </div>
                <div
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className="border items-center cursor-pointer text-[#7f7f7f] border-gray-200 rounded-lg w-full py-1.5 px-2 flex space-x-2"
                >
                  <GoUpload className={`${previewName ? "hidden" : ""}`} />
                  <span>{previewName ? previewName : "Click to Upload"}</span>
                </div>
              </div>
              <div className="flex items-end justify-end pt-2 ">
                {loading ? (
                  <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                    <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                    <p className="animate-pulse">
                      {editingId ? "Updating..." : "Creating..."}
                    </p>
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={editingId ? handleEdit : handlePostWorker}
                    className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                  >
                    {" "}
                    {editingId ? "Update" : "Create User"}
                  </motion.button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { GoUpload } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { toast } from "react-toastify";

export default function PatientForm({ setDisplayedInput, displayedInput }) {
  const {
    patientForm,
    setPatientForm,
    patientChange,
    getAllDepartments,
    previewImage,
    getPatients,
    addPatient,
    previewName,
    setPreviewImage,
    setPreviewName,
    setMoulderContent,
    updatePatient,
    setEditingId,
    updateWorker,
    editingId,
    setDisplayMoulder,
  } = useGlobal();
  const fileInputRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllDepartments();
  }, []);
  const handlePost = async () => {
    if (
      !patientForm.name ||
      !patientForm.email ||
      !patientForm.password ||
      !patientForm.gender ||
      !patientForm.age ||
      !patientForm.bloodGroup ||
      !patientForm.genotype
    )
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    if (phone.length === 11 && !patientForm.phone.includes(phone)) {
      patientForm.phone.push(phone);
    }
    if (patientForm.phone.length === 0 && phone.length !== 11)
      return toast.warning("Invalid phone number", { autoClose: 2000 });
    if (patientForm.phone.length === 0)
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await addPatient();
      setPatientForm({
        name: "",
        email: "",
        password: "1234",
        phone: [],
        gender: "",
        age: "",
        image: null,
        bloodGroup: "",
        genotype: "",
        weight: "",
      });
      setPreviewImage();
      setPreviewName("");
      getPatients();
      setDisplayMoulder(false);
      setDisplayedInput("name");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured");
    }
  };
  const handleEdit = async () => {
    if (phone.length === 11 && !patientForm.phone.includes(phone)) {
      patientForm.phone.unshift(phone);
    }
    if (patientForm.phone.length === 0 && phone.length !== 11)
      return toast.warning("Invalid phone number", { autoClose: 2000 });
    if (
      !patientForm.name ||
      !patientForm.email ||
      patientForm.phone.length === 0 ||
      !patientForm.gender ||
      !patientForm.age
    )
      return toast.warning("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await updatePatient(editingId);
      setPatientForm({
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
      setDisplayedInput("name");
      getPatients()
      setDisplayMoulder(false);
      setEditingId("")
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
                  onChange={patientChange}
                  value={patientForm.name}
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
                  onChange={patientChange}
                  value={patientForm.email}
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
                    type={patientForm.password === "1234" ? "text" : "password"}
                    name="password"
                    onChange={patientChange}
                    value={patientForm.password}
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
                    if (!patientForm.phone.includes(phone)) {
                      patientForm.phone.push(phone);
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
                  onChange={patientChange}
                  value={patientForm.age}
                  className="w-full ps-1.5 py-1.5 border  outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">weight</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter weight in kg"
                  name="weight"
                  onChange={patientChange}
                  value={patientForm.weight}
                  className="w-full ps-1.5 py-1.5 border  outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              name="image"
              onChange={patientChange}
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
                  onChange={patientChange}
                  value={patientForm.gender}
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
                <span className="uppercase">Genotype</span>
              </div>
              <div>
                <select
                  name="genotype"
                  onChange={patientChange}
                  value={patientForm.genotype}
                  className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                >
                  <option value="">Select Genotype</option>
                  <option value="AA">AA</option>
                  <option value="AS">AS</option>
                  <option value="SS">SS</option>
                  <option value="SC">SC</option>
                  <option value="AC">AC</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase">blood group</span>
              </div>
              <div>
                <select
                  name="bloodGroup"
                  onChange={patientChange}
                  value={patientForm.bloodGroup}
                  className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              className="w-25 h-25 object-cover rounded mt-2"
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
                onClick={editingId ? handleEdit : handlePost}
                className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                {editingId ? "Update Patient" : "Create Patient"}
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
                    onChange={patientChange}
                    value={patientForm.name}
                    placeholder="Enter Full Name"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.name)
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
                    onChange={patientChange}
                    value={patientForm.email}
                    placeholder="Enter Email"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.email)
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
                    type={patientForm.password ? "text" : "password"}
                    name="password"
                    onChange={patientChange}
                    value={patientForm.password}
                    placeholder="Enter Password"
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.password)
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
                    patientForm.phone.push(phone);
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
                    if (!phone && patientForm.phone.length === 0)
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
                    onChange={patientChange}
                    value={patientForm.age}
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.age)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("weight");
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
          ) : displayedInput === "weight" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">weight</span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Weight in kg"
                    name="weight"
                    onChange={patientChange}
                    value={patientForm.weight}
                    className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.weight)
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
                    onChange={patientChange}
                    value={patientForm.gender}
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
                    if (!patientForm.gender)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("genotype");
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
          ) : displayedInput === "genotype" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">genotype</span>
                </div>
                <div>
                  <select
                    name="genotype"
                    onChange={patientChange}
                    value={patientForm.genotype}
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                    id=""
                  >
                    <option value="">Select Genotype</option>
                    <option value="AA">AA</option>
                    <option value="AS">AS</option>
                    <option value="SS">SS</option>
                    <option value="SC">SC</option>
                    <option value="AC">AC</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.genotype)
                      return toast.error("Please fill the above field", {
                        autoClose: 2000,
                      });
                    setDisplayedInput("bloodGroup");
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
          ) : displayedInput === "bloodGroup" ? (
            <>
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">Blood Group</span>
                </div>
                <div>
                  <select
                    name="bloodGroup"
                    onChange={patientChange}
                    value={patientForm.bloodGroup}
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                    id=""
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end pt-2.5 justify-end">
                <motion.button
                  onClick={() => {
                    if (!patientForm.bloodGroup)
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
                    onClick={editingId ? handleEdit : handlePost}
                    className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
                  >
                    {" "}
                    {editingId ? "Update Patient" : "Create Patient"}
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
3;

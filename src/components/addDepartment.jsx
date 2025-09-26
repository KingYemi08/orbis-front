import { useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { GoUpload } from "react-icons/go";
import { motion, useScroll } from "framer-motion";
import { toast } from "react-toastify";

export default function AddDepartment() {
  const {
    departmentChange,
    departmentForm,
    setDepartmentForm,
    addDepartment,
    previewImage,
    setPreviewImage,
    previewName,
    editingId,
    updateDepartment,
    getDepartmentById,
    getAllDepartments,
    setPreviewName,
    setEditingId,
    setDisplayMoulder,
  } = useGlobal();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departmentForm.name || !departmentForm.descp)
      return toast.warn("Please fill the required fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await addDepartment();
      setDepartmentForm({
        name: "",
        descp: "",
        image: null,
      });
      setPreviewImage("");
      setPreviewName("");
      setLoading(false);
      setDisplayMoulder(false);
      getAllDepartments();
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 2000 });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!departmentForm.name || !departmentForm.descp)
      return toast.warn("Please fill the required fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await updateDepartment(editingId);
      setDepartmentForm({
        name: "",
        descp: "",
        image: null,
      });
      getDepartmentById(editingId);
      setPreviewImage("");
      setEditingId("");
      setLoading(false);
      setDisplayMoulder(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 2000 });
    }
  };
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">Add Department</h2>
        <form
          action=""
          className="space-y-3"
          onSubmit={editingId ? handleEdit : handleSubmit}
        >
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Department name</span>
            </div>
            <div>
              <input
                type="text"
                name="name"
                onChange={departmentChange}
                value={departmentForm.name}
                placeholder="Enter Department Name"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Description</span>
            </div>
            <div>
              <input
                type="text"
                name="descp"
                onChange={departmentChange}
                value={departmentForm.descp}
                placeholder="Enter Description"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <input
            type="file"
            className="hidden"
            name="image"
            onChange={departmentChange}
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
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              className="w-32 h-32 object-cover rounded mt-2"
            />
          )}
          <div className="flex justify-end items-end">
            {loading ? (
              <button className="flex space-x-2 items-center px-4 rounded-md py-1 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                <p className="animate-pulse">
                  {editingId ? "Editing..." : "Creating..."}
                </p>
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 rounded-md py-1 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                {editingId ? "Edit Department" : "Create Department"}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

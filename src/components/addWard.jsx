import { useState } from "react";
import { useGlobal } from "../context/globalContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AddWards() {
  const {
    wardForm,
    setWardForm,
    setDisplayMoulder,
    getWardById,
    editingId,
    setEditingId,
    getAllWards,
    updateWard,
    wardChange,
    addWard,
  } = useGlobal();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wardForm.name || !wardForm.capacity)
      return toast.warn("Please fill the required fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await addWard();
      setWardForm({
        name: "",
        capacity: "",
      });
      setLoading(false);
      setDisplayMoulder(false);
      getAllWards();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!wardForm.name || !wardForm.capacity)
      return toast.warn("Please fill the required fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await updateWard(editingId);
      setWardForm({
        name: "",
        capacity: "",
      });
      setDisplayMoulder(false);
      getWardById(editingId);
      setEditingId("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 2000 });
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">
          {editingId ? "Update" : "Add"} Ward
        </h2>
        <form
          action=""
          className="space-y-3"
          onSubmit={editingId ? handleEdit : handleSubmit}
        >
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase"> name</span>
            </div>
            <div>
              <input
                type="text"
                name="name"
                onChange={wardChange}
                value={wardForm.name}
                placeholder="Enter Ward Name"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Capacity</span>
            </div>
            <div>
              <input
                type="number"
                name="capacity"
                onChange={wardChange}
                value={wardForm.capacity}
                placeholder="Enter Capacity"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="flex justify-end items-end">
            {loading ? (
              <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                <p className="animate-pulse">
                  {editingId ? "Editing..." : "Creating..."}
                </p>
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                {editingId ? "Edit Ward" : "                Create Ward"}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

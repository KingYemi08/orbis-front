import { useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { motion } from "framer-motion";
import { GoUpload } from "react-icons/go";
import { image } from "framer-motion/client";

export default function AddMedicine() {
  const {
    editingId,
    drugForm,
    setDrugForm,
    setEditingId,
    setDisplayMoulder,
    drugChange,
    addDrug,
    getAllDrugs,
    updateDrug,
    setPreviewImage,
    previewImage,
    setPreviewName,
    previewName,
  } = useGlobal();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!drugForm.name || !drugForm.price || !drugForm.quantity)
      return toast.warn("Please all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await addDrug();
      setDrugForm({
        name: "",
        price: "",
        quantity: "",
        image: null,
      });
      setLoading(false);
      setDisplayMoulder(false);
      setPreviewImage();
      setPreviewName();
      getAllDrugs();
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!drugForm.name || !drugForm.price)
      return toast.warn("Please fill all fields", { autoClose: 2000 });
    try {
      setLoading(true);
      await updateDrug(editingId);
      setDrugForm({
        name: "",
        price: "",
        quantity: "",
        iamge: null,
      });
      setDisplayMoulder(false);
      getAllDrugs();
      setEditingId();
      setLoading(false);
      setPreviewImage();
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 2000 });
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">
          {editingId ? "Update" : "Add"} Drug
        </h2>
        <form
          action=""
          onSubmit={editingId ? handleEdit : handleSubmit}
          className="space-y-2"
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
                onChange={drugChange}
                value={drugForm.name}
                placeholder="Enter Drug Name"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Price</span>
            </div>
            <div>
              <input
                type="text"
                name="price"
                onChange={drugChange}
                value={drugForm.price}
                placeholder="Enter Drug Price"
                className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          {!editingId && (
            <div className="">
              <div className="flex space-x-1 pb-1.5">
                <span className="text-red-500">*</span>
                <span className="uppercase"> Quantity</span>
              </div>
              <div>
                <input
                  type="text"
                  name="quantity"
                  onChange={drugChange}
                  value={drugForm.quantity}
                  placeholder="Enter Drug Quantity"
                  className="w-full ps-1.5 py-1.5 border outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
          )}
          <input
            type="file"
            className="hidden"
            name="image"
            onChange={drugChange}
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
          <div className="flex justify-end mt-3 items-end">
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
                {editingId ? "Edit Drug" : "Create Drug"}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

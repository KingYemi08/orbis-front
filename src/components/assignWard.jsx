import { useEffect, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function AssignWard() {
  const {
    getAllWards,
    wards,
    getWorkerByRole,
    assignWard,
    setDisplayMoulder,
    setEditingId,
    editingId,
    prevWardId,
    transferWard,
    getPatients,
    getWardById,
    setPrevWardId,
  } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [wardId, setWardId] = useState("");
  const handleAssign = async () => {
    try {
      if (!wardId)
        return toast.warning("Please select a ward", { autoClose: 1500 });
      setLoading(true);
      await assignWard(editingId, wardId);
      getPatients();
      setEditingId("");
      getWorkerByRole("nurse");
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleTransfer = async () => {
    try {
      if (!wardId)
        return toast.warning("Please select a ward", { autoClose: 1500 });
      setLoading(true);
      await transferWard(editingId, prevWardId, wardId);
      setEditingId("");
      setPrevWardId("");
      getWorkerByRole("nurse");
      getPatients()
      getWardById(prevWardId)
      getWardById(wardId)
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllWards();
  }, []);
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">Select Ward</h2>
        <div className="">
          <select
            name=""
            className="w-full ps-1 py-1.5 border outline-0 border-gray-200 rounded-lg"
            id=""
            onChange={(e) => {
              setWardId(e.target.value);
            }}
          >
            <option value="">Select ward</option>
            {prevWardId ? (
              <>
                {wards.map((w) => {
                  if (prevWardId !== w._id)
                    return (
                      <option value={w._id} key={w._id}>
                        {w.name}
                      </option>
                    );
                })}
              </>
            ) : (
              <>
                {wards.map((w) => (
                  <option value={w._id} key={w._id}>
                    {w.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className="flex justify-end items-end mt-3">
          {loading ? (
            <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
              <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
              <p className="animate-pulse">{prevWardId ? "Transfering..." : "Assigning..."}</p>
            </button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevWardId ? handleTransfer : handleAssign}
              className="px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#156dbd]"
            >
              {" "}
              {prevWardId ? "Transfer" : "Assign"}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

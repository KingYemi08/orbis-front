import { motion, useScroll } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { useGlobal } from "../context/globalContext";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { Link } from "react-router-dom";

export default function Wards() {
  const {
    setDisplayMoulder,
    setMoulderContent,
    wards,
    getAllWards,
    loading,
    error,
  } = useGlobal();

  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllWards();
  }, []);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="lg:ml-[20%] flex flex-col items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <p className="text-2xl">Something went wrong</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            window.location.reload();
          }}
          className="bg-[#156dbd] py-1.5 px-4 mt-2 rounded-lg cursor-pointer text-white font-semibold"
        >
          Refresh
        </motion.button>
      </div>
    );
  return (
    <div className="lg:ml-[20%] pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <div className="flex items-center justify-between">
        <div className="border lg:w-105 md:w-95 w-full border-gray-400 ps-2.5 flex items-center rounded-lg text-gray-400">
          <BsSearch />
          <input
            type="text"
            className=" w-full outline-0 py-1.5 text-black placeholder:text-gray-400 ps-2"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addWard");
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] md:block lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Ward
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addWard");
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] lg:text-md text-sm md:hidden lg:block cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Ward
        </motion.button>
      </div>
      <div className="grid md:grid-cols-2 py-2 gap-3 grid-cols-1 lg:grid-cols-4">
        {wards.map((w) => (
          <Link key={w._id} to={`/dashboard/wards/${w._id}`}>
            <div className="bg-white rounded shadow-xl py-2 px-3">
              <h2 className="font-bold text-xl pb-1">{w.name}</h2>
              <div className="py-1 text-sm space-y-0.5">
                <p>Capacity: {w.capacity}</p>
                <p>Number of Nurses: {w.nurses.length}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

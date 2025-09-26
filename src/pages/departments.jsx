import { useGlobal } from "../context/globalContext";
import img from "../assets/teeth.jpg";
import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Departments() {
  const {
    loading,
    departments,
    error,
    getAllDepartments,
    setMoulderContent,
    setDisplayMoulder,
  } = useGlobal();

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllDepartments();
  }, []);

  const filteredDepartment = departments.filter((d) => {
    const name = d.name.toLowerCase();
    if (search !== "") return name.includes(search.toLowerCase());
    return departments;
  });
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="lg:ml-[20%] flex items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
        <p className="text-red-500 text-2xl font-semibold">{error}</p>
      </div>
    );
  return (
    <div className="lg:ml-[20%] pt-18 pb-5 lg:pt-3 lg:min-h-[89vh] min-h-screen lg:px-6  px-2 bg-[#f5f9ff]">
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
        <select
          name=""
          className="w-30 border lg:block hidden outline-0 ps-0.5 border-gray-400 py-1.5 rounded-lg"
          id=""
        >
          <option value="">Filter</option>
        </select>{" "}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addDepartment");
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] md:block lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Department
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addDepartment");
          }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#156dbd] lg:text-md text-sm md:hidden lg:block cursor-pointer rounded-lg text-white font-semibold px-4 py-2"
        >
          Add New Department
        </motion.button>
      </div>
      <div className="grid md:grid-cols-2 py-2 gap-3 grid-cols-1 lg:grid-cols-4">
        {filteredDepartment.map((d) => (
          <Link
            key={d._id}
            to={`/dashboard/department/${d._id}`}
            className="bg-white rounded overflow-hidden shadow-2xl"
          >
            <div className="w-full lg:h-42">
              <img src={d.image} alt={d.name} />
            </div>
            <ul className="py-3">
              <li className="font-semibold text-xl text-center">{d.name}</li>
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
}

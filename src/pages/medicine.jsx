import { motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { useGlobal } from "../context/globalContext";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { CgAdd } from "react-icons/cg";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useEffect, useState } from "react";
import img from "../assets/empty.jpg";
import Loader from "../components/loader";
import axios from "axios";
import { toast } from "react-toastify";

export default function Medicine() {
  const {
    setDisplayMoulder,
    setMoulderContent,
    drugs,
    userRole,
    subtractDrugQuantity,
    addDrugQuantity,
    loading,
    error,
    getAllDrugs,
    setEditingId,
    deleteDrug,
    setPreviewImage,
    setDrugForm,
    base_url,
    currentUser,
    userId,
  } = useGlobal();

  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllDrugs();
  }, []);

  const startEdit = (d) => {
    setDrugForm({
      name: d.name,
      price: d.price,
      image: null,
    });
    setEditingId(d._id);
    setPreviewImage(d.image);
    setDisplayMoulder(true);
    setMoulderContent("addDrug");
  };

  const startDelete = (d) => {
    if (confirm("Are you sure")) {
      deleteDrug(d._id);
    }
  };

  const displayedDrugs = drugs.filter((d) => {
    const name = d.name.toLowerCase();
    if (search) return name.includes(search.toLowerCase());
    return drugs;
  });

  async function Verify(response, drug, amount) {
    try {
      const verifyRes = await axios.get(
        `${base_url}/payment/verify/${response.reference}?patient=${userId}&drug=${drug}&amount=${amount}`
      );
      //   console.log("Verification result:", verifyRes.data);
      toast.success("Payment successful!", { autoClose: 1500 });
    } catch (err) {
    //   console.error("Verification failed");
      toast.error("Verification failed", { autoClose: 1500 });
    }
  }

  const payWithPaystack = (amount, drug) => {
    if (!window.PaystackPop) {
      alert("Paystack script not loaded");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_cbd2b70c7f4e84c73c7a069cf0159f5fb615d1ef", // 👉 Your Paystack PUBLIC key
      email: currentUser.email,
      amount: Number(amount) * 100, // amount in Kobo
      currency: "NGN",
      callback: function (response) {
        // ✅ Verify payment on your backend
        Verify(response, drug, amount);
      },
      onClose: function () {
        alert("Payment popup closed");
      },
    });

    handler.openIframe();
  };

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
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addDrug");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd] lg:hidden hidden cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" ||
            userRole === "pharmacist" ||
            userRole === "headPharmacist"
              ? "md:block"
              : "hidden"
          }`}
        >
          Add New Drug
        </motion.button>
      </div>
      <div className="py-4">
        <motion.button
          onClick={() => {
            setDisplayMoulder(true);
            setMoulderContent("addDrug");
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-[#156dbd] lg:text-md text-sm md:hidden  cursor-pointer rounded-lg text-white font-semibold px-4 py-2 ${
            userRole === "admin" ||
            userRole === "pharmacist" ||
            userRole === "headPharmacist"
              ? "lg:block"
              : "hidden"
          }`}
        >
          Add New Drug
        </motion.button>
      </div>
      {displayedDrugs.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[50vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-50 h-52" alt="" />
            <p className="text-gray-600">No Drugs Found....</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 py-2 gap-3 grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
          {displayedDrugs.map((d) => (
            <div
              key={d._id}
              className="bg-white pb-2 rounded overflow-hidden shadow-2xl"
            >
              <div className="">
                <img
                  src={d.image}
                  alt={d.name}
                  className="object-contain w-full h-42"
                />
              </div>
              <ul className="pt-3 px-2 text-[14px] text-gray-600">
                <li className="">Name: {d.name}</li>
                <li>Price: ₦{d.price}</li>
                <li>Quantity Available: {d.quantity}</li>
              </ul>
              <div
                className={`px-2 pt-1.5 ${
                  userRole === "admin" ||
                  userRole === "pharmacist" ||
                  userRole === "headPharmacist"
                    ? "block"
                    : "hidden"
                }`}
              >
                <div className="flex space-x-2 text-white text-sm items-center">
                  <button
                    onClick={() => {
                      startDelete(d);
                    }}
                    className="bg-red-500 px-4 py-1 cursor-pointer hover:bg-red-600 rounded"
                  >
                    <MdDelete />
                  </button>
                  <button
                    onClick={() => {
                      startEdit(d);
                    }}
                    className="bg-blue-500 px-4 py-1 cursor-pointer hover:bg-blue-600 rounded"
                  >
                    <CiEdit />
                  </button>
                </div>
                <div className="flex space-x-2 pt-2 items-center">
                  <div className="flex space-x-0.5 text-white text-sm items-center">
                    <button
                      onClick={() => {
                        subtractDrugQuantity(5, d._id);
                      }}
                      className="bg-green-500 flex px-2 py-1 items-center cursor-pointer hover:bg-green-600 rounded"
                    >
                      <GrSubtract className="mr-1" /> 5
                    </button>
                    <button
                      onClick={() => {
                        subtractDrugQuantity(1, d._id);
                      }}
                      className="bg-green-500 flex px-2 items-center py-1 cursor-pointer hover:bg-green-600 rounded"
                    >
                      <GrSubtract className="mr-1" /> 1
                    </button>
                  </div>
                  <div className="flex space-x-0.5 text-white text-sm items-center">
                    <button
                      onClick={() => {
                        addDrugQuantity(1, d._id);
                      }}
                      className="bg-green-500 flex items-center px-2 py-1 cursor-pointer hover:bg-green-600 rounded"
                    >
                      <GrAdd className="mr-1" /> 1
                    </button>
                    <button
                      onClick={() => {
                        addDrugQuantity(5, d._id);
                      }}
                      className="bg-green-500 flex px-2 items-center py-1 cursor-pointer hover:bg-green-600 rounded"
                    >
                      <GrAdd className="mr-1" /> 5
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`flex items-end mt-1.5 px-2 justify-end ${
                  userRole === "patient" ? "block" : "hidden"
                }`}
              >
                <button
                  onClick={() => {
                    payWithPaystack(d.price, d._id);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-1 cursor-pointer text-sm text-white font-semibold"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

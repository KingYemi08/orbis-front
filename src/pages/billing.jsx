import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { TfiAngleDoubleRight, TfiAngleRight } from "react-icons/tfi";
import img from "../assets/empty.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import Receipt from "../components/receipt";
import Loader from "../components/loader";
import { motion } from "framer-motion";

export default function Billing() {
  const {
    payments,
    getAllPayments,
    userRole,
    getPaymentById,
    loading,
    error,
    getPatientPayment,
  } = useGlobal();

  const [specificIndex, setSpecificIndex] = useState(null);
  const [newIndex, setNewIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(payments.length / itemsPerPage);
  const startSlice = (currentPage - 1) * itemsPerPage;

  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Receipt",
  });

  const dropRef = useRef({});
  const otherRef = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideAny = Object.entries(dropRef.current).some(
        ([id, ref]) => ref && ref.contains(event.target)
      );

      if (!clickedInsideAny) {
        setSpecificIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideAny = Object.entries(otherRef.current).some(
        ([id, ref]) => ref && ref.contains(event.target)
      );

      if (!clickedInsideAny) {
        setNewIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [otherRef]);

  useEffect(() => {
    if (userRole === "patient") {
      getPatientPayment();
    } else {
      getAllPayments();
    }
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
    <div className="lg:ml-[20%] pt-18 pb-5 lg:pt-3 lg:min-h-[89vh] min-h-screen lg:px-6  px-2 bg-[#f5f9ff]">
      {payments.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[72vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-70 h-70" alt="" />
            <p className="text-gray-600">{"No payments have been made"}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="rounded-t-lg border lg:block md:block hidden border-b-0 border-gray-200">
            <table className="w-full ">
              <thead className="">
                <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                  <th className="text-center">S/N</th>
                  <th className="text-center">Patient Name</th>
                  <th className="text-center h ">Patient Email</th>
                  <th className="text-center h block">Patient Phone</th>
                  <th className="text-center">Drug Bought</th>
                  <th className="text-center">Price Paid</th>
                  <th
                    className={`${
                      userRole === "accountant" || userRole === "admin"
                        ? "block"
                        : "hidden"
                    } text-center mt-2`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="w-full capitalize test">
                {payments
                  .slice(startSlice, startSlice + itemsPerPage)
                  .map((p, index) => (
                    <tr
                      key={index}
                      className="h-11 z-1 border-b border-gray-300"
                    >
                      <td className="text-center">{startSlice + index + 1}</td>
                      <td className="text-center">{p.patient.name}</td>
                      <td className="text-center lowercase ">
                        {p.patient.email}
                      </td>
                      <td className="text-center lowercase">
                        {p.patient.phone[0]}
                      </td>
                      <td className="text-center">{p.drug.name}</td>
                      <td className="text-center lowercase">₦{p.drug.price}</td>
                      <td className="hidden">
                        <Receipt ref={contentRef} transaction={p} />
                      </td>
                      <td
                        className={`flex relative justify-center ${
                          userRole === "patient" ? "hidden" : "block"
                        }`}
                      >
                        <button
                          ref={(el) => (dropRef.current[p._id] = el)}
                          onClick={() => {
                            setSpecificIndex((prev) =>
                              prev === index ? null : index
                            );
                          }}
                          className="top-1.5 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                        >
                          <BsThreeDotsVertical size={20} />
                          {specificIndex === index && (
                            <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                              <p
                                onClick={() => {
                                  getPaymentById(p._id);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                View Invoice
                              </p>
                              <p
                                onClick={handlePrint}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Print Receipt
                              </p>
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="lg:flex hidden absolute bottom-3 right-130 items-center justify-center">
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-1 items-center">
                  <TfiAngleDoubleRight
                    onClick={() => {
                      changePage(1);
                    }}
                    className="rotate-180 cursor-pointer"
                    size={12}
                  />
                  <TfiAngleRight
                    onClick={() => {
                      changePage(currentPage - 1);
                    }}
                    className="rotate-180 cursor-pointer"
                    size={12}
                  />
                </div>
                <div className="px-3 py-1.5 text-white rounded font-semibold bg-[#156dbd]">
                  {currentPage}
                </div>
                <div className="flex space-x-1  items-center">
                  <TfiAngleRight
                    onClick={() => {
                      console.log("cl");
                      changePage(currentPage + 1);
                    }}
                    className="cursor-pointer"
                    size={12}
                  />
                  <TfiAngleDoubleRight
                    onClick={() => {
                      changePage(totalPages);
                    }}
                    className="cursor-pointer"
                    size={12}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-t-lg border lg:hidden md:hidden  border-b-0 border-gray-200">
            <table className="w-full ">
              <thead className="">
                <tr className="w-full h-10 border-b border-gray-200 rounded-t-lg">
                  <th className="text-center">S/N</th>
                  <th className="text-center">Patient Name</th>
                  <th className="text-center">Drug Bought</th>
                  <th className="text-center">Price Paid</th>
                  <th
                    className={`${
                      userRole === "accountant" || userRole === "admin"
                        ? "block"
                        : "hidden"
                    } text-center mt-2`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="w-full capitalize test">
                {payments
                  .slice(startSlice, startSlice + itemsPerPage)
                  .map((p, index) => (
                    <tr
                      key={index}
                      className="h-11 z-1 border-b border-gray-300"
                    >
                      <td className="text-center">{startSlice + index + 1}</td>
                      <td className="text-center">{p.patient.name}</td>
                      <td className="text-center">{p.drug.name}</td>
                      <td className="text-center lowercase">₦{p.drug.price}</td>
                      <td className="hidden">
                        <Receipt ref={contentRef} transaction={p} />
                      </td>
                      <td
                        className={`flex relative justify-center ${
                          userRole === "receptionist" ? "hidden" : "block"
                        }`}
                      >
                        <button
                          ref={(el) => (otherRef.current[p._id] = el)}
                          onClick={() => {
                            setNewIndex((prev) =>
                              prev === index ? null : index
                            );
                          }}
                          className="top-1.5 cursor-pointer  rounded-md p-1 border border-gray-200 absolute"
                        >
                          <BsThreeDotsVertical size={20} />
                          {newIndex === index && (
                            <div className="bg-white text-left z-10 rounded-md overflow-hidden text-[12px]  shadow-xl  right-1 top-8  absolute min-w-30">
                              <p
                                onClick={() => {
                                  getPaymentById(p._id);
                                }}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                View Invoice
                              </p>
                              <p
                                onClick={handlePrint}
                                className="px-2.5 py-1.5 hover:bg-gray-100 cursor-pointer"
                              >
                                Print Receipt
                              </p>
                            </div>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="lg:flex hidden absolute bottom-3 right-130 items-center justify-center">
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-1 items-center">
                  <TfiAngleDoubleRight
                    onClick={() => {
                      changePage(1);
                    }}
                    className="rotate-180 cursor-pointer"
                    size={12}
                  />
                  <TfiAngleRight
                    onClick={() => {
                      changePage(currentPage - 1);
                    }}
                    className="rotate-180 cursor-pointer"
                    size={12}
                  />
                </div>
                <div className="px-3 py-1.5 text-white rounded font-semibold bg-[#156dbd]">
                  {currentPage}
                </div>
                <div className="flex space-x-1  items-center">
                  <TfiAngleRight
                    onClick={() => {
                      console.log("cl");
                      changePage(currentPage + 1);
                    }}
                    className="cursor-pointer"
                    size={12}
                  />
                  <TfiAngleDoubleRight
                    onClick={() => {
                      changePage(totalPages);
                    }}
                    className="cursor-pointer"
                    size={12}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

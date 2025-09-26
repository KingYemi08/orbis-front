import { BiUser } from "react-icons/bi";
import { CgCalendarDates } from "react-icons/cg";
import { PiInvoice } from "react-icons/pi";
import { RiMedicineBottleLine } from "react-icons/ri";
import { SiDatev } from "react-icons/si";
import { useGlobal } from "../context/globalContext";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { motion } from "framer-motion";
import Receipt from "./receipt";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function Invoice() {
  const { singlePayment } = useGlobal();
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Receipt",
  });
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white relative rounded-md shadow-lg lg:h-[96vh] h-[90vh] lg:min-w-[65%] min-w-[83%] side overflow-y-scroll ">
        <div className="border-b border-gray-500 rounded-t-lg  bg-white w-full py-2 px-3">
          <div className="flex  w-full py-3  space-x-2 items-center">
            <PiInvoice size={22} className="text-[#156dbd]" />
            <h2 className="font-semibold text-xl">Payment Invoice</h2>
          </div>
        </div>
        <div className="py-2.5 px-4">
          <div className="border border-gray-300 rounded-lg py-4 px-3.5">
            <div className="bg-[#156dbd] w-full py-2.5 rounded-lg text-center text-white">
              <h2 className="font-semibold uppercase text-3xl px-3 pb-3">
                Orbis
              </h2>
              <p className="text-sm mt-1">
                Dondada plaza plot 234 nowhere avenue everywhere
              </p>
              <span className="text-sm mt-3">+23491929957, +2348068932068</span>
            </div>
            <div className="py-2 text-center">
              <span className="font-semibold text-gray-600">
                Payment for {singlePayment.drug.name}
              </span>
              <div className="mt-2 flex items-center justify-center space-x-2">
                <CgCalendarDates />
                <span>
                  {singlePayment.createdAt.slice(0, 10)},{" "}
                  {singlePayment.createdAt.slice(11, 16)}{" "}
                  {parseInt(singlePayment.createdAt.slice(11, 13)) >= 12
                    ? "PM"
                    : "AM"}
                </span>
              </div>
            </div>
            <div className="pt-1.5 pb-3 gap-3 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-2">
              <div className="rounded-lg bg-[#f5f9ff] border border-gray-200 p-2.5">
                <div className="flex uppercase space-x-2 items-center">
                  <BiUser size={22} className="text-[#156dbd]" />
                  <span>Customer</span>
                </div>
                <div className="py-2.5">
                  <span className="font-semibold">
                    {singlePayment.patient.name}
                  </span>
                  <ul className="py-2 space-y-1.5">
                    <li className="flex items-center space-x-2">
                      <IoIosCall size={20} />
                      <span className="text-gray-600">
                        {singlePayment.patient.phone[0]}
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MdEmail size={20} />
                      <span className="text-gray-600">
                        {singlePayment.patient.email}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg bg-[#f5f9ff] border border-gray-200 p-2.5">
                <div className="flex uppercase space-x-2 items-center">
                  <RiMedicineBottleLine size={22} className="text-[#156dbd]" />
                  <span>Drugs Bought</span>
                </div>
                <ul className="py-2 space-y-1">
                  <li>
                    <span className="text-gray-600 text-sm">Name</span> <br />
                    <span className="font-semibold">
                      {singlePayment.drug.name}
                    </span>
                  </li>
                  <li>
                    <span className="text-gray-600 text-sm">Price</span> <br />
                    <span className="font-semibold">
                      ₦{singlePayment.drug.price}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="py-2 w-full  text-end">
              <div className="w-full justify-between text-[#156dbd]">
                <span className="">Total:</span>
                <span className="font-semibold ml-2">
                  ₦{singlePayment.amount}
                </span>
              </div>
            </div>
            <div className="w-full border-t py-3 text-center text-gray-600 border-gray-300">
              <span>Thank you for your business</span>
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:bottom-0 md:bottom-0 absolute p-3 border-t border-gray-200 bg-white">
          <div className="w-full flex items-end justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePrint}
              className="bg-[#156dbd] py-1.5 rounded cursor-pointer px-3.5 font-semibold text-sm text-white"
            >
              Print Receipt
            </motion.button>
          </div>
        </div>
      </div>
      <div className="hidden">
        <Receipt ref={contentRef} transaction={singlePayment} />
      </div>
    </div>
  );
}

import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import Loader from "../components/loader";
import img from "../assets/empty.jpg";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";

export default function Diagnostic() {
  const {
    getPatientDiagnostic,
    loading,
    downloadDiagnostic,
    error,
    userRole,
    diagnostic,
  } = useGlobal();
  const { id } = useParams();
  useEffect(() => {
    getPatientDiagnostic(id);
  }, [id]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="lg:ml-[20%] flex flex-col items-center justify-center pt-18 pb-5 lg:pt-3 min-h-[100vh] lg:min-h-[89vh] lg:px-6  px-2 bg-[#f5f9ff]">
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
    <div className="lg:ml-[20%] pt-18 pb-10 lg:pt-3 lg:min-h-[89vh] min-h-[98vh] lg:px-6  px-2 bg-[#f5f9ff]">
      <h2 className="text-2xl pb-4 font-semibold capitalize lg:hidden">
        {diagnostic.length !== 0
          ? `${diagnostic[0].patient.name}'s Diagnostic`
          : ""}{" "}
      </h2>
      {diagnostic.length === 0 ? (
        <div className="bg-white w-full rounded-lg min-h-[80vh] py-2 px-4">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <img src={img} className="w-72 h-72" alt="" />
            <p className="text-gray-600">No Diagnostic Found....</p>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-2 grid-cols-1">
          {diagnostic.map((d) => (
            <div
              key={d._id}
              className="bg-white relative rounded-lg shadow-xl py-4.5 px-4"
            >
              <div className="flex justify-between relative">
                <div className={`${userRole === "pharmacist" ? "hidden" : "block"}`}>
                  <h2 className="pb-1 font-semibold">Patient's Symptoms</h2>
                  <ul className="text-gray-600 text-sm">
                    {d.symptoms.map((s) => (
                      <li key={s} className="capitalize">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`absolute right-0 `}>
                  <p className="text-[12px] text-gray-600">
                    Created by <br /> Dr. {d.doctor.name} on <br />{" "}
                    {d.createdAt.slice(0, 10)} {d.createdAt.slice(11, 16)}{" "}
                    {parseInt(d.createdAt.slice(11, 13)) >= 12 ? "PM" : "AM"}
                  </p>
                </div>
              </div>
              <div className={`mt-3 ${userRole === "pharmacist" ? "hidden" : "block"}`}>
                <h2 className="pb-1 font-semibold text-left">Diagnosis</h2>
                <p className="text-gray-600">{d.diagnosis}</p>
              </div>
              <div className={`${userRole === "pharmacist" ? "mt-10" : "mt-3"}`}>
                <h2 className="pb-1 font-semibold text-left">Recomendation</h2>
                <p className="text-gray-600">{d.prescription}</p>
              </div>
              <div
                onClick={() => {
                  downloadDiagnostic(d._id);
                }}
                className={`absolute right-3 top-3 cursor-pointer ${userRole === "pharmacist" ? "hidden" : "block"}`}
              >
                <FaDownload />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { toast } from "react-toastify";

export default function AddDiagnostic() {
  const [loading, setLoading] = useState(false);
  const {
    setDiagnosticForm,
    editingId,
    userId,
    getAppointmentForDoctor,
    appId,
    addDiagnostic,
    setDisplayMoulder,
    diagnosticForm,
    updateDiagnosis,
    diagnosticChange,
  } = useGlobal();
  const [symptoms, setSymptoms] = useState("");
  useEffect(() => {
    if (!editingId) {
      setDiagnosticForm({
        symptoms: [],
        diagnosis: "",
        prescription: "",
        appointment: appId,
        doctor: userId,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    diagnosticForm.symptoms = symptoms.split(",");
    if (
      !diagnosticForm.symptoms ||
      !diagnosticForm.diagnosis ||
      !diagnosticForm.prescription ||
      !diagnosticForm.doctor ||
      !diagnosticForm.appointment
    )
      return toast.warning("Please fill all fileds", { autoClose: 1500 });
    try {
      setLoading(true);
      await addDiagnostic();
      setDiagnosticForm({
        symptoms: "",
        diagnosis: "",
        prescription: "",
        appointment: null,
        doctor: null,
      });
      getAppointmentForDoctor(userId);
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (
      !diagnosticForm.diagnosis ||
      !diagnosticForm.prescription ||
      !diagnosticForm.doctor
    )
      return toast.warning("Please fill all fileds", { autoClose: 1500 });
    try {
      setLoading(true);
      await updateDiagnosis(editingId);
      setDiagnosticForm({
        symptoms: "",
        diagnosis: "",
        prescription: "",
        appointment: null,
        doctor: null,
      });
      getAppointmentForDoctor(userId);
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">Add Diagnostic</h2>
        <form
          action=""
          onSubmit={editingId ? handleEdit : handleSubmit}
          className="space-y-3.5"
        >
          {!editingId && (
            <div className="">
              <div className="flex space-x-1 pb-1">
                <span className="text-red-500">*</span>
                <span className="uppercase">Patient symptoms</span>
              </div>
              <div>
                <textarea
                  type="text"
                  placeholder="Enter Symptoms..."
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                  }}
                  className="w-full ps-1.5 pt-1.5 border pb-3  outline-0 border-gray-200 rounded-lg"
                />
              </div>
            </div>
          )}
          <div className="">
            <div className="flex space-x-1 pb-1">
              <span className="text-red-500">*</span>
              <span className="uppercase">Diagnosis</span>
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Enter Diagnosis..."
                name="diagnosis"
                onChange={diagnosticChange}
                value={diagnosticForm.diagnosis}
                className="w-full ps-1.5 pt-1.5 border pb-7  outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="">
            <div className="flex space-x-1 pb-1">
              <span className="text-red-500">*</span>
              <span className="uppercase">Prescription</span>
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Enter Prescription..."
                name="prescription"
                onChange={diagnosticChange}
                value={diagnosticForm.prescription}
                className="w-full ps-1.5 pt-1.5 border pb-10  outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div className="lg:flex md:flex flex items-end justify-end pt-2 ">
            {loading ? (
              <button className="flex space-x-2 items-center px-4 rounded-md py-1.5 cursor-pointer text-white font-semibold bg-[#6eb2f1]">
                <div className="border-2 h-5 w-5 rounded-full border-white/30 inset-0 animate-spin border-t-transparent"></div>
                <p className="animate-pulse">Loading...</p>
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 rounded-md py-1 cursor-pointer text-white font-semibold bg-[#156dbd]"
              >
                {" "}
                Submit
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

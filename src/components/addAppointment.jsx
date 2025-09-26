import { useEffect, useState } from "react";
import { useGlobal } from "../context/globalContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AddAppointment() {
  const {
    getWorkerByRole,
    getPatients,
    userRole,
    workers,
    patients,
    getAppointments,
    appointmentForm,
    rescheduleAppointment,
    setDisplayMoulder,
    appointmentChange,
    getAppointmentForDoctor,
    setAppointmentForm,
    addAppointment,
    setEditingId,
    editingId,
    userId,
  } = useGlobal();
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWorkerByRole("doctor");
    getPatients();
    if (userRole === "doctor") {
      setAppointmentForm({
        time: "",
        doctor: userId,
        patient: "",
      });
    }
  }, []);


  if (time) {
    console.log(time);
    const parts = time.split(" ");
    const datePart = time.slice(0, 10);
    const timePart = time.slice(11, 16);

    console.log("Date:", datePart);
    console.log("Time:", timePart);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !appointmentForm.time ||
      !appointmentForm.patient ||
      !appointmentForm.doctor
    )
      return toast.warning("Please fill all fileds", { autoClose: 1500 });
    try {
      setLoading(true);
      await addAppointment();
      setAppointmentForm({
        time: "",
        doctor: "",
        patient: "",
      });
      if (userRole === "doctor") {
        getAppointmentForDoctor(userId);
      } else {
        getAppointments();
      }
      setDisplayMoulder(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await rescheduleAppointment(editingId);
      appointmentForm.time = "";
      if (userRole === "doctor") {
        getAppointmentForDoctor(userId);
      } else {
        getAppointments();
      }
      setDisplayMoulder(false);
      setEditingId();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="bg-white rounded-md shadow-lg py-6 lg:px-6 md:px-6 px-3 lg:min-w-120 md:min-w-120 min-w-80">
        <h2 className="font-semibold text-xl pb-3">Add Appointment</h2>
        <form
          onSubmit={editingId ? handleEdit : handleSubmit}
          className="space-y-4 text-gray-600"
        >
          <div className="">
            <div className="flex space-x-1 pb-1.5">
              <span className="text-red-500">*</span>
              <span className="uppercase">Date</span>
            </div>
            <div>
              <input
                type="datetime-local"
                name="time"
                onChange={appointmentChange}
                value={appointmentForm.time}
                className="w-full ps-1.5 py-1.5 border  outline-0 border-gray-200 rounded-lg"
              />
            </div>
          </div>
          {!editingId && (
            <>
              {userRole !== "doctor" && (
                <div className="">
                  <div className="flex space-x-1 pb-1.5">
                    <span className="text-red-500">*</span>
                    <span className="uppercase">Doctor</span>
                  </div>
                  <div>
                    <select
                      className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                      name="doctor"
                      onChange={appointmentChange}
                      value={appointmentForm.doctor}
                    >
                      <option value="">Select a Doctor</option>
                      {workers.map((w, index) => (
                        <option value={w._id} key={index}>
                          {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="">
                <div className="flex space-x-1 pb-1.5">
                  <span className="text-red-500">*</span>
                  <span className="uppercase">patient</span>
                </div>
                <div>
                  <select
                    className="w-full rounded-lg py-1.5 outline-0 border ps-0.5 border-gray-200"
                    name="patient"
                    onChange={appointmentChange}
                    value={appointmentForm.patient}
                  >
                    <option value="">Select a Patient</option>
                    {patients.map((w, index) => (
                      <option value={w._id} key={index}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
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
                {editingId ? "Reschedule" : "Add"}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

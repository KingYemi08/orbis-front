import { AnimatePresence, motion } from "framer-motion";
import { useGlobal } from "../context/globalContext";
import { HiXMark } from "react-icons/hi2";
import { useState } from "react";
import WorkerForm from "./workerForm";
import AddDepartment from "./addDepartment";
import AddWards from "./addWard";
import AssignWard from "./assignWard";
import PatientForm from "./patientForm";
import AddAppointment from "./addAppointment";
import AddDiagnostic from "./addDiagnostic";
import ViewDiagnostic from "./viewDiagnostic";
import ViewProfile from "./viewProfile";
import UserEdit from "./userEdit";
import AddMedicine from "./addMedicine";
import Invoice from "./invoice";

export default function Moulder() {
  const {
    displayMoulder,
    moulderContent,
    setPrevWardId,
    setEditingId,
    setPreviewImage,
    setDisplayMoulder,
    setPatientForm,
    setWorkerForm,
    setFormData,
    setDiagnosticForm,
    setAppointmentForm,
    setDepartmentForm,
    setWardForm,
    setDrugForm,
  } = useGlobal();
  const [displayedInput, setDisplayedInput] = useState("name");

  const closeMoulder = () => {
    setDisplayMoulder(false);
    setPrevWardId("");
    setEditingId("");
    setPreviewImage();
    setDisplayedInput("name");
    setWorkerForm({
      name: "",
      email: "",
      password: "1234",
      phone: [],
      gender: "",
      age: "",
      image: null,
      department: "",
      role: "",
    });
    setPatientForm({
      name: "",
      email: "",
      password: "1234",
      phone: [],
      gender: "",
      age: "",
      image: null,
      bloodGroup: "",
      genotype: "",
      weight: "",
    });
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
    });
    setDiagnosticForm({
      symptoms: [],
      diagnosis: "",
      prescription: "",
      appointment: "",
      doctor: "",
    });
    setAppointmentForm({
      time: "",
      doctor: "",
      patient: "",
    });
    setDepartmentForm({
      name: "",
      descp: "",
      image: null,
    });
    setWardForm({
      name: "",
      capacity: "",
    });
    setDrugForm({
      name: "",
      price: "",
      quantity: "",
      image: "",
    });
  };

  return (
    <AnimatePresence initial={false}>
      {displayMoulder && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={`fixed w-full h-screen bg-[#00000089] top-0 z-50`}
        >
          <div
            onClick={closeMoulder}
            className="absolute top-1 right-1 cursor-pointer hover:bg-red-500 rounded-md p-2 transition-all"
          >
            <HiXMark size={30} className="text-white" />
          </div>
          {moulderContent === "addWorker" ? (
            <WorkerForm
              displayedInput={displayedInput}
              setDisplayedInput={setDisplayedInput}
            />
          ) : moulderContent === "addDepartment" ? (
            <AddDepartment />
          ) : moulderContent === "addWard" ? (
            <AddWards />
          ) : moulderContent === "assignWard" ? (
            <AssignWard />
          ) : moulderContent === "addPatient" ? (
            <PatientForm
              displayedInput={displayedInput}
              setDisplayedInput={setDisplayedInput}
            />
          ) : moulderContent === "addAppointment" ? (
            <AddAppointment />
          ) : moulderContent === "addDiagnostic" ? (
            <AddDiagnostic />
          ) : moulderContent === "viewDiagnostic" ? (
            <ViewDiagnostic />
          ) : moulderContent === "viewProfile" ? (
            <ViewProfile />
          ) : moulderContent === "userEdit" ? (
            <UserEdit />
          ) : moulderContent === "addDrug" ? (
            <AddMedicine />
          ) : moulderContent === "invoice" ? (
            <Invoice />
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

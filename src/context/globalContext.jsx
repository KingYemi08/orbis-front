import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base } from "framer-motion/client";
import { saveAs } from "file-saver";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const base_url = "https://orbis-5m29.onrender.com/api/v1";
  const path = location.pathname;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [previewName, setPreviewName] = useState();
  const [displayMoulder, setDisplayMoulder] = useState(false);
  const [moulderContent, setMoulderContent] = useState("addWorker");
  const [editingId, setEditingId] = useState("");
  const [search, setSearch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [wards, setWards] = useState([]);
  const [patients, setPatients] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [diagnostic, setDiagnostic] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const filteredWorkers = workers.filter((w) => {
    const name = w.name.toLowerCase();
    if (search !== "") return name.includes(search.toLowerCase());
    return workers;
  });
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  const startSlice = (currentPage - 1) * itemsPerPage;
  const [singleDepartment, setSingleDepartment] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [singleUser, setSingleUser] = useState();
  const [singleWard, setSingleWard] = useState();
  const [singlePayment, setSinglePayment] = useState();
  const [singleDiagnostic, setSingleDiagnostic] = useState();
  const [prevWardId, setPrevWardId] = useState("");
  const [appId, setAppId] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const Bearer = `Bearer ${token}`;
  const decoded = token ? jwtDecode(token) : null;
  const userRole = decoded ? decoded.role : null;
  const userId = decoded ? decoded.id : null;
  const [workerForm, setWorkerForm] = useState({
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
  const [patientForm, setPatientForm] = useState({
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
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });
  const [diagnosticForm, setDiagnosticForm] = useState({
    symptoms: [],
    diagnosis: "",
    prescription: "",
    appointment: "",
    doctor: "",
  });
  const [appointmentForm, setAppointmentForm] = useState({
    time: "",
    doctor: "",
    patient: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    descp: "",
    image: null,
  });
  const [wardForm, setWardForm] = useState({
    name: "",
    capacity: "",
  });

  const [drugForm, setDrugForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const drugChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setDrugForm({ ...drugForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setPreviewName(file.name);
      }
    } else {
      setDrugForm({ ...drugForm, [name]: value });
    }
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const diagnosticChange = (e) => {
    const { name, value } = e.target;
    setDiagnosticForm({ ...diagnosticForm, [name]: value });
  };

  const appointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm({ ...appointmentForm, [name]: value });
  };

  const wardChange = (e) => {
    const { name, value } = e.target;
    setWardForm({ ...wardForm, [name]: value });
  };

  const workerChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setWorkerForm({ ...workerForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setPreviewName(file.name);
      }
    } else {
      setWorkerForm({ ...workerForm, [name]: value });
    }
  };

  const patientChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setPatientForm({ ...patientForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setPreviewName(file.name);
      }
    } else {
      setPatientForm({ ...patientForm, [name]: value });
    }
  };

  const departmentChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setDepartmentForm({ ...departmentForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setPreviewName(file.name);
      }
    } else {
      setDepartmentForm({ ...departmentForm, [name]: value });
    }
  };

  useEffect(() => {
    if (!token && path.includes("/dashboard")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoginLoading(true);
      const res = await axios.post(`${base_url}/login`, loginForm);
      const { success, token } = res.data;
      if (success) {
        localStorage.setItem("token", token);
        toast.success("User Logged in Successfully", { autoClose: 1500 });
        setLoginLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoginLoading(false);
        toast.error("Invalid Email or Password", { autoClose: 2000 });
      }
    } catch (error) {
      setLoginLoading(false);
      console.log(error);
      toast.error("Invalid Email or Password", { autoClose: 2000 });
    }
  };
  const sendOtp = async (email) => {
    try {
      const data = {
        email: email,
      };
      await axios.post(`${base_url}/forgetPassword`, data);
    } catch (error) {
      toast.error("An error occured", { autoClose: 2000 });
    }
  };
  const changePassword = async (form) => {
    await axios.post(`${base_url}/resetPassword`, form);
  };

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${base_url}/${
          userRole === "patient" ? "patient" : "worker"
        }/${userId}`,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [login]);

  const getAllWorkers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/worker`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
    }
  };

  const getWorkerByRole = async (role) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/worker/role/${role}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setWorkers(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/patient`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setPatients(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getPatientForWard = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/patient/ward/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setPatients(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getPatientDiagnostic = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/diagnostic/patient/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setDiagnostic(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/appointment`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setAppointments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getAppointmentForDoctor = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/appointment/doctor/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setAppointments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getAppointmentForPatient = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/appointment/patient/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setAppointments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
      console.log(error);
    }
  };

  const getAllDepartments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/department`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setDepartments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
    }
  };

  const getAllWards = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/ward`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setWards(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getAllDrugs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/medicine`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setDrugs(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getAllPayments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/payment`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setPayments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getPatientPayment = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/payment/patient/${userId}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setPayments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getDepartmentById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/department/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setSingleDepartment(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
    }
  };

  const getUserById = async (role, id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url}/${role === "patient" ? "patient" : "worker"}/${id}`,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      setSingleUser(res.data.data);
      setMoulderContent("viewProfile");
      setDisplayMoulder(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
    }
  };

  const getWardById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/ward/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setSingleWard(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getDiagnosticById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/diagnostic/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setSingleDiagnostic(res.data.data);
      setDisplayMoulder(true);
      setMoulderContent("viewDiagnostic");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError("An error occured", error.message);
    }
  };

  const getPaymentById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/payment/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      setSinglePayment(res.data.data);
      setDisplayMoulder(true);
      setMoulderContent("invoice");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured", error.message);
    }
  };

  const addDepartment = async () => {
    try {
      await axios.post(`${base_url}/department`, departmentForm, {
        headers: {
          Authorization: Bearer,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Department added successsfully", { autoClose: 1500 });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const addWard = async () => {
    try {
      await axios.post(`${base_url}/ward`, wardForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success("Ward added successsfully", { autoClose: 1500 });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const addWorker = async () => {
    try {
      await axios.post(`${base_url}/worker`, workerForm, {
        headers: {
          Authorization: Bearer,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`User added successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const addPatient = async () => {
    try {
      await axios.post(`${base_url}/patient`, patientForm, {
        headers: {
          Authorization: Bearer,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Patient added successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const addAppointment = async () => {
    try {
      const res = await axios.post(`${base_url}/appointment`, appointmentForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Appointment Scheduled `, {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const addDrug = async () => {
    try {
      const res = await axios.post(`${base_url}/medicine`, drugForm, {
        headers: {
          Authorization: Bearer,
          "Content-Type": "multipart/form-data",
        },
      });
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Drug added `, {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const addDiagnostic = async () => {
    try {
      await axios.post(`${base_url}/diagnostic`, diagnosticForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success(`Diagnostic added `, {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  };

  const updateWorker = async (id) => {
    try {
      const res = await axios.put(
        `${base_url}/worker/${id}`,
        userRole === "admin" && !isAdmin ? workerForm : formData,
        {
          headers: {
            Authorization: Bearer,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(res.data);
      setIsAdmin(false);
      toast.success(`User updated successfully`, {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("An error occured", {
        autoClose: 1500,
      });
      console.log(error);
    }
  };

  const updatePatient = async (id) => {
    try {
      await axios.put(
        `${base_url}/patient/${id}`,
        userRole === "admin" ? patientForm : formData,
        {
          headers: {
            Authorization: Bearer,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Patient info updated successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  };

  const updateDiagnosis = async (id) => {
    try {
      const res = await axios.put(
        `${base_url}/diagnostic/${id}`,
        diagnosticForm,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Diagnosis updated successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const updateDepartment = async (id) => {
    try {
      const res = await axios.put(
        `${base_url}/department/${id}`,
        departmentForm,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Department updated successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const updateWard = async (id) => {
    try {
      const res = await axios.put(`${base_url}/ward/${id}`, wardForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Ward updated successfully`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const updateDrug = async (id) => {
    try {
      const res = await axios.put(`${base_url}/medicine/${id}`, drugForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      if (!res.data.success) throw new Error(res.data.msg);
      toast.success(`Drug information updated`, {
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      await axios.delete(`${base_url}/patient/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success(`Patient deleted successfully`, {
        autoClose: 2000,
      });
      getPatients();
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const deleteDrug = async (id) => {
    try {
      await axios.delete(`${base_url}/medicine/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success(`Drug deleted successfully`, {
        autoClose: 2000,
      });
      getAllDrugs();
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const deleteWorker = async (role, id) => {
    try {
      await axios.delete(`${base_url}/worker/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success(`User deleted successfully`, {
        autoClose: 2000,
      });
      getWorkerByRole(role);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`${base_url}/department/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success("Department deleted Successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/dashboard/departments");
        getAllDepartments();
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const deleteWard = async (id) => {
    try {
      await axios.delete(`${base_url}/ward/${id}`, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success("Ward deleted Successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate("/dashboard/wards");
        getAllWards();
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const rescheduleAppointment = async (id) => {
    try {
      await axios.put(`${base_url}/appointment/${id}`, appointmentForm, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success(`Appointment Resheduled`, {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("An error occured");
      console.log(error);
    }
  };

  const assignWard = async (id, wardId) => {
    try {
      const data = {
        id: id,
      };
      await axios.post(
        `${base_url}/ward/${isPatient ? "patient" : "nurse"}/${wardId}`,
        data,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      toast.success("Ward assigned successfully", { autoClose: 1500 });
      setIsPatient(false);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const transferWard = async (id, prevWardId, wardId) => {
    try {
      const data = {
        id: id,
        prevWardId: prevWardId,
      };
      await axios.post(
        `${base_url}/ward/${
          isPatient ? "patient" : "nurse"
        }/transfer/${wardId}`,
        data,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      toast.success("Ward tranfered successfully", { autoClose: 1500 });
      setIsPatient(false);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const dischargePatient = async (id, patientId) => {
    const data = { patientId: patientId };
    try {
      await axios.post(`${base_url}/ward/discharge/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
      toast.success("Patient discharged", { autoClose: 1500 });
      getPatients();
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const suspendUser = async (id) => {
    const data = {};
    try {
      setLoading(true);
      await axios.post(`${base_url}/worker/suspend/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const cancelAppointment = async (id) => {
    const data = {};
    try {
      setLoading(true);
      await axios.post(`${base_url}/appointment/cancel/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
      setLoading(false);
      toast.success("Appointment Cancelled", { autoClose: 1500 });
    } catch (error) {
      setLoading(false);
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const downloadDiagnostic = async (id) => {
    try {
      const res = await axios.get(`${base_url}/diagnostic/download/${id}`, {
        responseType: "blob",
      });
      const blob = new Blob([res.data], { type: "text/csv" });
      saveAs(blob, `diagnostic_${id}.csv`);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const addDrugQuantity = async (quantity, id) => {
    try {
      const data = {
        quantity: quantity,
      };
      setLoading(true);
      await axios.put(`${base_url}/medicine/add/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
      getAllDrugs();
      setLoading(false);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
      console.log(error);
    }
  };

  const subtractDrugQuantity = async (quantity, id) => {
    try {
      const data = {
        quantity: quantity,
      };
      setLoading(true);
      await axios.put(`${base_url}/medicine/subtract/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
      getAllDrugs();
      setLoading(false);
    } catch (error) {
      toast.error("An error occured", { autoClose: 1500 });
    }
  };

  const signOut = () => {
    navigate("/");
    setTimeout(() => {
      localStorage.removeItem("token");
    }, 500);
  };

  const values = {
    base_url,
    Bearer,
    path,
    loginLoading,
    workerForm,
    token,
    userId,
    displayMoulder,
    loginForm,
    departments,
    loading,
    previewImage,
    previewName,
    error,
    moulderContent,
    workers,
    userRole,
    departmentForm,
    singleDepartment,
    currentPage,
    itemsPerPage,
    totalPages,
    filteredWorkers,
    startSlice,
    wardForm,
    wards,
    editingId,
    prevWardId,
    singleWard,
    patientForm,
    patients,
    appointments,
    appointmentForm,
    currentUser,
    diagnosticForm,
    appId,
    diagnostic,
    singleDiagnostic,
    singleUser,
    formData,
    drugForm,
    drugs,
    payments,
    singlePayment,
    isAdmin,
    getPatientPayment,
    setIsAdmin,
    getPaymentById,
    getAllPayments,
    deleteDrug,
    addDrugQuantity,
    subtractDrugQuantity,
    updateDrug,
    getAllDrugs,
    addDrug,
    setDrugForm,
    drugChange,
    updateWard,
    deleteWard,
    deleteDepartment,
    updateDepartment,
    deleteWorker,
    deletePatient,
    setFormData,
    formChange,
    getUserById,
    updatePatient,
    signOut,
    downloadDiagnostic,
    getPatientForWard,
    updateDiagnosis,
    getDiagnosticById,
    getPatientDiagnostic,
    addDiagnostic,
    setAppId,
    diagnosticChange,
    setDiagnosticForm,
    getAppointmentForPatient,
    getAppointmentForDoctor,
    cancelAppointment,
    rescheduleAppointment,
    getAppointments,
    addAppointment,
    appointmentChange,
    setAppointmentForm,
    dischargePatient,
    setIsPatient,
    setPatients,
    getPatients,
    patientChange,
    addPatient,
    setPatientForm,
    updateWorker,
    suspendUser,
    getWardById,
    setPrevWardId,
    setEditingId,
    assignWard,
    transferWard,
    getAllWards,
    addWard,
    setWardForm,
    wardChange,
    changePage,
    setLoading,
    setSearch,
    setCurrentPage,
    getWorkerByRole,
    getAllWorkers,
    getDepartmentById,
    setDepartmentForm,
    addDepartment,
    setPreviewImage,
    setPreviewName,
    departmentChange,
    workerChange,
    addWorker,
    getAllDepartments,
    setWorkerForm,
    setMoulderContent,
    setDisplayMoulder,
    changePassword,
    sendOtp,
    setLoginForm,
    loginChange,
    navigate,
    login,
  };
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext(GlobalContext);
};

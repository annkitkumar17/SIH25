// import React, { useState, useContext } from "react";
// function DoctorDashboard(){
// return(<div>Doctor Dashboard</div>)
// }

// export default DoctorDashboard;

// src/Page/Dashboard/DoctorDashboard.jsx
import React, { useState, useMemo } from "react";
import {
  Heart,
  Calendar,
  Users,
  Video,
  FileText,
  Bell,
  Settings,
  Search,
  Filter,
  Clock,
  Phone,
  MessageCircle,
  Stethoscope,
  TrendingUp,
  User,
  MapPin,
  Star,
  ChevronRight,
  Plus,
  CheckCircle,
  ClipboardList,
  Camera,
  PhoneOff,
  Mic,
  LogOut,
  BookOpen,
  BarChart3,
  Menu,
  X,
  Edit,
  Download,
  Upload,
  Eye,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";

/**
 * Full, single-file DoctorDashboard.jsx
 * - Uses AuthContext (useAuth) to show real doctor name & specialization
 * - All UI in one file: sidebar, header, dashboard, appointments, patients,
 *   consultations, prescriptions, reports, settings
 * - Working Add Prescription modal (integrated with selected patient)
 * - Working Video Call UI (mock)
 * - Mock data used throughout (replace with API calls later)
 *
 * Paste this file as-is into your project.
 */

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { user, logout: authLogout } = useAuth();

  // derive doctor info from auth context (fallbacks)
  const doctorInfoFromAuth = {
    name: user?.username || user?.name || "Doctor",
    specialization: user?.specialization || "General Physician",
    avatar: user?.avatar || "/api/placeholder/100/100",
  };

  // UI state
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [appointmentFilter, setAppointmentFilter] = useState("all"); // all / today / pending / confirmed
  const [showPatientPanel, setShowPatientPanel] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAddPrescription, setShowAddPrescription] = useState(false);

  // Mock data (single source of truth in component)
  const [doctorInfo] = useState({
    name: doctorInfoFromAuth.name,
    specialization: doctorInfoFromAuth.specialization,
    avatar: doctorInfoFromAuth.avatar,
    rating: 4.8,
    patients: 1247,
    consultations: 3456,
    experience: "15 years"
  });

  const [todayStats, setTodayStats] = useState({
    appointmentsToday: 8,
    completed: 5,
    pending: 3,
    revenue: "₹12,500",
    avgRating: 4.9
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientId: 101,
      patient: "Sunita Devi",
      age: 45,
      location: "Khetpur Village, UP",
      time: "10:30 AM",
      date: "2025-09-13",
      type: "video",
      status: "confirmed",
      symptoms: "Fever, headache"
    },
    {
      id: 2,
      patientId: 102,
      patient: "Ram Singh",
      age: 62,
      location: "Rampur, Bihar",
      time: "11:15 AM",
      date: "2025-09-13",
      type: "audio",
      status: "waiting",
      symptoms: "Blood pressure check"
    },
    {
      id: 3,
      patientId: 103,
      patient: "Priya Sharma",
      age: 28,
      location: "Sitapur, MP",
      time: "2:00 PM",
      date: "2025-09-13",
      type: "video",
      status: "confirmed",
      symptoms: "Pregnancy consultation"
    },
    {
      id: 4,
      patientId: 104,
      patient: "Amit Verma",
      age: 33,
      location: "Lucknow, UP",
      time: "4:00 PM",
      date: "2025-09-14",
      type: "video",
      status: "pending",
      symptoms: "Stomach pain"
    }
  ]);

  const [patients, setPatients] = useState([
    { id: 101, name: "Sunita Devi", age: 45, lastVisit: "2 days ago", condition: "Fever", location: "Khetpur Village, UP", notes: "Responded well to paracetamol", status: "stable" },
    { id: 102, name: "Ram Singh", age: 62, lastVisit: "1 week ago", condition: "Hypertension", location: "Rampur, Bihar", notes: "BP slightly high", status: "improving" },
    { id: 103, name: "Priya Sharma", age: 28, lastVisit: "3 months ago", condition: "Antenatal", location: "Sitapur, MP", notes: "On iron supplements", status: "stable" },
    { id: 104, name: "Amit Verma", age: 33, lastVisit: "—", condition: "New", location: "Lucknow, UP", notes: "", status: "active" }
  ]);

  const [consultations, setConsultations] = useState([
    { id: 201, patientId: 101, patient: "Sunita Devi", date: "2025-09-11", type: "video", summary: "Fever — advised rest and meds", duration: "12m" },
    { id: 202, patientId: 102, patient: "Ram Singh", date: "2025-09-07", type: "audio", summary: "BP monitoring", duration: "18m" }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { id: 301, patientId: 101, patient: "Sunita Devi", date: "2025-09-11", meds: ["Paracetamol 500mg - 1 tab TDS x 3 days"], notes: "Follow-up if persistent" }
  ]);

  // Derived lists
  const filteredAppointments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return appointments.filter(a => {
      if (appointmentFilter === 'today') {
        // naive today check (mocked date used above)
        if (a.date !== '2025-09-13') return false;
      } else if (appointmentFilter === 'pending') {
        if (a.status !== 'pending' && a.status !== 'waiting') return false;
      } else if (appointmentFilter === 'confirmed') {
        if (a.status !== 'confirmed') return false;
      }
      if (!q) return true;
      return (
        a.patient.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.symptoms.toLowerCase().includes(q)
      );
    });
  }, [appointments, searchQuery, appointmentFilter]);

  const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(p => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q));
  }, [patients, searchQuery]);

  // Actions
  const startConsultation = (appointment) => {
    setSelectedAppointment(appointment);
    setIsVideoCall(true);
    // Mark as confirmed when starting
    setAppointments(prev => prev.map(a => a.id === appointment.id ? { ...a, status: 'confirmed' } : a));
  };

  const endConsultation = () => {
    setIsVideoCall(false);
    setSelectedAppointment(null);
  };

  const openPatientPanel = (patientId) => {
    const p = patients.find(x => x.id === patientId);
    setSelectedPatient(p || null);
    setShowPatientPanel(true);
  };

  const addPrescription = (prescription) => {
    setPrescriptions(prev => [{ id: Date.now(), ...prescription }, ...prev]);
    setShowAddPrescription(false);
  };

  const addNewPatient = (newPatient) => {
    setPatients(prev => [{ id: Date.now(), ...newPatient }, ...prev]);
  };

  const handleLogout = () => {
    // clear auth with context if available
    if (typeof authLogout === "function") authLogout();
    navigate('/login');
  };

  // Add Prescription Modal submit helper (used by modal form below)
  const handleAddPrescriptionSubmit = (form) => {
    const medsRaw = form.get("meds") || "";
    const meds = medsRaw.split(",").map(m => m.trim()).filter(Boolean);
    const patientName = form.get("patient") || selectedPatient?.name || "Unknown";
    const newPres = {
      patientId: selectedPatient?.id || null,
      patient: patientName,
      date: new Date().toISOString().slice(0,10),
      meds,
      notes: form.get("notes") || ""
    };
    addPrescription(newPres);
  };

  // Video Call UI component
  const VideoCallInterface = () => (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Video Call Header */}
      <div className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">{selectedAppointment?.patient}</h3>
            <p className="text-gray-300 text-sm">{selectedAppointment?.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 text-sm flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Connected
          </span>
        </div>
      </div>

      {/* Video Areas */}
      <div className="flex-1 relative bg-gray-900">
        {/* Patient Video (Main) */}
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <User className="w-16 h-16 text-white" />
            </div>
            <p className="text-white text-lg">{selectedAppointment?.patient}</p>
            <p className="text-gray-400">Video connecting...</p>
          </div>
        </div>

        {/* Doctor Video (PiP) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-emerald-500 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
            <div className="text-center">
              <Camera className="w-8 h-8 text-white mb-2 mx-auto" />
              <p className="text-white text-sm">You</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Call Controls */}
      <div className="bg-gray-800 p-6">
        <div className="flex items-center justify-center gap-4">
          <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <Mic className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <Video className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors" onClick={endConsultation}>
            <PhoneOff className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 bg-gray-600 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors">
            <FileText className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button onClick={endConsultation} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors">End Call</button>
          <div className="text-gray-300 text-sm">Call duration: 00:00</div>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors" onClick={() => setShowAddPrescription(true)}>Prescribe Medicine</button>
        </div>
      </div>
    </div>
  );

  // Small helper: Stats cards component (keeps UI consistent)
  const statsCards = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{todayStats.appointmentsToday}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Today's Appointments</h3>
        <p className="text-sm text-gray-600">{todayStats.pending} pending</p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{todayStats.completed}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Completed Today</h3>
        <p className="text-sm text-gray-600">Great progress!</p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{doctorInfo.patients}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Total Patients</h3>
        <p className="text-sm text-gray-600">+23 this month</p>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">{todayStats.revenue}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">Today's Revenue</h3>
        <p className="text-sm text-gray-600">+12% from yesterday</p>
      </div>
    </div>
  );

  // Main return
  return (
    <>
      {isVideoCall && selectedAppointment ? (
        <VideoCallInterface />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
          {/* Sidebar */}
          <div className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-lg border-r border-white/20 shadow-xl z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-64'} w-64`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  RuralCare AI
                </h1>
              </div>

              {/* Doctor Profile Card */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-4 mb-8 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doctorInfo.name}</h3>
                    <p className="text-emerald-100 text-sm">{doctorInfo.specialization}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{doctorInfo.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{doctorInfo.patients}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                  { id: 'appointments', icon: Calendar, label: 'Appointments' },
                  { id: 'patients', icon: Users, label: 'Patients' },
                  { id: 'consultations', icon: Video, label: 'Consultations' },
                  { id: 'prescriptions', icon: FileText, label: 'Prescriptions' },
                  { id: 'reports', icon: ClipboardList, label: 'Reports' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id ? 'bg-emerald-100 text-emerald-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <div className="absolute bottom-6 left-6 right-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Good morning, {doctorInfo.name.split(' ')[0]}</h2>
                    <p className="text-gray-600">You have {todayStats.appointmentsToday} appointments today</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search patients, appointments..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Bell className="w-6 h-6 text-gray-600" />
                      {notifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{notifications}</span>}
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { setActiveTab('appointments'); }}>New Appointment</button>
                  </div>
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {statsCards}

                  {/* Upcoming Appointments */}
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                      <div className="flex items-center gap-3">
                        <select value={appointmentFilter} onChange={e => setAppointmentFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg">
                          <option value="all">All</option>
                          <option value="today">Today</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                        <button onClick={() => setActiveTab('appointments')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">View All</button>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      {filteredAppointments.length === 0 && <div className="text-gray-600">No appointments match your filter.</div>}
                      {filteredAppointments.map(appt => (
                        <div key={appt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{appt.patient}</h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{appt.time}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{appt.location}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{appt.symptoms}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${appt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : appt.status === 'waiting' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                              {appt.status}
                            </span>
                            <button onClick={() => { setSelectedAppointment(appt); startConsultation(appt); }} className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                              {appt.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            </button>
                            <button onClick={() => openPatientPanel(appt.patientId)} className="px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Details</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Patients & Quick Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                      <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">Recent Patients</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        {patients.slice(0, 5).map(p => (
                          <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{p.name}</h4>
                                <p className="text-sm text-gray-600">{p.condition} • {p.lastVisit}</p>
                                <p className="text-xs text-gray-500">{p.location}</p>
                              </div>
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'stable' ? 'bg-emerald-100 text-emerald-700' : p.status === 'improving' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                              {p.status || 'active'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg">
                      <div className="p-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
                      </div>
                      <div className="p-6 space-y-3">
                        {[
                          { icon: Plus, label: 'Add New Patient', action: () => { const newP = { name: 'New Patient', location: 'Unknown', condition: 'New', lastVisit: '—', status: 'active' }; addNewPatient(newP); } },
                          { icon: FileText, label: 'Create Prescription', action: () => setShowAddPrescription(true) },
                          { icon: Calendar, label: 'Schedule Appointment', action: () => setActiveTab('appointments') },
                          { icon: ClipboardList, label: 'Generate Report', action: () => setActiveTab('reports') },
                          { icon: BookOpen, label: 'View Medical Records', action: () => setActiveTab('patients') }
                        ].map((action, i) => (
                          <button key={i} onClick={action.action} className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-medium text-gray-900">{action.label}</span>
                            <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Appointments Management</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <select value={appointmentFilter} onChange={e => setAppointmentFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg">
                          <option value="all">All</option>
                          <option value="today">Today</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                        </select>
                      </div>
                      <button onClick={() => { /* open new appointment modal if implemented */ }} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                        <Plus className="w-4 h-4" /> New Appointment
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {filteredAppointments.length === 0 && <div className="text-gray-600">No appointments.</div>}
                      {filteredAppointments.map(appointment => (
                        <div key={appointment.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                              <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{appointment.patient}</h3>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1 text-gray-600"><Clock className="w-4 h-4" />{appointment.time}</span>
                                <span className="flex items-center gap-1 text-gray-600"><MapPin className="w-4 h-4" />{appointment.location}</span>
                                <span className="flex items-center gap-1 text-gray-600"><User className="w-4 h-4" />{appointment.age} years</span>
                              </div>
                              <p className="text-gray-700 mt-2 font-medium">Symptoms: {appointment.symptoms}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Reschedule</button>
                            <button onClick={() => startConsultation(appointment)} className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg transition-colors flex items-center gap-2">
                              {appointment.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />} Start Consultation
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'patients' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Patient Directory</h2>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setShowPatientPanel(false)} className="px-3 py-2 border rounded-lg">Clear</button>
                      <button onClick={() => { /* export list */ }} className="px-3 py-2 border rounded-lg flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        {filteredPatients.map(p => (
                          <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{p.name}</h4>
                                <p className="text-sm text-gray-600">{p.condition} • {p.lastVisit}</p>
                                <p className="text-xs text-gray-500">{p.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => { setSelectedPatient(p); setShowPatientPanel(true); }} className="px-3 py-2 border rounded-lg">View</button>
                              <button onClick={() => { setSelectedPatient(p); setShowAddPrescription(true); }} className="px-3 py-2 bg-emerald-600 text-white rounded-lg">Prescribe</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div>
                        <div className="p-4 bg-emerald-50 rounded-xl">
                          <h4 className="font-semibold mb-2">Patient Stats</h4>
                          <p className="text-sm text-gray-600 mb-3">Total patients: {patients.length}</p>
                          <p className="text-sm text-gray-600">New this month: 12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'consultations' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Consultations</h2>
                    <div className="flex items-center gap-3">
                      <button onClick={() => { /* export */ }} className="px-3 py-2 border rounded-lg flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6">
                    <div className="space-y-4">
                      {consultations.map(c => (
                        <div key={c.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{c.patient}</h4>
                            <p className="text-sm text-gray-600">{c.date} • {c.type} • {c.duration}</p>
                            <p className="text-sm text-gray-700 mt-2">{c.summary}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => { setSelectedPatient(patients.find(p => p.id === c.patientId) || null); setShowPatientPanel(true); }} className="px-3 py-2 border rounded-lg">Patient</button>
                            <button onClick={() => { /* view notes */ }} className="px-3 py-2 bg-emerald-600 text-white rounded-lg">View</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Prescriptions</h2>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setShowAddPrescription(true)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">New Prescription</button>
                      <button onClick={() => { /* download */ }} className="px-3 py-2 border rounded-lg flex items-center gap-2"><Download className="w-4 h-4" /> Export</button>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-6">
                    {prescriptions.length === 0 && <div className="text-gray-600">No prescriptions yet.</div>}
                    {prescriptions.map(pres => (
                      <div key={pres.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{pres.patient}</h4>
                          <p className="text-sm text-gray-600">{pres.date}</p>
                          <p className="text-sm text-gray-700 mt-2">{pres.meds.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => { /* view */ }} className="px-3 py-2 border rounded-lg">View</button>
                          <button onClick={() => { /* download */ }} className="px-3 py-2 border rounded-lg">Download</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Reports & Analytics</h2>
                    <div className="flex items-center gap-3">
                      <button onClick={() => { /* refresh */ }} className="px-3 py-2 border rounded-lg">Refresh</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/80 rounded-2xl p-6 border border-white/20 shadow-lg">
                      <h4 className="font-semibold mb-2">Monthly Patients</h4>
                      <p className="text-3xl font-bold">+12%</p>
                      <p className="text-sm text-gray-600 mt-2">Compared to last month</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-6 border border-white/20 shadow-lg">
                      <h4 className="font-semibold mb-2">Average Rating</h4>
                      <p className="text-3xl font-bold">{todayStats.avgRating}</p>
                      <p className="text-sm text-gray-600 mt-2">Over last 30 days</p>
                    </div>
                    <div className="bg-white/80 rounded-2xl p-6 border border-white/20 shadow-lg">
                      <h4 className="font-semibold mb-2">Revenue</h4>
                      <p className="text-3xl font-bold">{todayStats.revenue}</p>
                      <p className="text-sm text-gray-600 mt-2">Today</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Profile & Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Name</label>
                      <input defaultValue={doctorInfo.name} className="w-full mt-2 p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Specialization</label>
                      <input defaultValue={doctorInfo.specialization} className="w-full mt-2 p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Experience</label>
                      <input defaultValue={doctorInfo.experience} className="w-full mt-2 p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Notifications</label>
                      <select value={notifications} onChange={e => setNotifications(Number(e.target.value))} className="w-full mt-2 p-3 border rounded-lg">
                        <option value={0}>Off</option>
                        <option value={1}>Low</option>
                        <option value={3}>Normal</option>
                        <option value={5}>High</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>

          {/* Patient side panel */}
          {showPatientPanel && selectedPatient && (
            <div className="fixed right-6 top-24 w-96 bg-white/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 z-50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{selectedPatient.name}</h4>
                  <p className="text-sm text-gray-600">{selectedPatient.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowPatientPanel(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-600"><strong>Age:</strong> {selectedPatient.age}</div>
                <div className="text-sm text-gray-600"><strong>Last visit:</strong> {selectedPatient.lastVisit}</div>
                <div className="text-sm text-gray-600"><strong>Condition:</strong> {selectedPatient.condition}</div>
                <div className="text-sm text-gray-600"><strong>Notes:</strong> {selectedPatient.notes || '—'}</div>

                <div className="flex items-center gap-3 mt-4">
                  <button onClick={() => { setActiveTab('consultations'); setShowPatientPanel(false); }} className="px-3 py-2 bg-emerald-600 text-white rounded-lg">Start Consult</button>
                  <button onClick={() => { setShowAddPrescription(true); setShowPatientPanel(false); }} className="px-3 py-2 border rounded-lg">Prescribe</button>
                </div>
              </div>
            </div>
          )}

          {/* Add Prescription Modal */}
          {showAddPrescription && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddPrescription(false)}></div>
              <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-lg z-50">
                <button onClick={() => setShowAddPrescription(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>

                <h3 className="text-lg font-semibold mb-2">Create Prescription</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const form = new FormData(e.target);
                  handleAddPrescriptionSubmit(form);
                }}>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700">Patient Name</label>
                      <input name="patient" defaultValue={selectedPatient?.name || ''} className="w-full mt-2 p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">Medications (comma separated)</label>
                      <input name="meds" placeholder="e.g. Paracetamol 500mg - 1 tab TDS x 3 days" required className="w-full mt-2 p-3 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">Notes</label>
                      <textarea name="notes" className="w-full mt-2 p-3 border rounded-lg" />
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-4">
                      <button type="button" onClick={() => setShowAddPrescription(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                      <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Save Prescription</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}


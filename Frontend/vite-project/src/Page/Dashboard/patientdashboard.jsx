

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Context/authContext";
// import {
//   Heart,
//   Calendar,
//   FileText,
//   MessageSquare,
//   Settings,
//   LogOut,
//   User,
//   Bell,
//   Search,
//   Clock,
//   Video,
//   Phone,
//   Shield,
//   Activity,
//   Pill,
//   TrendingUp,
//   ChevronRight,
//   AlertCircle,
//   CheckCircle2,
//   Star,
// } from "lucide-react";

// function PatientDashboard() {
//   const { user, logout } = useContext(AuthContext);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const upcomingAppointments = [
//     {
//       id: 1,
//       doctor: "Dr. Sarah Johnson",
//       specialty: "Cardiologist",
//       date: "Today",
//       time: "2:30 PM",
//       type: "video",
//       status: "confirmed",
//       avatar: "SJ",
//       rating: 4.9,
//     },
//     {
//       id: 2,
//       doctor: "Dr. Michael Smith",
//       specialty: "Dermatologist",
//       date: "Tomorrow",
//       time: "10:00 AM",
//       type: "phone",
//       status: "pending",
//       avatar: "MS",
//       rating: 4.8,
//     },
//   ];

//   const recentActivities = [
//     {
//       type: "prescription",
//       message: "New prescription from Dr. Johnson",
//       time: "2 hours ago",
//       icon: Pill,
//     },
//     {
//       type: "appointment",
//       message: "Appointment confirmed for today",
//       time: "4 hours ago",
//       icon: CheckCircle2,
//     },
//     {
//       type: "message",
//       message: "New message from Dr. Smith",
//       time: "1 day ago",
//       icon: MessageSquare,
//     },
//     {
//       type: "report",
//       message: "Lab results available",
//       time: "2 days ago",
//       icon: FileText,
//     },
//   ];

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
//       {/* Sidebar */}
//       <aside className="w-72 bg-white/95 backdrop-blur-xl border-r border-emerald-200/60 shadow-2xl flex flex-col relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-emerald-600/5 to-teal-600/5 pointer-events-none" />

//         <div className="relative z-10 p-6 flex items-center gap-4 border-b border-emerald-100">
//           <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
//             <Heart className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
//               RuralCare AI
//             </h2>
//             <p className="text-xs text-emerald-600 font-medium">
//               Patient Dashboard
//             </p>
//           </div>
//         </div>

//         <nav className="flex-1 p-4 space-y-1 relative z-10">
//           {[
//             { id: "dashboard", icon: Activity, label: "Dashboard" },
//             { id: "profile", icon: User, label: "My Profile" },
//             { id: "appointments", icon: Calendar, label: "Appointments" },
//             { id: "prescriptions", icon: FileText, label: "Prescriptions" },
//             { id: "messages", icon: MessageSquare, label: "Messages" },
//             { id: "settings", icon: Settings, label: "Settings" },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveTab(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
//                 activeTab === item.id
//                   ? "bg-emerald-50 text-emerald-700 shadow-md border border-emerald-100"
//                   : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//               }`}
//             >
//               <item.icon
//                 className={`w-5 h-5 ${
//                   activeTab === item.id
//                     ? "text-emerald-600"
//                     : "text-slate-400 group-hover:text-slate-600"
//                 }`}
//               />
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-emerald-100 relative z-10">
//           <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mb-3">
//             <div className="flex items-center gap-2 mb-2">
//               <Shield className="w-4 h-4 text-green-600" />
//               <span className="text-sm font-semibold text-green-800">
//                 HIPAA Compliant
//               </span>
//             </div>
//             <p className="text-xs text-green-700">
//               Your health data is secure
//             </p>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-all duration-200 group"
//           >
//             <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <header className="bg-white/90 backdrop-blur-xl border-b border-emerald-200/60 p-6 sticky top-0 z-20">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">
//                 Good afternoon, {user?.username || "Patient"} 👋
//               </h1>
//               <p className="text-slate-600 mt-1">
//                 Here’s what’s happening with your health today
//               </p>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
//                 <input
//                   type="text"
//                   placeholder="Search doctors, appointments..."
//                   className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none w-64"
//                 />
//               </div>

//               <button className="relative p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
//                 <Bell className="w-5 h-5 text-slate-600" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
//               </button>

//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
//                 {user?.username?.charAt(0) || "P"}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="p-8 space-y-8">
//           {/* Health Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-4">
//                 <Calendar className="w-6 h-6 text-emerald-600" />
//                 <TrendingUp className="w-4 h-4 text-green-500" />
//               </div>
//               <h3 className="font-semibold text-slate-800 mb-1">
//                 Next Appointment
//               </h3>
//               <p className="text-slate-600">Today at 2:30 PM</p>
//             </div>

//             <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-4">
//                 <Pill className="w-6 h-6 text-emerald-600" />
//                 <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
//                   Active
//                 </span>
//               </div>
//               <h3 className="font-semibold text-slate-800 mb-1">
//                 Prescriptions
//               </h3>
//               <p className="text-slate-600">5 Active</p>
//             </div>

//             <div className="p-6 bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
//               <div className="flex items-center justify-between mb-4">
//                 <Heart className="w-6 h-6 text-emerald-600" />
//                 <span className="text-xs text-green-600 font-medium">
//                   Excellent
//                 </span>
//               </div>
//               <h3 className="font-semibold text-slate-800 mb-1">Health Score</h3>
//               <p className="text-slate-600">92 / 100</p>
//             </div>
//           </div>

//           {/* Upcoming Appointments */}
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-slate-800">
//                 Upcoming Appointments
//               </h2>
//               <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
//                 View All <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {upcomingAppointments.map((appt) => (
//                 <div
//                   key={appt.id}
//                   className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition cursor-pointer"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold">
//                         {appt.avatar}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-slate-800">
//                           {appt.doctor}
//                         </p>
//                         <p className="text-sm text-slate-500">
//                           {appt.specialty}
//                         </p>
//                         <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
//                           <Clock className="w-3 h-3 text-slate-400" />{" "}
//                           {appt.date} at {appt.time}
//                           {appt.type === "video" ? (
//                             <Video className="w-3 h-3 text-emerald-500" />
//                           ) : (
//                             <Phone className="w-3 h-3 text-teal-500" />
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         appt.status === "confirmed"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {appt.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-xl font-bold text-slate-800">
//                 Recent Activity
//               </h2>
//               <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
//                 View All <ChevronRight className="w-4 h-4" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {recentActivities.map((activity, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
//                 >
//                   <activity.icon className="w-6 h-6 text-emerald-600" />
//                   <div>
//                     <p className="text-slate-800 font-medium">
//                       {activity.message}
//                     </p>
//                     <p className="text-xs text-slate-500">{activity.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default PatientDashboard;


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/authContext";
import {
  Heart,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Bell,
  Activity,
  Mic,
  ClipboardList,
} from "lucide-react";

function PatientDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Voice Symptom Checker
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition API");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);

      // Mock AI response (replace later with backend call)
      setResponse(
        "Based on your symptoms, it could be a mild viral infection. Stay hydrated and monitor your condition. If it worsens, consult a doctor."
      );
    };

    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  // ---------------- MOCK DATA ----------------
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2025-09-15",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. James Smith",
      date: "2025-09-20",
      time: "2:30 PM",
      status: "Pending",
    },
  ];

  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      medicine: "Paracetamol 500mg",
      dosage: "Twice a day for 5 days",
      date: "2025-09-10",
    },
  ];

  const messages = [
    { id: 1, from: "Dr. Sarah Johnson", text: "How are you feeling today?" },
    { id: 2, from: "Clinic Reception", text: "Your report is ready for pickup." },
  ];

  const healthRecords = [
    {
      id: 1,
      title: "Blood Test Report",
      date: "2025-08-30",
      summary: "Normal blood sugar and cholesterol levels",
    },
    {
      id: 2,
      title: "X-Ray Chest",
      date: "2025-07-22",
      summary: "No abnormalities detected",
    },
  ];
  // -------------------------------------------

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white/95 backdrop-blur-xl border-r border-emerald-200/60 shadow-2xl flex flex-col relative">
        <div className="p-6 flex items-center gap-4 border-b border-emerald-100">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              RuralCare AI
            </h2>
            <p className="text-xs text-emerald-600 font-medium">
              Healthcare Platform
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", icon: Activity, label: "Dashboard" },
            { id: "appointments", icon: Calendar, label: "Appointments" },
            { id: "prescriptions", icon: FileText, label: "Prescriptions" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "symptom-checker", icon: Mic, label: "Symptom Checker" },
            { id: "records", icon: ClipboardList, label: "Health Records" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700 shadow-md border border-emerald-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${
                  activeTab === item.id
                    ? "text-emerald-600"
                    : "text-slate-400 group-hover:text-slate-600"
                }`}
              />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-emerald-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Hello, {user?.username || "Patient"} 👋
            </h1>
            <p className="text-slate-600 mt-1">
              Welcome to your personalized care dashboard
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 bg-slate-100 hover:bg-slate-200 rounded-xl">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
              {user?.username?.charAt(0) || "P"}
            </div>
          </div>
        </header>

        {/* Tab Content */}
        {activeTab === "dashboard" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">Dashboard Overview</h2>
            <p className="text-slate-600">
              Here you can quickly view your appointments, prescriptions, and
              health updates.
            </p>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">📅 Your Appointments</h2>
            <ul className="space-y-3">
              {appointments.map((a) => (
                <li
                  key={a.id}
                  className="p-4 border rounded-lg hover:bg-slate-50"
                >
                  <p className="font-medium">{a.doctor}</p>
                  <p className="text-sm text-slate-600">
                    {a.date} at {a.time}
                  </p>
                  <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">💊 Prescriptions</h2>
            <ul className="space-y-3">
              {prescriptions.map((p) => (
                <li
                  key={p.id}
                  className="p-4 border rounded-lg hover:bg-slate-50"
                >
                  <p className="font-medium">{p.medicine}</p>
                  <p className="text-sm text-slate-600">{p.dosage}</p>
                  <p className="text-xs text-slate-500">
                    Prescribed by {p.doctor} on {p.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">💬 Messages</h2>
            <ul className="space-y-3">
              {messages.map((m) => (
                <li
                  key={m.id}
                  className="p-4 border rounded-lg hover:bg-slate-50"
                >
                  <p className="font-medium">{m.from}</p>
                  <p className="text-slate-600">{m.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "symptom-checker" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">🩺 AI Symptom Checker</h2>
            <button
              onClick={startListening}
              disabled={listening}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              {listening ? "Listening..." : "🎙️ Start Voice Check"}
            </button>
            {transcript && (
              <p className="mt-4 text-gray-700">
                <strong>You said:</strong> {transcript}
              </p>
            )}
            {response && (
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <strong>AI Analysis:</strong> {response}
              </div>
            )}
          </div>
        )}

        {activeTab === "records" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">📑 Digital Health Records</h2>
            <ul className="space-y-3">
              {healthRecords.map((r) => (
                <li
                  key={r.id}
                  className="p-4 border rounded-lg hover:bg-slate-50"
                >
                  <p className="font-medium">{r.title}</p>
                  <p className="text-sm text-slate-600">{r.summary}</p>
                  <p className="text-xs text-slate-500">Dated: {r.date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-2">⚙️ Settings</h2>
            <p className="text-slate-600">Manage your account settings here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default PatientDashboard;

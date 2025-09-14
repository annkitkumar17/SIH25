
import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/authContext"; // ✅ real context
import {
  User,
  Mail,
  Lock,
  UserCheck,
  Stethoscope,
  Eye,
  EyeOff,
  Heart,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Phone,
  Calendar,
  Award,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    specialization: "",
    licenseNumber: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ get real login

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.role === "doctor" && !formData.specialization) {
      setError("Specialization is required for doctors");
      return false;
    }
    if (formData.role === "doctor" && !formData.licenseNumber) {
      setError("License number is required for doctors");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ save user + role in AuthContext & localStorage
        login(data.user, data.user.role);

        if (data.user.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/patient-dashboard");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => navigate("/");
  const handleGoToLogin = () => navigate("/login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334D399' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Header */}
      <header className="absolute top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6">
          <button 
            onClick={handleBackToHome}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 rounded-lg hover:bg-white/20 transition-colors group">
              <ArrowLeft className="w-5 h-5 text-emerald-700 group-hover:text-emerald-800" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                RuralCare AI
              </h1>
            </div>
          </button>

          <button
            onClick={handleGoToLogin}
            className="px-4 py-2 rounded-lg text-emerald-600 hover:bg-white/20 transition-colors font-medium"
          >
            Already have account?
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-4xl">
          {/* Welcome Card */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Secure Registration Portal
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Join RuralCare AI
            </h2>
            <p className="text-gray-600">
              Create your account to start providing or receiving quality healthcare
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Role Selection - Featured at Top */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  I am registering as a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                      formData.role === 'patient' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={formData.role === 'patient'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Patient</div>
                      <div className="text-xs text-gray-500">Seeking healthcare</div>
                    </div>
                  </label>

                  <label
                    className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                      formData.role === 'doctor' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={formData.role === 'doctor'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">Doctor</div>
                      <div className="text-xs text-gray-500">Providing healthcare</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number (optional)"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create password"
                      required
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      required
                      className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Doctor-specific fields */}
              {formData.role === 'doctor' && (
                <div className="space-y-6 p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Stethoscope className="w-5 h-5" />
                    <h3 className="font-semibold">Medical Professional Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Specialization
                      </label>
                      <select
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                      >
                        <option value="">Select your specialization</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Dentist">Dentist</option>
                        <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="ENT Specialist">ENT Specialist</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Urologist">Urologist</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="Rheumatologist">Rheumatologist</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Medical License Number
                      </label>
                      <input
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your license number"
                        required
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all bg-white/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Create {formData.role === 'doctor' ? 'Doctor' : 'Patient'} Account
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <button
                onClick={handleGoToLogin}
                className="w-full py-3 px-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                Sign In Instead
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                256-bit SSL
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Trusted Platform
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2024 RuralCare AI. Empowering rural communities with quality healthcare.</p>
          <div className="mt-2 flex justify-center gap-6">
            <button onClick={() => navigate("/privacy")} className="hover:text-emerald-600 transition">Privacy Policy</button>
            <button onClick={() => navigate("/terms")} className="hover:text-emerald-600 transition">Terms of Service</button>
            <button onClick={() => navigate("/help")} className="hover:text-emerald-600 transition">Help Center</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;

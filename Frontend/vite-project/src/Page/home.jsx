import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Clock,
  Shield,
  ArrowRight,
  Menu,
  X,
  Star,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Added

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); // ✅ Using react-router navigation

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Expert Rural Doctors",
      description:
        "Connect with experienced healthcare professionals who understand rural communities and their unique challenges.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Consultations",
      description:
        "Access medical care anytime with our round-the-clock telemedicine platform designed for rural connectivity.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Health",
      description:
        "Build stronger, healthier communities with shared health resources and local health worker support.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Health Records",
      description:
        "Keep your medical history safe and accessible with our encrypted, HIPAA-compliant digital records system.",
      color: "from-orange-500 to-red-600",
    },
  ];

  const stats = [
    {
      number: "50K+",
      label: "Patients Served",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "1,000+",
      label: "Rural Doctors",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  const testimonials = [
    {
      name: "Ankit Kumar",
      location: "Village Khetpur, Uttar Pradesh",
      rating: 5,
      text: "RuralCare AI has been a lifesaver for our family. When my child had a fever at midnight, we got immediate consultation without traveling 50km to the nearest hospital.",
    },
    {
      name: "Dr. Yash Gupta",
      location: "Rural Health Specialist",
      rating: 5,
      text: "This platform helps me reach patients in the most remote areas. The video quality is excellent even with poor connectivity, and the patient management system is intuitive.",
    },
    {
      name: "Sunita Devi",
      location: "Gram Panchayat Head",
      rating: 5,
      text: "Our village health outcomes have improved significantly since implementing RuralCare AI. It's made quality healthcare accessible to everyone in our community.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-emerald-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
              RuralCare AI
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-emerald-600 transition"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-emerald-600 transition"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-emerald-600 transition"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-emerald-600 transition"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              <a
                href="#features"
                className="block text-gray-600 hover:text-emerald-600 transition"
              >
                Features
              </a>
              <a
                href="#about"
                className="block text-gray-600 hover:text-emerald-600 transition"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="block text-gray-600 hover:text-emerald-600 transition"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block text-gray-600 hover:text-emerald-600 transition"
              >
                Contact
              </a>
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 py-2 rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium transition-all duration-300"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334D399' fill-opacity='0.3'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              Trusted by 50,000+ Rural Families
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent leading-tight">
              Bringing Quality Healthcare to Every Village
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Connect with experienced doctors, access prescriptions, and manage
              health records – all designed for rural connectivity and
              communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate("/register")}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-xl border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white font-semibold transition-all duration-300"
              >
                Login
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-emerald-600">{stat.icon}</div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.number}
                    </div>
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose RuralCare AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges of rural healthcare and have
              built solutions specifically for your community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-500 bg-white hover:bg-gradient-to-br hover:from-white hover:to-gray-50"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from patients and doctors across rural India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Rural Healthcare?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of families who have already experienced better
            health outcomes with RuralCare AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-xl bg-white text-emerald-600 hover:bg-gray-100 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Start Your Free Trial
            </button>
            <button className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold transition-all duration-300">
              Contact Support Team
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">RuralCare AI</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Bridging the healthcare gap in rural India through innovative
                technology and compassionate care.
              </p>
              <div className="text-sm text-gray-500">
                © 2024 RuralCare AI. All rights reserved. Devloped by Ankit.
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#features"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Features
                </a>
                <a
                  href="#about"
                  className="block text-gray-400 hover:text-white transition"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="block text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-400">
                <div>Email: support@ruralcareai.com</div>
                <div>Phone: +91 1000690001</div>
                <div>Address: World Collage of Technology & Management, Gurugram, India</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

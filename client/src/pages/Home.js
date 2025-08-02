import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Smart Reminders",
      description: "Never miss a dose with intelligent notifications",
      icon: "🔔",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Medicine Tracking",
      description: "Keep track of all your medications in one place",
      icon: "💊",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Health Analytics",
      description: "Monitor your adherence and health patterns",
      icon: "📊",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-pulse">
            MedTrack
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your intelligent healthcare companion for medication management and wellness tracking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25">
              Get Started Free
            </Link>
            <Link to="/login" className="bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>

        {/* Dynamic Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`transform transition-all duration-500 hover:scale-105 ${
                currentFeature === index ? 'scale-105' : 'scale-95 opacity-75'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-6 mx-auto transform hover:rotate-12 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              About MedTrack
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Why MedTrack?</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  MedTrack is a personal project designed to help individuals manage their medication schedules effectively. 
                  Built with modern web technologies, it provides a clean, intuitive interface for tracking medicines and setting up reminders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Open source and privacy-focused</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>No data collection or tracking</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Built with React.js and Node.js</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-purple-400 mb-4">Key Features</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">🔔 Smart Reminders</h4>
                    <p className="text-gray-400 text-sm">Browser-based notifications to never miss a dose</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">💊 Medicine Management</h4>
                    <p className="text-gray-400 text-sm">Easy-to-use interface for adding and managing medications</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">📊 Progress Tracking</h4>
                    <p className="text-gray-400 text-sm">Monitor your medication adherence over time</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-6">
                Ready to start managing your medications more effectively?
              </p>
              <Link to="/register" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 inline-block">
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
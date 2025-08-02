import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = {
    mission: {
      title: 'Our Mission',
      content: 'To revolutionize healthcare management by making medication adherence simple, reliable, and accessible for everyone. We believe that proper medication management should not be a burden but a seamless part of daily life.'
    },
    features: {
      title: 'Key Features',
      content: 'Smart reminders, comprehensive tracking, detailed analytics, and personalized health insights - all designed to keep you on track with your medication schedule and improve your overall health outcomes.'
    },
    team: {
      title: 'Our Team',
      content: 'MedTrack is built by a passionate team of healthcare professionals, software engineers, and UX designers who understand the challenges of medication management and are committed to creating innovative solutions.'
    }
  };

  const projectHighlights = [
    { title: 'Open Source', description: 'Transparent and community-driven development', icon: '🔓' },
    { title: 'Privacy First', description: 'Your data stays on your device', icon: '🔒' },
    { title: 'Modern Tech', description: 'Built with React.js and Node.js', icon: '⚛️' },
    { title: 'Personal Project', description: 'Created to solve real medication tracking needs', icon: '💡' }
  ];

  const features = [
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Intelligent reminders that adapt to your schedule and preferences'
    },
    {
      icon: '📊',
      title: 'Health Analytics',
      description: 'Detailed insights into your medication adherence and health patterns'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'Your health data is encrypted and protected with enterprise-grade security'
    },
    {
      icon: '📱',
      title: 'Cross-Platform',
      description: 'Access your medications from any device, anywhere, anytime'
    },
    {
      icon: '🤝',
      title: 'Doctor Integration',
      description: 'Share reports with your healthcare providers for better coordination'
    },
    {
      icon: '🌍',
      title: 'Global Access',
      description: 'Available worldwide with multi-language support'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Background Pattern */}
      <div className="relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 blur-sm" />
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6">
                About MedTrack
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Empowering healthier lives through intelligent medication management and personalized healthcare tracking
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Highlights Section */}
      <div className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Project Highlights</h2>
            <p className="text-gray-300">What makes MedTracker special as a personal project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 text-center"
              >
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{highlight.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tabs Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Learn More About Us</h2>
            <div className="flex justify-center space-x-1 bg-white/10 rounded-2xl p-2 max-w-md mx-auto">
              {Object.keys(tabs).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tabs[tab].title}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {tabs[activeTab].title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed text-center">
                {tabs[activeTab].content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose MedTrack?</h2>
            <p className="text-xl text-gray-300">Discover the features that make us different</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Health Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start managing your medications more effectively with this personal project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Start Your Journey
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transform hover:scale-105 transition-all duration-300"
              >
                Sign In Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

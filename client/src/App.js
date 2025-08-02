import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Home from './pages/Home';
import * as api from './services/api';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = async (email, password) => {
    const res = await api.login(email, password);
    setToken(res.token);
    localStorage.setItem('token', res.token);
  };

  const handleRegister = async (name, email, password) => {
    const res = await api.register(name, email, password);
    setToken(res.token);
    localStorage.setItem('token', res.token);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <nav className="bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl">
                    <span className="text-2xl">💊</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    MedTrack
                  </span>
                  <span className="text-xs text-gray-400 -mt-1">Healthcare Companion</span>
                </div>
              </Link>
              
              {/* Navigation Links */}
              {token && (
                <div className="hidden lg:flex items-center space-x-2">
                  <Link to="/dashboard" className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                    <svg className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium text-white group-hover:text-cyan-300 transition-colors duration-300">Dashboard</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Right Side Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/about" className="px-4 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 border border-transparent hover:border-white/20">
                About
              </Link>
              {token ? (
                <button onClick={handleLogout} className="group flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-red-500/25 border border-red-400/20">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="px-4 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-300 border border-transparent hover:border-white/20">
                    Login
                  </Link>
                  <Link to="/register" className="group flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border border-cyan-400/20">
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden focus:outline-none p-2 rounded-xl hover:bg-white/10 transition-all duration-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 mx-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 space-y-4">
              <Link to="/about" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white" onClick={() => setMobileMenuOpen(false)}>
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">About</span>
              </Link>
              
              {token ? (
                <>
                  <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Dashboard</span>
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex items-center space-x-3 w-full p-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link to="/login" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 text-white" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link to="/register" className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 text-white font-semibold" onClick={() => setMobileMenuOpen(false)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

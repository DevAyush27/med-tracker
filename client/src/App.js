import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import * as api from './services/api';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

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
      <nav className="bg-gray-800 p-4 text-white flex justify-between">
        <div>
          <Link to="/" className="mr-4 font-bold">MedTrack</Link>
          {token && <Link to="/dashboard" className="mr-4">Dashboard</Link>}
        </div>
        <div>
          <Link to="/about" className="mr-2">About</Link>
          {token ? (
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-2">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/about" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold mb-4">About MedTrack</h2><p>MedTrack is your personal medicine reminder and tracker app. Manage your medicines, get reminders, and track your health easily!</p></div>} />
      </Routes>
    </Router>
  );
}

export default App;

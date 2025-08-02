import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import notificationService from '../services/notifications';
import Statistics from '../components/Statistics';
import { useToast } from '../components/Toast';

const Dashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    schedule: '',
    frequency: 'daily'
  });
  
  const { showSuccess, showError, showInfo, ToastContainer } = useToast();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMedicines();
    // Request notification permission on component mount
    notificationService.requestPermission();
    
    // Set up reminder checking interval
    const reminderInterval = setInterval(() => {
      if (medicines.length > 0) {
        notificationService.checkForReminders(medicines);
        notificationService.checkForOverdue(medicines);
      }
    }, 60000); // Check every minute

    return () => clearInterval(reminderInterval);
  }, [medicines]);

  const fetchMedicines = async () => {
    try {
      const data = await api.getMedicines(token);
      setMedicines(data);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const schedule = generateSchedule(formData.schedule, formData.frequency);
      await api.addMedicine(token, {
        name: formData.name,
        dose: formData.dose,
        schedule: schedule
      });
      setFormData({ name: '', dose: '', schedule: '', frequency: 'daily' });
      setShowAddForm(false);
      fetchMedicines();
      showSuccess(`${formData.name} has been added successfully!`);
    } catch (error) {
      console.error('Error adding medicine:', error);
      showError('Failed to add medicine. Please try again.');
    }
  };

  const generateSchedule = (time, frequency) => {
    const today = new Date();
    const schedule = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      if (frequency === 'daily') {
        schedule.push(new Date(date.setHours(...time.split(':').map(Number))));
      } else if (frequency === 'twice_daily') {
        schedule.push(new Date(date.setHours(...time.split(':').map(Number))));
        schedule.push(new Date(date.setHours(...time.split(':').map(Number), 0, 0, 0) + 12 * 60 * 60 * 1000));
      }
    }
    
    return schedule;
  };

  const markAsTaken = async (medicineId) => {
    try {
      const medicine = medicines.find(m => m._id === medicineId);
      const updatedHistory = [...medicine.takenHistory, new Date()];
      await api.updateMedicine(token, medicineId, { takenHistory: updatedHistory });
      fetchMedicines();
      showSuccess(`${medicine.name} marked as taken!`);
    } catch (error) {
      console.error('Error marking as taken:', error);
      showError('Failed to mark medicine as taken. Please try again.');
    }
  };

  const deleteMedicine = async (medicineId) => {
    const medicine = medicines.find(m => m._id === medicineId);
    if (window.confirm(`Are you sure you want to delete ${medicine.name}?`)) {
      try {
        await api.deleteMedicine(token, medicineId);
        fetchMedicines();
        showInfo(`${medicine.name} has been deleted.`);
      } catch (error) {
        console.error('Error deleting medicine:', error);
        showError('Failed to delete medicine. Please try again.');
      }
    }
  };

  const getNextDose = (medicine) => {
    const now = new Date();
    const nextDose = medicine.schedule.find(time => new Date(time) > now);
    return nextDose ? new Date(nextDose) : null;
  };

  const isOverdue = (medicine) => {
    const now = new Date();
    return medicine.schedule.some(time => new Date(time) < now && 
      !medicine.takenHistory.some(taken => 
        Math.abs(new Date(taken) - new Date(time)) < 30 * 60 * 1000
      ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                Medicine Dashboard
              </h1>
              <p className="text-gray-300 mt-2 text-lg">Track your medications and stay healthy ✨</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl transform hover:scale-110 hover:-translate-y-1 transition duration-300 flex items-center group"
          >
            <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Medicine
          </button>
        </div>

        {/* Enhanced Statistics */}
        <div className="relative z-10 mb-12">
          <div className="flex items-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-white">Your Medicine Statistics</h2>
          </div>
          <Statistics medicines={medicines} />
        </div>

      {/* Add Medicine Form */}
      {showAddForm && (
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl mb-8 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Add New Medicine</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dose</label>
                <input
                  type="text"
                  value={formData.dose}
                  onChange={(e) => setFormData({...formData, dose: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1 tablet"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={formData.schedule}
                  onChange={(e) => setFormData({...formData, schedule: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-xl shadow-lg font-semibold transform hover:-translate-y-1 transition duration-200">Add</button>
            </div>
          </form>
        </div>
      )}

      {/* Medicine Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {medicines.map((medicine) => {
          const nextDose = getNextDose(medicine);
          const overdue = isOverdue(medicine);
          return (
            <div key={medicine._id} className={`bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border-l-8 ${
              overdue ? 'border-red-500' : nextDose ? 'border-green-500' : 'border-gray-300'
            } transform hover:-translate-y-2 hover:scale-105 transition duration-300 animate-fade-in-up`}> 
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{medicine.name}</h3>
                  <p className="text-gray-600 font-medium">{medicine.dose}</p>
                </div>
                <button
                  onClick={() => deleteMedicine(medicine._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              {/* Progress Bar Example */}
              <div className="mb-4">
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${overdue ? 'bg-red-400' : 'bg-green-400'}`} style={{ width: nextDose ? '70%' : '100%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{overdue ? 'Overdue' : nextDose ? 'Next dose soon' : 'On track'}</div>
              </div>
              {/* Schedule Info */}
              <div className="flex flex-col gap-1 text-sm text-gray-700 mb-4">
                <div><span className="font-semibold">Next Dose:</span> {nextDose ? new Date(nextDose).toLocaleTimeString() : 'N/A'}</div>
                <div><span className="font-semibold">Schedule:</span> {medicine.schedule.map(t => new Date(t).toLocaleTimeString()).join(', ')}</div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => markAsTaken(medicine._id)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white px-4 py-2 rounded-lg font-semibold transform hover:scale-105 transition duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Taken
                </button>
                <button
                  onClick={() => deleteMedicine(medicine._id)}
                  className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white px-4 py-2 rounded-lg font-semibold transform hover:scale-105 transition duration-200 flex items-center justify-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Dashboard; 
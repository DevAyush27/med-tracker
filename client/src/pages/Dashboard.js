import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import notificationService from '../services/notifications';
import Statistics from '../components/Statistics';

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
    } catch (error) {
      console.error('Error adding medicine:', error);
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
    } catch (error) {
      console.error('Error marking as taken:', error);
    }
  };

  const deleteMedicine = async (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await api.deleteMedicine(token, medicineId);
        fetchMedicines();
      } catch (error) {
        console.error('Error deleting medicine:', error);
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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Medicine Dashboard</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Medicine
        </button>
      </div>

      {/* Statistics Section */}
      <div className="mb-8">
        <Statistics medicines={medicines} />
      </div>

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Medicine</h2>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="daily">Once Daily</option>
                  <option value="twice_daily">Twice Daily</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Add Medicine
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => {
          const nextDose = getNextDose(medicine);
          const overdue = isOverdue(medicine);
          
          return (
            <div key={medicine._id} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
              overdue ? 'border-red-500' : nextDose ? 'border-green-500' : 'border-gray-300'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{medicine.name}</h3>
                  <p className="text-gray-600">{medicine.dose}</p>
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

              <div className="space-y-2 mb-4">
                <div className="text-sm text-gray-600">
                  <strong>Schedule:</strong> {medicine.schedule.map(time => 
                    new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                  ).join(', ')}
                </div>
                {nextDose && (
                  <div className="text-sm">
                    <strong>Next dose:</strong> {nextDose.toLocaleString()}
                  </div>
                )}
                {overdue && (
                  <div className="text-sm text-red-600 font-semibold">
                    ⚠️ Overdue
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => markAsTaken(medicine._id)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  Mark as Taken
                </button>
              </div>

              {medicine.takenHistory.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Recently taken:</strong>
                  </p>
                  <div className="text-xs text-gray-500 space-y-1">
                    {medicine.takenHistory.slice(-3).reverse().map((time, index) => (
                      <div key={index}>
                        {new Date(time).toLocaleString()}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {medicines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines added yet</h3>
          <p className="text-gray-500">Add your first medicine to start tracking your schedule.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 
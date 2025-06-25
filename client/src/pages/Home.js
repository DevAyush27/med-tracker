import React from 'react';
import medImg from '../assets/med1.png';
import reminderImg from '../assets/reminder.png';
import trackImg from '../assets/track.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to MedTrack</h1>
      <p className="mb-8 text-lg text-gray-700 text-center max-w-xl">Your personal medicine reminder and tracker. Register or log in to start managing your medicines, get reminders, and track your health easily!</p>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center w-64">
          <img src={medImg} alt="Add Medicine" className="h-32 mb-2" />
          <h2 className="text-xl font-semibold mb-1">Add Medicines</h2>
          <p className="text-gray-600 text-center">Easily add your medicines and set up schedules.</p>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center w-64">
          <img src={reminderImg} alt="Reminders" className="h-32 mb-2" />
          <h2 className="text-xl font-semibold mb-1">Get Reminders</h2>
          <p className="text-gray-600 text-center">Never miss a dose with timely reminders.</p>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center w-64">
          <img src={trackImg} alt="Track History" className="h-32 mb-2" />
          <h2 className="text-xl font-semibold mb-1">Track History</h2>
          <p className="text-gray-600 text-center">View your medicine intake history at a glance.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 
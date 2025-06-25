import React from 'react';

const Statistics = ({ medicines }) => {
  const calculateStats = () => {
    if (!medicines || medicines.length === 0) {
      return {
        totalMedicines: 0,
        totalDoses: 0,
        takenDoses: 0,
        adherenceRate: 0,
        overdueCount: 0,
        nextDoses: []
      };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    let totalDoses = 0;
    let takenDoses = 0;
    let overdueCount = 0;
    const nextDoses = [];

    medicines.forEach(medicine => {
      // Count doses for the past week
      medicine.schedule.forEach(scheduledTime => {
        const scheduledDate = new Date(scheduledTime);
        if (scheduledDate >= weekAgo && scheduledDate <= now) {
          totalDoses++;
          
          // Check if taken
          const wasTaken = medicine.takenHistory.some(taken => {
            const takenDate = new Date(taken);
            return Math.abs(takenDate - scheduledDate) < 30 * 60 * 1000;
          });
          
          if (wasTaken) {
            takenDoses++;
          } else if (scheduledDate < now) {
            overdueCount++;
          }
        }
        
        // Find next doses
        if (scheduledDate > now) {
          nextDoses.push({
            medicine: medicine.name,
            time: scheduledDate,
            dose: medicine.dose
          });
        }
      });
    });

    const adherenceRate = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

    return {
      totalMedicines: medicines.length,
      totalDoses,
      takenDoses,
      adherenceRate,
      overdueCount,
      nextDoses: nextDoses.sort((a, b) => a.time - b.time).slice(0, 5)
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Medicine Statistics</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.totalMedicines}</div>
          <div className="text-sm text-gray-600">Active Medicines</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.takenDoses}</div>
          <div className="text-sm text-gray-600">Doses Taken</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.adherenceRate}%</div>
          <div className="text-sm text-gray-600">Adherence Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.overdueCount}</div>
          <div className="text-sm text-gray-600">Overdue Doses</div>
        </div>
      </div>

      {stats.nextDoses.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">Upcoming Doses</h3>
          <div className="space-y-2">
            {stats.nextDoses.map((dose, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{dose.medicine}</div>
                  <div className="text-sm text-gray-600">{dose.dose}</div>
                </div>
                <div className="text-sm text-gray-600">
                  {dose.time.toLocaleString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.adherenceRate < 80 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800 font-medium">Low Adherence Rate</span>
          </div>
          <p className="text-yellow-700 text-sm mt-1">
            Your adherence rate is {stats.adherenceRate}%. Try to take your medicines on time to improve your health outcomes.
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics; 
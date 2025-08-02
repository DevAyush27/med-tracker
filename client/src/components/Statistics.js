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
    <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {/* Active Medicines Card */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transform hover:scale-105 hover:-translate-y-2 transition duration-500 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-1">{stats.totalMedicines}</div>
              <div className="text-blue-300 font-medium">Active Medicines</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" style={{width: '100%'}}></div>
          </div>
        </div>
      </div>

      {/* Doses Taken Card */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transform hover:scale-105 hover:-translate-y-2 transition duration-500 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-2xl">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-1">{stats.takenDoses}</div>
              <div className="text-green-300 font-medium">Doses Taken</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full" style={{width: stats.totalDoses > 0 ? `${(stats.takenDoses / stats.totalDoses) * 100}%` : '0%'}}></div>
          </div>
        </div>
      </div>

      {/* Adherence Rate Card */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transform hover:scale-105 hover:-translate-y-2 transition duration-500 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-2xl">
              <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-1">{stats.adherenceRate}%</div>
              <div className="text-purple-300 font-medium">Adherence Rate</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${
              stats.adherenceRate >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-400' :
              stats.adherenceRate >= 60 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
              'bg-gradient-to-r from-red-400 to-pink-400'
            }`} style={{width: `${stats.adherenceRate}%`}}></div>
          </div>
        </div>
      </div>

      {/* Overdue Doses Card */}
      <div className="group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
        <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 transform hover:scale-105 hover:-translate-y-2 transition duration-500 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-500/20 rounded-2xl">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white mb-1">{stats.overdueCount}</div>
              <div className="text-red-300 font-medium">Overdue Doses</div>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-400 to-pink-400 rounded-full" style={{width: stats.overdueCount > 0 ? '100%' : '0%'}}></div>
          </div>
        </div>
      </div>
    </div>

    {stats.nextDoses.length > 0 && (
      <div className="mt-8">
        <div className="flex items-center mb-6">
          <div className="h-1 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></div>
          <h3 className="text-2xl font-bold text-white">Upcoming Doses</h3>
        </div>
        <div className="grid gap-4">
          {stats.nextDoses.map((dose, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 flex justify-between items-center transform hover:scale-102 transition duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">{dose.medicine}</div>
                    <div className="text-gray-300">{dose.dose}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">
                    {dose.time.toLocaleString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {Math.ceil((dose.time - new Date()) / (1000 * 60 * 60))}h remaining
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {stats.adherenceRate < 80 && (
      <div className="mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-sm"></div>
        <div className="relative bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-yellow-400/30">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-yellow-500/20 rounded-xl mr-3">
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-yellow-300 font-bold text-lg">⚠️ Low Adherence Rate</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Your adherence rate is <span className="font-bold text-yellow-400">{stats.adherenceRate}%</span>. Try to take your medicines on time to improve your health outcomes.
          </p>
        </div>
      </div>
    )}
    </>
  );
};

export default Statistics;
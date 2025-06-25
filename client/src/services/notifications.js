class NotificationService {
  constructor() {
    this.checkPermission();
  }

  async checkPermission() {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    }
  }

  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  async sendNotification(title, options = {}) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        requireInteraction: true,
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
  }

  async sendMedicineReminder(medicine) {
    const title = 'Medicine Reminder';
    const body = `Time to take ${medicine.name} - ${medicine.dose}`;
    
    await this.sendNotification(title, {
      body,
      tag: `medicine-${medicine._id}`,
      data: { medicineId: medicine._id }
    });
  }

  async sendOverdueReminder(medicine) {
    const title = 'Medicine Overdue';
    const body = `${medicine.name} is overdue! Please take ${medicine.dose} as soon as possible.`;
    
    await this.sendNotification(title, {
      body,
      tag: `overdue-${medicine._id}`,
      data: { medicineId: medicine._id }
    });
  }

  checkForReminders(medicines) {
    const now = new Date();
    
    medicines.forEach(medicine => {
      medicine.schedule.forEach(scheduledTime => {
        const scheduledDate = new Date(scheduledTime);
        const timeDiff = Math.abs(now - scheduledDate);
        const fiveMinutes = 5 * 60 * 1000;
        
        // Check if it's time for medicine (within 5 minutes of scheduled time)
        if (timeDiff <= fiveMinutes && timeDiff > 0) {
          // Check if not already taken
          const wasTaken = medicine.takenHistory.some(taken => {
            const takenDate = new Date(taken);
            return Math.abs(takenDate - scheduledDate) < 30 * 60 * 1000; // 30 minutes window
          });
          
          if (!wasTaken) {
            this.sendMedicineReminder(medicine);
          }
        }
      });
    });
  }

  checkForOverdue(medicines) {
    const now = new Date();
    
    medicines.forEach(medicine => {
      medicine.schedule.forEach(scheduledTime => {
        const scheduledDate = new Date(scheduledTime);
        
        // Check if overdue (more than 30 minutes past scheduled time)
        if (now > scheduledDate && (now - scheduledDate) > 30 * 60 * 1000) {
          const wasTaken = medicine.takenHistory.some(taken => {
            const takenDate = new Date(taken);
            return Math.abs(takenDate - scheduledDate) < 30 * 60 * 1000;
          });
          
          if (!wasTaken) {
            this.sendOverdueReminder(medicine);
          }
        }
      });
    });
  }
}

export default new NotificationService(); 
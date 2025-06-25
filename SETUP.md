# MedTrack Setup Guide

## Quick Start

### Prerequisites
- Node.js (v14 or higher) - [Download here](https://nodejs.org/)
- MongoDB - [Download here](https://www.mongodb.com/try/download/community)
- Git (optional)

### Step 1: Install Dependencies

**Backend:**
```bash
cd "Med tracker/server"
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 2: Configure Environment

1. Create a `.env` file in the `Med tracker/server` directory
2. Add the following content:
```env
MONGO_URI=mongodb://localhost:27017/medtrack
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### Step 3: Start the Application

**Option 1: Using the provided scripts**
- Double-click `start-app.bat` (Windows)
- Or run `.\start-app.ps1` in PowerShell

**Option 2: Manual start**

Terminal 1 (Backend):
```bash
cd "Med tracker/server"
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm start
```

### Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in the .env file
   - Or kill the process using the port

2. **MongoDB connection error**
   - Make sure MongoDB is running
   - Check your connection string in .env

3. **npm install errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then run `npm install`

4. **React app not starting**
   - Make sure you're in the client directory
   - Check if all dependencies are installed

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Ensure all prerequisites are installed
3. Verify your .env configuration
4. Check the README.md for detailed documentation

## Features Overview

Once the app is running, you can:

✅ **Register/Login** - Create an account and sign in
✅ **Add Medicines** - Add your medications with schedules
✅ **Get Reminders** - Enable browser notifications
✅ **Track Progress** - Monitor adherence rates
✅ **View Statistics** - See your medicine history

## Next Steps

After setup, explore these features:
- Add your first medicine
- Set up notification permissions
- Customize your medicine schedule
- Track your adherence rate

Happy tracking! 🏥💊 
# MedTrack - Medicine Reminder and Tracker

A full-stack web application to manage medicine schedules and reminders, built with React.js frontend and Node.js backend with MongoDB.

## Features

### 🔐 User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes and API endpoints

### 💊 Medicine Management
- Add, edit, and delete medicines
- Set custom schedules (daily, twice daily)
- Track medicine doses and history
- Visual indicators for overdue medicines

### ⏰ Smart Reminders
- Browser notifications for medicine reminders
- Real-time overdue alerts
- Configurable reminder timing
- Automatic schedule generation

### 📊 Analytics & Tracking
- Medicine adherence rate calculation
- Dose tracking statistics
- Upcoming dose notifications
- Historical medicine intake data

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Intuitive dashboard interface
- Color-coded medicine status
- Mobile-friendly layout

## Tech Stack

### Frontend
- **React.js** - User interface framework
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Client-side routing
- **Browser Notifications API** - Reminder system

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
MedTrack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API and notification services
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── middleware/       # Authentication middleware
│   └── app.js           # Server entry point
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MedTrack
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Medicine Management
- `GET /api/medicine` - Get user's medicines
- `POST /api/medicine` - Add new medicine
- `PUT /api/medicine/:id` - Update medicine
- `DELETE /api/medicine/:id` - Delete medicine

## Usage

1. **Register/Login**: Create an account or sign in
2. **Add Medicines**: Click "Add Medicine" to add your medications
3. **Set Schedule**: Choose frequency and time for each medicine
4. **Get Reminders**: Enable browser notifications for medicine reminders
5. **Track Progress**: Monitor your adherence rate and medicine history

## Features in Detail

### Medicine Scheduling
- Supports daily and twice-daily schedules
- Automatic schedule generation for the next 7 days
- Flexible time selection for each dose

### Notification System
- Browser-based notifications
- Configurable reminder timing (5 minutes before scheduled time)
- Overdue alerts for missed doses
- Click notifications to focus the application

### Analytics Dashboard
- Real-time adherence rate calculation
- Dose tracking for the past week
- Upcoming dose notifications
- Visual indicators for medicine status

### Data Persistence
- Secure user data storage in MongoDB
- Medicine history tracking
- User-specific medicine lists
- Encrypted password storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for better health management** 
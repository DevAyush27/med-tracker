const dotenv = require('dotenv');
dotenv.config();

// Set default environment variables if not provided
if (!process.env.MONGO_URI) {
  process.env.MONGO_URI = 'mongodb://localhost:27017/medtracker';
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'your_super_secret_jwt_key_here_make_it_long_and_secure_2024';
}

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET configured:', !!process.env.JWT_SECRET);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const medicineRoutes = require('./routes/medicine');

const app = express();

  app.use(cors());
  app.use(express.json());

  // Placeholder for routes
  app.get('/', (req, res) => {
    res.send('MedTrack API Running');
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/medicine', medicineRoutes);

  const PORT = process.env.PORT || 5000;

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err)); 
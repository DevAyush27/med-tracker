  const dotenv = require('dotenv');
  dotenv.config();
  console.log('MONGO_URI:', process.env.MONGO_URI);
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
const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dose: { type: String, required: true },
  schedule: [{ type: Date, required: true }],
  takenHistory: [{
    date: { type: Date, required: true },
    status: { type: String, enum: ['taken', 'missed'], required: true }
  }],
});

module.exports = mongoose.model('Medicine', MedicineSchema); 
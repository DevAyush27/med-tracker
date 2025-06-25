const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dose: { type: String, required: true },
  schedule: [{ type: Date, required: true }],
  takenHistory: [{ type: Date }],
});

module.exports = mongoose.model('Medicine', MedicineSchema); 
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
  medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }],
});

module.exports = mongoose.model('User', UserSchema); 
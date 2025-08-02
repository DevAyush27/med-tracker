const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/medicine
// @desc    Add new medicine
// @access  Private
router.post('/', auth, async (req, res) => {
  const { name, dose, schedule } = req.body;
  try {
    const medicine = new Medicine({
      user: req.user.id,
      name,
      dose,
      schedule,
      takenHistory: [],
    });
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET /api/medicine
// @desc    Get all medicines for user (patients), all medicines (doctor/admin)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let medicines;
    if (req.user.role === 'doctor' || req.user.role === 'admin') {
      medicines = await Medicine.find();
    } else {
      medicines = await Medicine.find({ user: req.user.id });
    }
    res.json(medicines);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/medicine/:id
// @desc    Update a medicine
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, dose, schedule, takenHistory } = req.body;
  try {
    let medicine = await Medicine.findOne({ _id: req.params.id, user: req.user.id });
    if (!medicine) return res.status(404).json({ msg: 'Medicine not found' });
    medicine.name = name || medicine.name;
    medicine.dose = dose || medicine.dose;
    medicine.schedule = schedule || medicine.schedule;
    medicine.takenHistory = takenHistory || medicine.takenHistory;
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/medicine/:id
// @desc    Delete a medicine
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!medicine) return res.status(404).json({ msg: 'Medicine not found' });
    res.json({ msg: 'Medicine removed' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   POST /api/medicine/:id/mark
// @desc    Mark a scheduled dose as taken or missed
// @access  Private
router.post('/:id/mark', auth, async (req, res) => {
  const { date, status } = req.body; // date: ISO string, status: 'taken' or 'missed'
  if (!date || !['taken', 'missed'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid date or status' });
  }
  try {
    const medicine = await Medicine.findOne({ _id: req.params.id, user: req.user.id });
    if (!medicine) return res.status(404).json({ msg: 'Medicine not found' });
    medicine.takenHistory.push({ date: new Date(date), status });
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// @route   GET /api/medicine/analytics
// @desc    Get dosage analytics for the logged-in user
// @access  Private
router.get('/analytics', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user.id });
    let totalDoses = 0;
    let takenDoses = 0;
    const missedCount = {};
    medicines.forEach(med => {
      totalDoses += med.takenHistory.length;
      takenDoses += med.takenHistory.filter(h => h.status === 'taken').length;
      const missed = med.takenHistory.filter(h => h.status === 'missed').length;
      if (missed > 0) missedCount[med.name] = missed;
    });
    const completionRate = totalDoses ? (takenDoses / totalDoses) * 100 : 0;
    // Find most missed medicine(s)
    let mostMissed = null;
    let maxMissed = 0;
    for (const [name, count] of Object.entries(missedCount)) {
      if (count > maxMissed) {
        mostMissed = name;
        maxMissed = count;
      }
    }
    res.json({ completionRate, mostMissed, missedCount });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router; 
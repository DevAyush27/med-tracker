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
// @desc    Get all medicines for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user.id });
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

module.exports = router; 
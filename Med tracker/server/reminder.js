const cron = require('node-cron');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const mongoose = require('mongoose');
const Medicine = require('./models/Medicine');
const User = require('./models/User');
require('dotenv').config();

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Twilio setup
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const TWILIO_PHONE = process.env.TWILIO_PHONE;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Cron job: runs every minute
cron.schedule('* * * * *', async () => {
  const now = new Date();
  const inFiveMinutes = new Date(now.getTime() + 5 * 60000);
  // Find medicines scheduled in the next 5 minutes
  const medicines = await Medicine.find({
    schedule: { $gte: now, $lt: inFiveMinutes },
  }).populate('user');

  for (const med of medicines) {
    const user = med.user;
    const message = `Reminder: Take ${med.name} (${med.dose}) now.`;
    // Send email
    if (user.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Medicine Reminder',
        text: message,
      });
    }
    // Send SMS
    if (user.phone) {
      await twilioClient.messages.create({
        body: message,
        from: TWILIO_PHONE,
        to: user.phone,
      });
    }
  }
  if (medicines.length > 0) {
    console.log(`Reminders sent for ${medicines.length} medicines at ${now}`);
  }
}); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Student Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  college: { type: String, default: '' },
  city: { type: String, default: '' },
  role: { type: String, default: 'Student' },
  isPaid: { type: Boolean, default: false },
  enrolledAt: { type: Date, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

// Root health check
app.get('/', (req, res) => {
  res.status(200).send('Linux World Backend is live and running.');
});

// 1. Student Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, phone, email, college, city, role } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, message: 'Name, phone, and email are required.' });
    }

    let student = await Student.findOne({ phone });
    if (!student) {
      student = new Student({ name, phone, email, college, city, role });
      await student.save();
    }
    return res.status(200).json({ success: true, student });
  } catch (err) {
    console.error('Registration Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 2. Instant Payment Confirmation (Bypasses UTR verification completely)
app.post('/api/confirm-payment', async (req, res) => {
  try {
    const { phone } = req.body;
    let student = await Student.findOneAndUpdate(
      { phone },
      { isPaid: true, enrolledAt: new Date() },
      { new: true }
    );

    if (!student) {
      // Create record if directly paying
      student = new Student({
        name: 'Enrolled Student',
        phone: phone || `guest_${Date.now()}`,
        email: 'student@linuxworld.com',
        isPaid: true,
        enrolledAt: new Date()
      });
      await student.save();
    }

    return res.status(200).json({ success: true, student });
  } catch (err) {
    console.error('Confirm Payment Error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// 3. Check Direct Course Access
app.post('/api/check-access', async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Identifier is required.' });
    }

    const student = await Student.findOne({
      $or: [{ phone: identifier }, { email: identifier }],
      isPaid: true
    });

    if (!student) {
      return res.status(403).json({ success: false, message: 'No active paid enrollment found.' });
    }

    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Port & MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('CRITICAL: MongoDB connection error details:', err.message);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server listening on fallback port ${PORT} (DB connection pending)`);
    });
  });
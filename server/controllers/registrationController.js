const Student = require('../models/Student');
const Settings = require('../models/Settings');

// Register a new student or return existing record
exports.registerStudent = async (req, res) => {
  try {
    const { fullName, mobile, email, collegeName, currentStatus, city, message } = req.body;

    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const cleanMobile = mobile ? mobile.trim() : '';

    // If already registered with this email or mobile, return the existing student
    let existing = await Student.findOne({
      $or: [{ email: cleanEmail }, { mobile: cleanMobile }]
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Existing registration found.',
        student: existing
      });
    }

    // Generate random unique ID
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const registrationId = `LW-PY-2026-${randomSuffix}`;

    let fee = 3000;
    try {
      const settings = await Settings.findOne();
      if (settings && settings.courseFee) {
        fee = settings.courseFee;
      }
    } catch (_) {}

    const newStudent = new Student({
      registrationId,
      fullName: (fullName || 'Candidate').trim(),
      mobile: cleanMobile,
      email: cleanEmail,
      collegeName: (collegeName || 'N/A').trim(),
      currentStatus: currentStatus || 'Student',
      city: (city || 'Jaipur').trim(),
      message: (message || '').trim(),
      amount: fee,
      paymentStatus: 'PAYMENT_PENDING',
      registrationStatus: 'REGISTERED',
      courseStartDate: '15 September 2026'
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: 'Registration created successfully.',
      student: newStudent
    });
  } catch (error) {
    console.error('Registration 500 error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Database Error'
    });
  }
};

// Retrieve student details by registrationId
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findOne({ registrationId: req.params.id });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found.' });
    }
    return res.json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error fetching student.' });
  }
};

// One-time payment lookup so students never pay twice
exports.studentPortalLogin = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ success: false, message: 'Enter your registered mobile number or email.' });
    }

    const cleanInput = identifier.trim().toLowerCase();
    const student = await Student.findOne({
      $or: [{ email: cleanInput }, { mobile: cleanInput }, { registrationId: cleanInput.toUpperCase() }]
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No enrollment found with this detail. Please register first.'
      });
    }

    const isVerified = student.paymentStatus === 'PAYMENT_VERIFIED';
    return res.status(200).json({
      success: true,
      isVerified,
      student,
      message: isVerified ? 'Access granted.' : 'Registration found, but payment is pending.'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server lookup error.' });
  }
};
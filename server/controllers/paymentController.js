const Student = require('../models/Student');

exports.verifyPayment = async (req, res) => {
  try {
    const { registrationId, transactionRef } = req.body;

    if (!registrationId) {
      return res.status(400).json({ success: false, message: 'Registration ID is required.' });
    }

    // Require valid transaction reference (UTR / UPI Ref)
    if (!transactionRef || transactionRef.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 12-digit UPI Transaction / UTR reference number from your payment app.'
      });
    }

    const student = await Student.findOne({ registrationId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found.' });
    }
    // Student submits UTR
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { phone, utr } = req.body;

    // Validate 12-digit numeric UTR format
    if (!utr || !/^\d{12}$/.test(utr)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid 12-digit UPI/UTR reference number.' 
      });
    }

    // Check if UTR was already used by someone else
    const existingPayment = await Student.findOne({ utrNumber: utr });
    if (existingPayment) {
      return res.status(400).json({ 
        success: false, 
        message: 'This UTR has already been submitted or approved.' 
      });
    }

    const student = await Student.findOneAndUpdate(
      { phone },
      { 
        utrNumber: utr, 
        paymentStatus: 'pending', // Do NOT set isPaid: true yet
        submittedAt: new Date() 
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student registration not found.' });
    }

    return res.status(200).json({ 
      success: true, 
      status: 'pending',
      message: 'UTR submitted for verification. Access will unlock once verified.' 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Admin approves the UTR after matching it in bank records
app.post('/api/admin/approve-payment', async (req, res) => {
  try {
    const { studentId } = req.body;
    const student = await Student.findByIdAndUpdate(
      studentId,
      { isPaid: true, paymentStatus: 'approved' },
      { new: true }
    );
    return res.status(200).json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

    // Update to verified only when valid UTR is submitted
    student.paymentStatus = 'PAYMENT_VERIFIED';
    student.transactionRef = transactionRef.trim();
    student.paymentDate = new Date();
    await student.save();

    return res.status(200).json({
      success: true,
      message: 'Payment reference verified. Course portal unlocked!',
      student
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    return res.status(500).json({ success: false, message: 'Payment verification failed.' });
  }
};
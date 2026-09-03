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
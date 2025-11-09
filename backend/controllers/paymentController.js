// Payment controller for handling payment-related operations
import QRCode from 'qrcode';

// Store UPI ID in memory (in production, this would be in a database)
let upiId = process.env.UPI_ID || 'canteen@upi';

// Update UPI ID
export const updateUpiId = async (req, res) => {
  try {
    const { newUpiId } = req.body;
    
    if (!newUpiId) {
      return res.status(400).json({ message: 'UPI ID is required' });
    }
    
    upiId = newUpiId;
    
    res.json({ message: 'UPI ID updated successfully', upiId: upiId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current UPI ID
export const getUpiId = async (req, res) => {
  try {
    res.json({ upiId: upiId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// In-memory storage for payment records (in production, this would be a database)
let payments = [];

// Process a payment
export const processPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, paymentDetails } = req.body;
    
    // Validate required fields
    if (!orderId || !amount || !paymentMethod) {
      return res.status(400).json({ 
        message: 'Missing required fields: orderId, amount, and paymentMethod are required' 
      });
    }
    
    // Create payment record
    const payment = {
      id: `PAY-${Date.now()}`,
      orderId,
      amount,
      paymentMethod,
      paymentDetails: paymentDetails || {},
      status: 'completed', // In a real system, this would be 'pending' initially
      timestamp: new Date().toISOString()
    };
    
    // Store payment record
    payments.push(payment);
    
    // In a real system, you would integrate with actual payment gateways here
    // For now, we'll simulate a successful payment
    
    res.status(200).json({
      message: 'Payment processed successfully',
      paymentId: payment.id,
      status: 'completed'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = payments.find(p => p.id === paymentId);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json({
      paymentId: payment.id,
      orderId: payment.orderId,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments (for admin)
export const getAllPayments = async (req, res) => {
  try {
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate UPI QR code data
export const generateUpiQrCode = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    
    if (!orderId || !amount) {
      return res.status(400).json({ 
        message: 'Missing required fields: orderId and amount are required' 
      });
    }
    
    // Use the UPI ID from memory or environment variables
    const upiUrl = `upi://pay?pa=${upiId}&pn=Madras%20College%20Canteen&am=${amount}&cu=INR&tn=${orderId}`;
    
    // In a real implementation, you would provide your own QR code
    // For now, we'll generate a QR code but you can replace this with your own
    const qrCodeDataUrl = await QRCode.toDataURL(upiUrl);
    
    res.json({
      orderId,
      amount,
      upiId,
      upiUrl,
      qrCodeDataUrl // You can replace this with your own QR code
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Payment controller for handling payment-related operations
import QRCode from 'qrcode';

// Store payments in memory (in production, this would be in a database)
let payments = [];

// Store UPI ID in memory (in production, this would be in a database)
let upiId = process.env.UPI_ID || 'canteen@upi';

// Generate a unique order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `ORD-${timestamp}-${random}`;
};

// Generate a unique payment ID
const generatePaymentId = () => {
  const timestamp = Date.now().toString().slice(-5); // Last 5 digits of timestamp
  const random = Math.floor(100 + Math.random() * 900); // 3-digit random number
  return `PAY-${timestamp}-${random}`;
};

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

// Process a payment
export const processPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, cartItems } = req.body;
    
    // Validate required fields
    if (!amount || !paymentMethod) {
      return res.status(400).json({ 
        message: 'Missing required fields: amount and paymentMethod are required' 
      });
    }
    
    // Generate order ID if not provided
    const finalOrderId = orderId || generateOrderId();
    
    // Create payment record
    const payment = {
      id: generatePaymentId(),
      orderId: finalOrderId,
      amount,
      paymentMethod,
      cartItems: cartItems || [],
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
      orderId: payment.orderId,
      status: 'completed',
      receipt: {
        orderId: payment.orderId,
        paymentId: payment.id,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        items: payment.cartItems,
        timestamp: payment.timestamp,
        upiId: upiId
      }
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
      paymentMethod: payment.paymentMethod,
      receipt: {
        orderId: payment.orderId,
        paymentId: payment.id,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        items: payment.cartItems,
        timestamp: payment.timestamp,
        upiId: upiId
      }
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
    
    if (!amount) {
      return res.status(400).json({ 
        message: 'Missing required fields: amount is required' 
      });
    }
    
    // Generate order ID if not provided
    const finalOrderId = orderId || generateOrderId();
    
    // Use the UPI ID from memory or environment variables
    const upiUrl = `upi://pay?pa=${upiId}&pn=Madras%20College%20Canteen&am=${amount}&cu=INR&tn=${finalOrderId}`;
    
    // In a real implementation, you would provide your own QR code
    // For now, we'll generate a QR code but you can replace this with your own
    const qrCodeDataUrl = await QRCode.toDataURL(upiUrl);
    
    res.json({
      orderId: finalOrderId,
      amount,
      upiId,
      upiUrl,
      qrCodeDataUrl // You can replace this with your own QR code
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
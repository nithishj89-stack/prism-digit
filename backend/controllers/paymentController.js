// Payment controller for handling payment-related operations
import QRCode from 'qrcode';
import { getUpiId, updateUpiId, processPayment, getPaymentById, getAllPayments } from '../services/firebasePaymentService.js';

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
export const updateUpiIdController = async (req, res) => {
  try {
    const { newUpiId } = req.body;
    
    if (!newUpiId) {
      return res.status(400).json({ message: 'UPI ID is required' });
    }
    
    upiId = await updateUpiId(newUpiId);
    
    res.json({ message: 'UPI ID updated successfully', upiId: upiId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current UPI ID
export const getUpiIdController = async (req, res) => {
  try {
    const currentUpiId = await getUpiId();
    res.json({ upiId: currentUpiId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process a payment
export const processPaymentController = async (req, res) => {
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
    const paymentData = {
      id: generatePaymentId(),
      order_id: finalOrderId,
      amount,
      payment_method: paymentMethod,
      cart_items: cartItems || [],
      status: 'completed', // In a real system, this would be 'pending' initially
      timestamp: new Date().toISOString()
    };
    
    // Store payment record in Supabase
    const payment = await processPayment(paymentData);
    
    // In a real system, you would integrate with actual payment gateways here
    // For now, we'll simulate a successful payment
    
    res.status(200).json({
      message: 'Payment processed successfully',
      paymentId: payment.id,
      orderId: payment.order_id,
      status: 'completed',
      receipt: {
        orderId: payment.order_id,
        paymentId: payment.id,
        amount: payment.amount,
        paymentMethod: payment.payment_method,
        items: payment.cart_items,
        timestamp: payment.timestamp,
        upiId: upiId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment status
export const getPaymentStatusController = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await getPaymentById(paymentId);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json({
      paymentId: payment.id,
      orderId: payment.order_id,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.payment_method,
      receipt: {
        orderId: payment.order_id,
        paymentId: payment.id,
        amount: payment.amount,
        paymentMethod: payment.payment_method,
        items: payment.cart_items,
        timestamp: payment.timestamp,
        upiId: upiId
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payments (for admin)
export const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await getAllPayments();
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
    
    // Validate amount is a positive number
    if (amount <= 0) {
      return res.status(400).json({ 
        message: 'Amount must be a positive number' 
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
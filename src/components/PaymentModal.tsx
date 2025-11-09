import { useState, useEffect } from "react";
import { X, CreditCard, QrCode, CheckCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onPaymentSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Generate a random order ID
  useEffect(() => {
    if (isOpen) {
      setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [isOpen]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll assume all payments are successful
    setIsSuccess(true);
    setIsProcessing(false);
    
    // Call the success callback after a short delay
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  const generateQRCode = () => {
    // In a real implementation, this would generate a QR code with UPI payment details
    // For now, we'll return a mock QR code data URL
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzAwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+VVBJIFBSIFFSPC90ZXh0Pjwvc3ZnPg==";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-glass-bg/90 backdrop-blur-xl border border-glass-border rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-glass-bg rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {isSuccess ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              Order ID: {orderId}
            </p>
            <p className="text-lg mb-6">
              Amount: <span className="font-bold text-neon-cyan">₹{totalAmount}</span>
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-center">
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-medium">{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-neon-cyan">₹{totalAmount}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    paymentMethod === "card"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-glass-bg/50 hover:bg-glass-bg"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
                    paymentMethod === "upi"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-glass-bg/50 hover:bg-glass-bg"
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  UPI
                </button>
              </div>
              
              {paymentMethod === "card" ? (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="mb-6">
                    <img 
                      src={generateQRCode()} 
                      alt="UPI QR Code" 
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Scan this QR code with any UPI app to pay ₹{totalAmount}
                  </p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Or enter UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-glass-border">
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  `Pay ₹${totalAmount}`
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
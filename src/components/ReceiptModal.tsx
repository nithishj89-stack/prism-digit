import { useState, useEffect } from "react";
import { X, Printer, Download } from "lucide-react";

interface ReceiptItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface ReceiptData {
  orderId: string;
  paymentId: string;
  amount: number;
  paymentMethod: string;
  items: ReceiptItem[];
  timestamp: string;
  upiId?: string;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: ReceiptData;
}

const ReceiptModal = ({ isOpen, onClose, receiptData }: ReceiptModalProps) => {
  const [isPrinting, setIsPrinting] = useState(false);

  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    alert("In a real implementation, this would download a PDF receipt");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`bg-glass-bg/90 backdrop-blur-xl border border-glass-border rounded-2xl w-full max-w-md ${isPrinting ? 'print:block' : ''}`}>
        <div className="flex items-center justify-between p-6 border-b border-glass-border">
          <h2 className="text-2xl font-bold">Payment Receipt</h2>
          {!isPrinting && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-glass-bg rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Printer className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground">
              Thank you for your order
            </p>
          </div>
          
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">{receiptData.orderId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Payment ID</span>
              <span className="font-medium">{receiptData.paymentId}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium">{formatDate(receiptData.timestamp)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{receiptData.paymentMethod}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="space-y-3">
              {receiptData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-glass-border pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{receiptData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Tax</span>
              <span>₹0.00</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-neon-cyan">₹{receiptData.amount}</span>
            </div>
          </div>
          
          {receiptData.upiId && (
            <div className="mt-6 p-4 bg-gradient-primary/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">UPI ID</p>
              <p className="font-medium">{receiptData.upiId}</p>
            </div>
          )}
          
          {!isPrinting && (
            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePrint}
                className="flex-1 bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300"
              >
                <Printer className="w-5 h-5" />
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 bg-glass-bg/50 border border-glass-border text-foreground px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-muted/50 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
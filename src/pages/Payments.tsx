import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { CreditCard, Smartphone, Banknote, Check, QrCode, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type PaymentMethod = "card" | "upi" | "cash" | "qr";

const Payments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [customQrCode, setCustomQrCode] = useState(""); // For your uploaded QR code

  // Generate a random order ID
  useEffect(() => {
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
  }, []);

  // Generate QR code when QR payment method is selected
  useEffect(() => {
    if (selectedMethod === "qr" && !qrCodeDataUrl && !isGeneratingQr && !customQrCode) {
      generateQrCode();
    }
  }, [selectedMethod]);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const generateQrCode = async () => {
    setIsGeneratingQr(true);
    try {
      const response = await fetch('http://localhost:5000/api/payments/generate-upi-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount: total
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setQrCodeDataUrl(data.qrCodeDataUrl);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to generate QR code",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQr(false);
    }
  };

  // Function to handle custom QR code upload
  const handleCustomQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomQrCode(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePayment = () => {
    // For QR code payments, simulate real-time payment confirmation
    if (selectedMethod === "qr") {
      // Simulate payment processing
      setTimeout(() => {
        setShowSuccess(true);
        
        setTimeout(() => {
          localStorage.removeItem("cart");
          toast({
            title: "Payment Successful! 🎉",
            description: "Your order has been confirmed.",
          });
          navigate("/");
        }, 2000);
      }, 3000); // Simulate 3 seconds for payment confirmation
    } else {
      setShowSuccess(true);
      
      setTimeout(() => {
        localStorage.removeItem("cart");
        toast({
          title: "Payment Successful! 🎉",
          description: "Your order has been confirmed.",
        });
        navigate("/");
      }, 2000);
    }
  };

  const paymentMethods = [
    {
      id: "card" as PaymentMethod,
      name: "Card Payment",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Debit/Credit Card",
      gradient: "from-neon-purple to-neon-pink"
    },
    {
      id: "upi" as PaymentMethod,
      name: "UPI Payment",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Google Pay, PhonePe, Paytm",
      gradient: "from-neon-cyan to-neon-blue"
    },
    {
      id: "qr" as PaymentMethod,
      name: "QR Code Payment",
      icon: <QrCode className="w-6 h-6" />,
      description: "Scan QR to pay instantly",
      gradient: "from-neon-green to-neon-teal"
    },
    {
      id: "cash" as PaymentMethod,
      name: "Cash Payment",
      icon: <Banknote className="w-6 h-6" />,
      description: "Pay at counter",
      gradient: "from-accent to-secondary"
    }
  ];

  return (
    <div className="min-h-screen food-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Payment
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose your preferred payment method
            </p>
          </div>

          {/* Payment Amount */}
          <div className="bg-gradient-primary/10 backdrop-blur-xl border border-glass-border rounded-2xl p-8 mb-8 text-center">
            <p className="text-muted-foreground mb-2">Total Amount</p>
            <p className="text-5xl font-bold text-neon-cyan animate-glow-pulse">₹{total}</p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-6 rounded-2xl transition-all duration-300 ${
                  selectedMethod === method.id
                    ? "bg-gradient-to-r " + method.gradient + " text-primary-foreground shadow-glow"
                    : "bg-glass-bg/80 border border-glass-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedMethod === method.id ? "bg-white/20" : "bg-gradient-to-r " + method.gradient
                  }`}>
                    {method.icon}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-lg">{method.name}</h3>
                    <p className={selectedMethod === method.id ? "text-primary-foreground/80" : "text-muted-foreground"}>
                      {method.description}
                    </p>
                  </div>

                  {selectedMethod === method.id && (
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Payment Form */}
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 mb-8">
            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full bg-muted/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-muted/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-muted/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === "upi" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    className="w-full bg-muted/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-2">Or scan the QR code below</p>
                  <button 
                    onClick={() => setSelectedMethod("qr")}
                    className="inline-flex items-center gap-2 text-neon-cyan hover:underline"
                  >
                    <QrCode className="w-4 h-4" />
                    Use QR Code Payment
                  </button>
                </div>
              </div>
            )}

            {selectedMethod === "qr" && (
              <div className="text-center py-6">
                <div className="mb-6">
                  <div className="inline-block p-4 bg-white rounded-xl">
                    {isGeneratingQr ? (
                      <div className="w-48 h-48 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-neon-cyan" />
                      </div>
                    ) : customQrCode ? (
                      <img 
                        src={customQrCode} 
                        alt="Custom UPI Payment QR Code" 
                        className="w-48 h-48"
                      />
                    ) : qrCodeDataUrl ? (
                      <img 
                        src={qrCodeDataUrl} 
                        alt="UPI Payment QR Code" 
                        className="w-48 h-48"
                      />
                    ) : (
                      <div className="w-48 h-48 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <div className="text-center text-white">
                          <QrCode className="w-16 h-16 mx-auto mb-2" />
                          <p className="font-bold">UPI QR</p>
                          <p className="text-sm">₹{total}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Scan this QR code with any UPI app to pay ₹{total}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Order ID: {orderId}
                </p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Upload Your QR Code</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomQrUpload}
                    className="w-full bg-muted/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
                  <span>Waiting for payment confirmation...</span>
                </div>
              </div>
            )}

            {selectedMethod === "cash" && (
              <div className="text-center py-8">
                <Banknote className="w-16 h-16 mx-auto mb-4 text-neon-cyan" />
                <p className="text-muted-foreground">
                  Please pay ₹{total} at the counter when collecting your order.
                </p>
              </div>
            )}
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={selectedMethod === "qr"}
            className={`w-full px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 ${
              selectedMethod === "qr" 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-cyan"
            }`}
          >
            {selectedMethod === "cash" ? "Confirm Order" : 
             selectedMethod === "qr" ? "Waiting for Payment" : "Pay Now"}
          </button>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-glass-bg/90 backdrop-blur-xl border border-glass-border rounded-3xl p-12 text-center max-w-md mx-4 animate-scale-in">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
              <Check className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-muted-foreground text-lg">
              Your order has been confirmed. Thank you!
            </p>
          </div>
        </div>
      )}

      <footer className="bg-glass-bg/50 backdrop-blur-sm border-t border-glass-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2025 Madras College Canteen | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default Payments;

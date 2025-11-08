import { useState } from "react";
import Navigation from "@/components/Navigation";
import { CreditCard, Smartphone, Banknote, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type PaymentMethod = "card" | "upi" | "cash";

const Payments = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [showSuccess, setShowSuccess] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const total = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  const handlePayment = () => {
    setShowSuccess(true);
    
    setTimeout(() => {
      localStorage.removeItem("cart");
      toast({
        title: "Payment Successful! 🎉",
        description: "Your order has been confirmed.",
      });
      navigate("/");
    }, 2000);
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
      id: "cash" as PaymentMethod,
      name: "Cash Payment",
      icon: <Banknote className="w-6 h-6" />,
      description: "Pay at counter",
      gradient: "from-accent to-secondary"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            className="w-full bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
          >
            {selectedMethod === "cash" ? "Confirm Order" : "Pay Now"}
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
          © 2025 College Food Billing System | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default Payments;

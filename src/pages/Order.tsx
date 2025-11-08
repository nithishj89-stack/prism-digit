import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Plus, Minus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

const Order = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  };

  const updateQuantity = (id: number, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your order.",
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const comboSuggestions = [
    { name: "Cold Coffee + Brownie", discount: 10, emoji: "☕🍰" },
    { name: "Burger + Fries Combo", discount: 15, emoji: "🍔🍟" },
    { name: "Thali + Lassi", discount: 20, emoji: "🍽️🥤" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Your Order
            </h1>
            <p className="text-muted-foreground text-lg">
              Review and modify your order before checkout
            </p>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-muted-foreground opacity-50" />
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Add some delicious items from our menu!</p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:shadow-glow-cyan transition-all duration-300"
              >
                Browse Menu
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Items */}
              <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-neon-cyan" />
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all duration-300"
                    >
                      <div className="text-4xl">{item.emoji}</div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-muted-foreground">₹{item.price} each</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="text-xl font-bold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center hover:bg-muted/50 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right min-w-[5rem]">
                        <p className="text-xl font-bold text-neon-cyan">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Combo Suggestions */}
              <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">💡 Combo Suggestions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {comboSuggestions.map((combo, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-secondary/10 border border-glass-border rounded-xl text-center hover:shadow-glow-cyan transition-all duration-300"
                    >
                      <div className="text-3xl mb-2">{combo.emoji}</div>
                      <p className="font-medium mb-1">{combo.name}</p>
                      <p className="text-sm text-neon-cyan">Save ₹{combo.discount}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-gradient-primary/10 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-semibold">Total Amount</span>
                  <span className="text-4xl font-bold text-neon-cyan animate-glow-pulse">
                    ₹{total}
                  </span>
                </div>

                <Link
                  to="/payments"
                  className="w-full bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Proceed to Payment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-glass-bg/50 backdrop-blur-sm border-t border-glass-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2025 College Food Billing System | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default Order;

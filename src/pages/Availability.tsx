import Navigation from "@/components/Navigation";
import { Check, X, Clock } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  emoji: string;
  available: boolean;
  time: string;
}

const Availability = () => {
  const foodItems: FoodItem[] = [
    { id: 1, name: "Samosa", emoji: "🥟", available: true, time: "All Day" },
    { id: 2, name: "Veg Burger", emoji: "🍔", available: true, time: "All Day" },
    { id: 3, name: "French Fries", emoji: "🍟", available: true, time: "All Day" },
    { id: 4, name: "Paneer Roll", emoji: "🌯", available: false, time: "After 2 PM" },
    { id: 5, name: "Dal Rice Combo", emoji: "🍛", available: true, time: "12-3 PM" },
    { id: 6, name: "Chicken Biryani", emoji: "🍚", available: true, time: "12-3 PM" },
    { id: 7, name: "Veg Thali", emoji: "🍽️", available: true, time: "12-3 PM" },
    { id: 8, name: "Pasta", emoji: "🍝", available: false, time: "After 5 PM" },
    { id: 9, name: "Cold Coffee", emoji: "☕", available: true, time: "All Day" },
    { id: 10, name: "Mango Shake", emoji: "🥤", available: true, time: "All Day" },
    { id: 11, name: "Lemon Soda", emoji: "🍋", available: true, time: "All Day" },
    { id: 12, name: "Masala Chai", emoji: "🫖", available: true, time: "All Day" },
    { id: 13, name: "Ice Cream", emoji: "🍦", available: true, time: "All Day" },
    { id: 14, name: "Brownie", emoji: "🍰", available: false, time: "After 4 PM" },
    { id: 15, name: "Gulab Jamun", emoji: "🍮", available: true, time: "All Day" },
    { id: 16, name: "Fruit Salad", emoji: "🍇", available: true, time: "All Day" },
  ];

  const availableCount = foodItems.filter(item => item.available).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Food Availability
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Check what's available in our cafeteria today
            </p>
            
            <div className="inline-flex items-center gap-4 bg-glass-bg/80 backdrop-blur-sm border border-glass-border rounded-full px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse" />
                <span className="font-medium">{availableCount} Available</span>
              </div>
              <div className="w-px h-6 bg-glass-border" />
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="font-medium">{foodItems.length - availableCount} Out of Stock</span>
              </div>
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {foodItems.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-glass-bg/80 backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 hover:scale-105 animate-fade-in ${
                  item.available
                    ? "border-neon-cyan/30 hover:shadow-glow-cyan"
                    : "border-glass-border opacity-60"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="text-6xl mb-4">{item.emoji}</div>
                
                <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium ${
                  item.available
                    ? "bg-neon-cyan/20 text-neon-cyan"
                    : "bg-destructive/20 text-destructive"
                }`}>
                  {item.available ? (
                    <>
                      <Check className="w-5 h-5" />
                      Available
                    </>
                  ) : (
                    <>
                      <X className="w-5 h-5" />
                      Out of Stock
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Info Card */}
          <div className="mt-12 max-w-3xl mx-auto bg-gradient-primary/10 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-6 h-6 text-neon-cyan" />
              Cafeteria Timings
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p className="font-medium text-foreground mb-1">Breakfast</p>
                <p>8:00 AM - 10:00 AM</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Lunch</p>
                <p>12:00 PM - 3:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Snacks</p>
                <p>4:00 PM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Dinner</p>
                <p>7:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
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

export default Availability;

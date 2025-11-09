import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Plus, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Category = "All" | "Snacks" | "Meals" | "Beverages" | "Desserts";

interface FoodItem {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
  emoji: string;
  available?: boolean;
}

interface Recommendation {
  name: string;
  items: FoodItem[];
  discount: number;
}

const Menu = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch food data from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/foods');
        const foods = await response.json();
        setFoodItems(foods);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching foods:', error);
        // Fallback to localStorage if API fails
        const saved = localStorage.getItem("foodAvailability");
        const foodAvailability = saved ? JSON.parse(saved) : {};
        
        const baseFoodItems: Omit<FoodItem, 'available'>[] = [
          { id: 1, name: "Samosa", category: "Snacks", price: 20, image: "", emoji: "🥟" },
          { id: 2, name: "Veg Burger", category: "Snacks", price: 40, image: "", emoji: "🍔" },
          { id: 3, name: "French Fries", category: "Snacks", price: 30, image: "", emoji: "🍟" },
          { id: 4, name: "Paneer Roll", category: "Snacks", price: 50, image: "", emoji: "🌯" },
          { id: 5, name: "Dal Rice Combo", category: "Meals", price: 80, image: "", emoji: "🍛" },
          { id: 6, name: "Chicken Biryani", category: "Meals", price: 120, image: "", emoji: "🍚" },
          { id: 7, name: "Veg Thali", category: "Meals", price: 100, image: "", emoji: "🍽️" },
          { id: 8, name: "Pasta", category: "Meals", price: 90, image: "", emoji: "🍝" },
          { id: 9, name: "Cold Coffee", category: "Beverages", price: 50, image: "", emoji: "☕" },
          { id: 10, name: "Mango Shake", category: "Beverages", price: 60, image: "", emoji: "🥤" },
          { id: 11, name: "Lemon Soda", category: "Beverages", price: 30, image: "", emoji: "🍋" },
          { id: 12, name: "Masala Chai", category: "Beverages", price: 20, image: "", emoji: "🫖" },
          { id: 13, name: "Ice Cream", category: "Desserts", price: 40, image: "", emoji: "🍦" },
          { id: 14, name: "Brownie", category: "Desserts", price: 60, image: "", emoji: "🍰" },
          { id: 15, name: "Gulab Jamun", category: "Desserts", price: 30, image: "", emoji: "🍮" },
          { id: 16, name: "Fruit Salad", category: "Desserts", price: 50, image: "", emoji: "🍇" },
        ];
        
        const fallbackFoodItems: FoodItem[] = baseFoodItems.map(item => ({
          ...item,
          available: foodAvailability[item.id] !== undefined ? foodAvailability[item.id] : true
        }));
        
        setFoodItems(fallbackFoodItems);
        setLoading(false);
      }
    };
    
    fetchFoods();
  }, []);

  // Generate random food combinations for today's recommendations
  const generateRecommendations = () => {
    if (foodItems.length === 0) return [];
    
    const availableItems = foodItems.filter(item => item.available !== false);
    const snacks = availableItems.filter(item => item.category === "Snacks");
    const meals = availableItems.filter(item => item.category === "Meals");
    const beverages = availableItems.filter(item => item.category === "Beverages");
    const desserts = availableItems.filter(item => item.category === "Desserts");

    // Create random combinations
    const combinations = [
      {
        name: "Snack Combo",
        items: [
          snacks.length > 0 ? snacks[Math.floor(Math.random() * snacks.length)] : foodItems[0],
          beverages.length > 0 ? beverages[Math.floor(Math.random() * beverages.length)] : foodItems[8]
        ],
        discount: 10
      },
      {
        name: "Meal Deal",
        items: [
          meals.length > 0 ? meals[Math.floor(Math.random() * meals.length)] : foodItems[4],
          beverages.length > 0 ? beverages[Math.floor(Math.random() * beverages.length)] : foodItems[8]
        ],
        discount: 15
      },
      {
        name: "Sweet Treat",
        items: [
          desserts.length > 0 ? desserts[Math.floor(Math.random() * desserts.length)] : foodItems[12],
          beverages.length > 0 ? beverages[Math.floor(Math.random() * beverages.length)] : foodItems[8]
        ],
        discount: 5
      }
    ];

    return combinations;
  };

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Update recommendations when food items change
  useEffect(() => {
    if (foodItems.length > 0 && recommendations.length === 0) {
      setRecommendations(generateRecommendations());
    }
  }, [foodItems, recommendations.length]);

  const categories: Category[] = ["All", "Snacks", "Meals", "Beverages", "Desserts"];

  const filteredItems = selectedCategory === "All"
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  const addToOrder = (item: FoodItem) => {
    // Check if item is available
    if (item.available === false) {
      toast({
        title: "Item Unavailable 😔",
        description: `${item.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = existingCart.find((cartItem: any) => cartItem.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    toast({
      title: "Added to Order! 🎉",
      description: `${item.name} has been added to your order.`,
    });
  };

  return (
    <div className="min-h-screen food-background-pizza">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Our Menu
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose from our delicious selection of food items
            </p>
          </div>

          {/* Today's Recommendations */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
              Today's Recommendations
            </h2>
            {recommendations.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.map((combo, idx) => (
                  <div 
                    key={idx}
                    className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-center">{combo.name}</h3>
                    <div className="space-y-3 mb-4">
                      {combo.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <span>{item.name}</span>
                          </div>
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold text-lg">
                        ₹{combo.items.reduce((sum: number, item: any) => sum + item.price, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-400 font-medium">{combo.discount}% Off</span>
                      <span className="font-bold text-neon-cyan text-lg">
                        ₹{Math.round(combo.items.reduce((sum: number, item: any) => sum + item.price, 0) * (1 - combo.discount/100))}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        combo.items.forEach((item: any) => addToOrder(item));
                        toast({
                          title: "Combo Added! 🎉",
                          description: `${combo.name} has been added to your order with ${combo.discount}% discount.`,
                        });
                      }}
                      className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300"
                    >
                      Add Combo to Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading recommendations...</p>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "bg-glass-bg/80 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-glass-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Food Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`bg-glass-bg/80 backdrop-blur-xl border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in group ${
                  item.available === false ? 'opacity-60 border-glass-border' : 'border-neon-cyan/30'
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.emoji}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                  <span className="text-2xl font-bold text-neon-cyan">₹{item.price}</span>
                </div>

                {item.available === false ? (
                  <button
                    disabled
                    className="w-full bg-destructive/20 text-destructive px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => addToOrder(item)}
                    className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Add to Order
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-glass-bg/50 backdrop-blur-sm border-t border-glass-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2025 Madras College Canteen | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default Menu;

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { TrendingUp, ShoppingCart, DollarSign, Users, Star, Clock, Check, X, QrCode } from "lucide-react";

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [upiId, setUpiId] = useState("");
  const [newUpiId, setNewUpiId] = useState("");

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem("adminAuthenticated");
    const token = localStorage.getItem("adminToken");
    if (auth === "true" && token) {
      setIsAdminAuthenticated(true);
      setAuthToken(token);
    }
  }, []);

  // Fetch food items when authenticated
  useEffect(() => {
    if (isAdminAuthenticated && authToken) {
      fetchFoodItems();
      fetchUpiId();
    }
  }, [isAdminAuthenticated, authToken]);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/foods', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const foods = await response.json();
      setFoodItems(foods);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const fetchUpiId = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/upi-id');
      const data = await response.json();
      setUpiId(data.upiId);
      setNewUpiId(data.upiId);
    } catch (error) {
      console.error('Error fetching UPI ID:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAdminAuthenticated(true);
        setAuthToken(data.token);
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminToken", data.token);
        setError("");
      } else {
        setError(data.message || "Invalid password. Please try again.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setPassword("");
    setAuthToken("");
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminToken");
  };

  // If not authenticated, show login form
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen food-background flex items-center justify-center">
        <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-destructive text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium hover:shadow-glow transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = [
    { label: "Total Sales", value: "₹24,580", icon: <DollarSign className="w-8 h-8" />, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
    { label: "Total Orders", value: "322", icon: <ShoppingCart className="w-8 h-8" />, color: "text-neon-purple", bg: "bg-neon-purple/10" },
    { label: "Active Customers", value: "148", icon: <Users className="w-8 h-8" />, color: "text-neon-pink", bg: "bg-neon-pink/10" },
    { label: "Avg Rating", value: "4.6", icon: <Star className="w-8 h-8" />, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  const popularItems = [
    { name: "Veg Burger", emoji: "🍔", orders: 89, revenue: 3560 },
    { name: "Chicken Biryani", emoji: "🍚", orders: 76, revenue: 9120 },
    { name: "Cold Coffee", emoji: "☕", orders: 142, revenue: 7100 },
    { name: "Samosa", emoji: "🥟", orders: 156, revenue: 3120 },
    { name: "Veg Thali", emoji: "🍽️", orders: 64, revenue: 6400 },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Rahul Sharma", items: 3, amount: 240, time: "2 mins ago", status: "Completed" },
    { id: "#ORD-002", customer: "Priya Singh", items: 2, amount: 180, time: "5 mins ago", status: "Preparing" },
    { id: "#ORD-003", customer: "Amit Kumar", items: 5, amount: 420, time: "8 mins ago", status: "Completed" },
    { id: "#ORD-004", customer: "Sneha Patel", items: 1, amount: 120, time: "12 mins ago", status: "Delivered" },
  ];

  const updateUpiId = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/update-upi-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ newUpiId })
      });

      const data = await response.json();
      
      if (response.ok) {
        setUpiId(newUpiId);
        // Show success message
      } else {
        // Show error message
      }
    } catch (error) {
      console.error('Error updating UPI ID:', error);
    }
  };

  // Update food availability
  const updateFoodAvailability = async (id: string, available: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/foods/${id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ available: !available })
      });
      
      if (response.ok) {
        // Update local state
        setFoodItems(foodItems.map(item => 
          item._id === id ? { ...item, available: !available } : item
        ));
      }
    } catch (error) {
      console.error('Error updating food availability:', error);
    }
  };

  return (
    <div className="min-h-screen food-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground text-lg">
                  Monitor your cafeteria performance and analytics
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-destructive/20 text-destructive px-4 py-2 rounded-full font-medium hover:bg-destructive/30 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`${stat.bg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <p className="text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Popular Items */}
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-neon-cyan" />
                Most Popular Items
              </h2>
              <div className="space-y-4">
                {popularItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div className="text-4xl">{item.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-neon-cyan text-xl">₹{item.revenue}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-neon-purple" />
                Recent Orders
              </h2>
              <div className="space-y-4">
                {recentOrders.map((order, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Completed" ? "bg-neon-cyan/20 text-neon-cyan" :
                        order.status === "Preparing" ? "bg-neon-purple/20 text-neon-purple" :
                        "bg-neon-pink/20 text-neon-pink"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{order.items} items • {order.time}</span>
                      <span className="font-bold text-neon-cyan">₹{order.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Chart Placeholder */}
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Sales Overview</h2>
            <div className="h-64 flex items-center justify-center bg-gradient-primary/5 rounded-xl">
              <p className="text-muted-foreground">Chart visualization area</p>
            </div>
          </div>

          {/* Food Availability Management */}
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6">Food Availability Management</h2>
            <p className="text-muted-foreground mb-6">Manage which food items are available for ordering</p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
              {loading ? (
                <div className="col-span-full text-center py-8">
                  <p>Loading food items...</p>
                </div>
              ) : (
                foodItems.map((item) => (
                  <div 
                    key={item._id}
                    className="bg-glass-bg/50 backdrop-blur-sm border border-glass-border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateFoodAvailability(item._id, item.available)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        item.available !== false
                          ? "bg-neon-cyan/20 text-neon-cyan"
                          : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {item.available !== false ? (
                        <>
                          <Check className="w-4 h-4" />
                          Available
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4" />
                          Unavailable
                        </>
                      )}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8 mt-8">
            <h2 className="text-2xl font-semibold mb-6">Payment Settings</h2>
            <p className="text-muted-foreground mb-6">Manage UPI ID and QR code for payments</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Current UPI ID</label>
                <p className="text-lg font-medium">{upiId}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Update UPI ID</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="flex-1 bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  />
                  <button
                    onClick={updateUpiId}
                    className="bg-gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all duration-300"
                  >
                    Update
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Upload Custom QR Code</label>
                <p className="text-muted-foreground text-sm mb-2">Upload your own QR code image for UPI payments</p>
                <div className="border-2 border-dashed border-glass-border rounded-xl p-8 text-center">
                  <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Drag and drop your QR code image here, or click to browse</p>
                  <button className="bg-glass-bg/50 border border-glass-border px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors">
                    Select Image
                  </button>
                </div>
              </div>
            </div>
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

export default Admin;

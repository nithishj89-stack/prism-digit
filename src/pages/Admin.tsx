import Navigation from "@/components/Navigation";
import { TrendingUp, ShoppingCart, DollarSign, Users, Star, Clock } from "lucide-react";

const Admin = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitor your cafeteria performance and analytics
            </p>
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

export default Admin;

import Navigation from "@/components/Navigation";
import { Star, TrendingUp } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  rollNo: string;
  department: string;
  totalOrders: number;
  totalSpent: number;
  rating: number;
  lastOrder: string;
}

const Customers = () => {
  const customers: Customer[] = [
    { id: 1, name: "Rahul Sharma", rollNo: "CS2101", department: "Computer Science", totalOrders: 45, totalSpent: 3240, rating: 5, lastOrder: "2 hours ago" },
    { id: 2, name: "Priya Singh", rollNo: "EC2045", department: "Electronics", totalOrders: 38, totalSpent: 2890, rating: 4.5, lastOrder: "5 hours ago" },
    { id: 3, name: "Amit Kumar", rollNo: "ME2089", department: "Mechanical", totalOrders: 52, totalSpent: 4120, rating: 5, lastOrder: "1 day ago" },
    { id: 4, name: "Sneha Patel", rollNo: "CS2156", department: "Computer Science", totalOrders: 29, totalSpent: 2150, rating: 4, lastOrder: "3 hours ago" },
    { id: 5, name: "Vikram Reddy", rollNo: "EE2034", department: "Electrical", totalOrders: 41, totalSpent: 3580, rating: 5, lastOrder: "6 hours ago" },
    { id: 6, name: "Anjali Verma", rollNo: "CE2067", department: "Civil", totalOrders: 33, totalSpent: 2670, rating: 4.5, lastOrder: "1 day ago" },
    { id: 7, name: "Rohan Gupta", rollNo: "MB2012", department: "MBA", totalOrders: 48, totalSpent: 3950, rating: 5, lastOrder: "4 hours ago" },
    { id: 8, name: "Sakshi Jain", rollNo: "CS2198", department: "Computer Science", totalOrders: 36, totalSpent: 2840, rating: 4, lastOrder: "8 hours ago" },
  ];

  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const totalOrders = customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Customers
            </h1>
            <p className="text-muted-foreground text-lg">
              View all customer orders and ratings
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <p className="text-muted-foreground mb-2">Total Customers</p>
              <p className="text-4xl font-bold text-neon-cyan">{customers.length}</p>
            </div>
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <p className="text-muted-foreground mb-2">Total Orders</p>
              <p className="text-4xl font-bold text-neon-purple">{totalOrders}</p>
            </div>
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <p className="text-muted-foreground mb-2">Total Revenue</p>
              <p className="text-4xl font-bold text-neon-pink">₹{totalRevenue}</p>
            </div>
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 flex items-center gap-3">
              <TrendingUp className="w-12 h-12 text-neon-cyan" />
              <div>
                <p className="text-muted-foreground">Avg Rating</p>
                <p className="text-3xl font-bold">4.6⭐</p>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Roll No</th>
                    <th className="px-6 py-4 text-left font-semibold">Department</th>
                    <th className="px-6 py-4 text-left font-semibold">Orders</th>
                    <th className="px-6 py-4 text-left font-semibold">Total Spent</th>
                    <th className="px-6 py-4 text-left font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left font-semibold">Last Order</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, idx) => (
                    <tr
                      key={customer.id}
                      className="border-t border-glass-border hover:bg-muted/20 transition-colors animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <td className="px-6 py-4 font-medium">{customer.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{customer.rollNo}</td>
                      <td className="px-6 py-4 text-muted-foreground">{customer.department}</td>
                      <td className="px-6 py-4">
                        <span className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded-full text-sm font-medium">
                          {customer.totalOrders}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-neon-cyan">₹{customer.totalSpent}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{customer.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{customer.lastOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default Customers;

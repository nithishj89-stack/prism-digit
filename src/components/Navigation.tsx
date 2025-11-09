import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Check user authentication status
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, []);

  const handleLogout = async () => {
    try {
      // Send logout request to backend
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear localStorage
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("adminAuthenticated");
      localStorage.removeItem("adminToken");

      // Update state
      setUserType(null);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const links = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/menu", label: "Menu", icon: "🍕" },
    { path: "/order", label: "Your Order", icon: "🧾" },
    { path: "/payments", label: "Payments", icon: "💳" },
    { path: "/profile", label: "My Details", icon: "👤" },
    { path: "/availability", label: "Availability", icon: "🍽️" },
    { path: "/customers", label: "Customers", icon: "🧑‍🤝‍🧑" },
    { path: "/admin", label: "Admin", icon: "🔐" },
    { path: "/offers", label: "Offers", icon: "🍰" },
    { path: "/gallery", label: "Gallery", icon: "📸" },
    { path: "/contact", label: "Contact", icon: "📞" },
  ];

  // Filter links based on user type
  const filteredLinks = links.filter(link => {
    // Hide admin link for non-admin users
    if (link.path === "/admin") {
      return userType === "admin" || localStorage.getItem("adminAuthenticated") === "true";
    }
    // Show all other links to everyone
    return true;
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass-bg/80 backdrop-blur-xl border-b border-glass-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-4 overflow-x-auto">
          {filteredLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                location.pathname === link.path
                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          
          {/* Logout button for authenticated users */}
          {userType && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-muted/50 ml-auto"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

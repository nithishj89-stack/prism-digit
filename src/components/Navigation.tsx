import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass-bg/80 backdrop-blur-xl border-b border-glass-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 py-4 overflow-x-auto">
          {links.map((link) => (
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

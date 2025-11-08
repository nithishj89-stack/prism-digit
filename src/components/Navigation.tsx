import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Calculator", icon: "🔢" },
    { path: "/snake", label: "Snake Game", icon: "🐍" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-full px-2 py-2 shadow-elevated">
        <div className="flex gap-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
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

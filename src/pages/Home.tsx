import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ArrowRight, UtensilsCrossed, Clock, Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen food-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-glow opacity-50 animate-float blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-secondary opacity-30 animate-float blur-3xl" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-glass-bg/50 backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
              <UtensilsCrossed className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm font-medium">Madras College Canteen</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-glow-pulse">
              Delicious Food,
              <br />
              Easy Billing
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience seamless food ordering and billing for your college cafeteria. 
              Quick, convenient, and designed for students.
            </p>

            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold shadow-glow hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              {
                icon: <Clock className="w-8 h-8 text-neon-cyan" />,
                title: "Quick Ordering",
                description: "Order your favorite meals in seconds"
              },
              {
                icon: <UtensilsCrossed className="w-8 h-8 text-neon-purple" />,
                title: "Fresh & Tasty",
                description: "Quality food made with love"
              },
              {
                icon: <Shield className="w-8 h-8 text-neon-pink" />,
                title: "Secure Payments",
                description: "Multiple payment options available"
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="bg-gradient-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-glass-bg/50 backdrop-blur-sm border-t border-glass-border py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2025 Madras College Canteen | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default Home;

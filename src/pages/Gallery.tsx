import Navigation from "@/components/Navigation";
import { Camera } from "lucide-react";

const Gallery = () => {
  const images = [
    { id: 1, emoji: "🍔", title: "Delicious Burgers", category: "Snacks" },
    { id: 2, emoji: "🍕", title: "Fresh Pizza", category: "Meals" },
    { id: 3, emoji: "🍚", title: "Chicken Biryani", category: "Meals" },
    { id: 4, emoji: "☕", title: "Hot Coffee", category: "Beverages" },
    { id: 5, emoji: "🍰", title: "Sweet Treats", category: "Desserts" },
    { id: 6, emoji: "🥤", title: "Fresh Juices", category: "Beverages" },
    { id: 7, emoji: "🍝", title: "Pasta Special", category: "Meals" },
    { id: 8, emoji: "🍟", title: "Crispy Fries", category: "Snacks" },
    { id: 9, emoji: "🍦", title: "Ice Cream", category: "Desserts" },
    { id: 10, emoji: "🌯", title: "Wraps & Rolls", category: "Snacks" },
    { id: 11, emoji: "🍛", title: "Curry Combo", category: "Meals" },
    { id: 12, emoji: "🥟", title: "Samosas", category: "Snacks" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-glass-bg/50 backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
              <Camera className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm font-medium">Food Gallery</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Our Gallery
            </h1>
            <p className="text-muted-foreground text-lg">
              Feast your eyes on our delicious offerings
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, idx) => (
              <div
                key={image.id}
                className="group relative bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl overflow-hidden hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in aspect-square"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-primary opacity-10 group-hover:opacity-20 transition-opacity" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {image.emoji}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-center mb-2">{image.title}</h3>
                  
                  <span className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {image.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                  <Camera className="w-12 h-12 text-primary-foreground" />
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8">
              <Camera className="w-16 h-16 mx-auto mb-4 text-neon-cyan" />
              <h2 className="text-2xl font-bold mb-4">Share Your Food Moments</h2>
              <p className="text-muted-foreground mb-6">
                Tag us with your favorite food photos from our cafeteria and get featured in our gallery!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full font-medium">
                  #CollegeFoodBilling
                </span>
                <span className="bg-gradient-secondary text-primary-foreground px-4 py-2 rounded-full font-medium">
                  #CafeteriaEats
                </span>
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

export default Gallery;

import Navigation from "@/components/Navigation";
import { Percent, Clock, Sparkles } from "lucide-react";

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  emoji: string;
  validUntil: string;
  gradient: string;
}

const Offers = () => {
  const offers: Offer[] = [
    {
      id: 1,
      title: "Lunch Combo Deal",
      description: "Get any meal + beverage combo",
      discount: "20% OFF",
      emoji: "🍽️",
      validUntil: "Valid till 3 PM",
      gradient: "from-neon-cyan to-neon-blue"
    },
    {
      id: 2,
      title: "Student Special",
      description: "Show your ID for instant discount",
      discount: "15% OFF",
      emoji: "🎓",
      validUntil: "All Day",
      gradient: "from-neon-purple to-neon-pink"
    },
    {
      id: 3,
      title: "Evening Snacks",
      description: "Buy 2 snacks, get 1 free",
      discount: "BOGO",
      emoji: "🍟",
      validUntil: "4 PM - 6 PM",
      gradient: "from-accent to-secondary"
    },
    {
      id: 4,
      title: "Beverage Blast",
      description: "All cold drinks and shakes",
      discount: "₹10 OFF",
      emoji: "🥤",
      validUntil: "All Day",
      gradient: "from-neon-blue to-neon-cyan"
    },
    {
      id: 5,
      title: "Weekend Special",
      description: "Premium biryani at special price",
      discount: "25% OFF",
      emoji: "🍚",
      validUntil: "Sat & Sun Only",
      gradient: "from-neon-pink to-accent"
    },
    {
      id: 6,
      title: "Dessert Delight",
      description: "Sweet treats for sweet prices",
      discount: "₹20 OFF",
      emoji: "🍰",
      validUntil: "After 5 PM",
      gradient: "from-neon-purple to-neon-blue"
    },
  ];

  const dailyDeals = [
    { day: "Monday", deal: "Free Chai with any meal", emoji: "🫖" },
    { day: "Tuesday", deal: "₹10 off on all burgers", emoji: "🍔" },
    { day: "Wednesday", deal: "Buy 1 Get 1 on desserts", emoji: "🍦" },
    { day: "Thursday", deal: "Combo meal at ₹99", emoji: "🍱" },
    { day: "Friday", deal: "20% off on beverages", emoji: "☕" },
  ];

  return (
    <div className="min-h-screen food-background">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-glass-bg/50 backdrop-blur-sm border border-glass-border rounded-full px-6 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-neon-cyan" />
              <span className="text-sm font-medium">Limited Time Offers</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Special Offers
            </h1>
            <p className="text-muted-foreground text-lg">
              Grab these amazing deals before they're gone!
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {offers.map((offer, idx) => (
              <div
                key={offer.id}
                className="group relative bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 hover:shadow-elevated transition-all duration-300 hover:scale-105 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <div className="relative">
                  {/* Discount Badge */}
                  <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${offer.gradient} text-primary-foreground px-4 py-2 rounded-full font-bold text-lg shadow-glow animate-glow-pulse`}>
                    {offer.discount}
                  </div>

                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {offer.emoji}
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-muted-foreground mb-4">{offer.description}</p>

                  <div className="flex items-center gap-2 text-sm text-neon-cyan">
                    <Clock className="w-4 h-4" />
                    {offer.validUntil}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Deals */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <Percent className="w-8 h-8 text-neon-purple" />
                Daily Deals
              </h2>
              <p className="text-muted-foreground">Something special every day of the week!</p>
            </div>

            <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6">
              <div className="space-y-4">
                {dailyDeals.map((deal, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="text-4xl">{deal.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{deal.day}</h3>
                      <p className="text-muted-foreground">{deal.deal}</p>
                    </div>
                    <div className="bg-gradient-primary px-4 py-2 rounded-full text-primary-foreground font-medium text-sm">
                      Active
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-12 bg-gradient-primary/10 backdrop-blur-xl border border-glass-border rounded-2xl p-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-neon-cyan" />
            <h3 className="text-2xl font-bold mb-2">More Offers Coming Soon!</h3>
            <p className="text-muted-foreground">
              Keep checking back for new exciting deals and discounts
            </p>
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

export default Offers;

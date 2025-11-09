import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const FacultyLogin = () => {
  const [facultyId, setFacultyId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send login request to backend
      const response = await fetch('http://localhost:5000/api/auth/faculty/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ facultyId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store login status in localStorage
        localStorage.setItem("userType", "faculty");
        localStorage.setItem("userId", data.user.uid);
        localStorage.setItem("userEmail", data.user.email);
        
        // Redirect to menu page
        navigate("/menu");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen food-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Faculty Login
              </h1>
              <p className="text-muted-foreground">
                Login with your faculty credentials
              </p>
            </div>

            {error && (
              <div className="bg-destructive/20 text-destructive border border-destructive/30 rounded-lg p-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="facultyId" className="block text-sm font-medium mb-2">
                  Faculty ID
                </label>
                <input
                  type="text"
                  id="facultyId"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="Enter your faculty ID"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Example: FAC12345</p>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="Enter your password"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">Must be at least 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Student?{" "}
                <Link to="/student-login" className="text-neon-cyan hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-glass-bg/50 backdrop-blur-sm border-t border-glass-border py-6 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2025 Madras College Canteen | Designed with ❤️ in Lovable AI
        </div>
      </footer>
    </div>
  );
};

export default FacultyLogin;
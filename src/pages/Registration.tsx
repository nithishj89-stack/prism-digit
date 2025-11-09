import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Registration = () => {
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  const [studentId, setStudentId] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (userType === "student" && !studentId) {
      setError("Student ID is required");
      setLoading(false);
      return;
    }

    if (userType === "faculty" && !facultyId) {
      setError("Faculty ID is required");
      setLoading(false);
      return;
    }

    if (!name) {
      setError("Name is required");
      setLoading(false);
      return;
    }

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Send registration request to backend
      const response = await fetch(`http://localhost:5000/api/auth/${userType}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          [userType === "student" ? "studentId" : "facultyId"]: userType === "student" ? studentId : facultyId,
          name,
          email,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Clear form
        setStudentId("");
        setFacultyId("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate(userType === "student" ? "/student-login" : "/faculty-login");
        }, 2000);
      } else {
        // Provide more specific error messages
        if (data.error && data.error.includes('auth/operation-not-allowed')) {
          setError("Registration is currently disabled. Please contact the administrator.");
        } else if (data.error && data.error.includes('auth/email-already-in-use')) {
          setError("An account with this email already exists. Please use a different email or login instead.");
        } else if (data.error && data.error.includes('auth/invalid-email')) {
          setError("Please enter a valid email address.");
        } else if (data.error && data.error.includes('auth/weak-password')) {
          setError("Password should be at least 6 characters.");
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Registration error:", err);
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
                Create Account
              </h1>
              <p className="text-muted-foreground">
                Register as a student or faculty member
              </p>
            </div>

            {success && (
              <div className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-lg p-3 mb-6 text-sm">
                Registration successful! Redirecting to login page...
              </div>
            )}

            {error && (
              <div className="bg-destructive/20 text-destructive border border-destructive/30 rounded-lg p-3 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUserType("student")}
                    className={`py-3 px-4 rounded-xl text-center font-medium transition-all duration-300 ${
                      userType === "student"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-glass-bg/50 border border-glass-border text-foreground hover:bg-muted/50"
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType("faculty")}
                    className={`py-3 px-4 rounded-xl text-center font-medium transition-all duration-300 ${
                      userType === "faculty"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-glass-bg/50 border border-glass-border text-foreground hover:bg-muted/50"
                    }`}
                  >
                    Faculty
                  </button>
                </div>
              </div>

              {/* ID Field */}
              <div>
                <label htmlFor={userType === "student" ? "studentId" : "facultyId"} className="block text-sm font-medium mb-2">
                  {userType === "student" ? "Student ID" : "Faculty ID"}
                </label>
                <input
                  type="text"
                  id={userType === "student" ? "studentId" : "facultyId"}
                  value={userType === "student" ? studentId : facultyId}
                  onChange={(e) => userType === "student" ? setStudentId(e.target.value) : setFacultyId(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder={userType === "student" ? "Enter your student ID" : "Enter your faculty ID"}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {userType === "student" ? "Example: STU12345" : "Example: FAC12345"}
                </p>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="Enter your email address"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {userType === "student" 
                    ? "Will be registered as: studentid@madrascollege.edu" 
                    : "Will be registered as: facultyid@madrascollege.edu"}
                </p>
              </div>

              {/* Password Field */}
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
                  placeholder="Create a password"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-glass-bg/50 border border-glass-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-primary text-primary-foreground px-4 py-3 rounded-full font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Registering..." : success ? "Registered!" : "Create Account"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>
                Already have an account?{" "}
                <Link 
                  to={userType === "student" ? "/student-login" : "/faculty-login"} 
                  className="text-neon-cyan hover:underline"
                >
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

export default Registration;
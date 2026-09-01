import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";
import AuthSidePanel from "../components/AuthSidePanel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      login(user, token);

      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/employee/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl bg-surface rounded-2xl shadow-2xl flex overflow-hidden">
        <AuthSidePanel />

        <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-10">
          <h1 className="text-2xl font-display font-semibold mb-4">Welcome back 👋</h1>
        

          {error && (
            <p className="bg-danger/10 text-danger text-sm rounded-md px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2 mb-4 bg-bg outline-none focus:border-primary"
          />

          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2 mb-6 bg-bg outline-none focus:border-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-md py-2.5 hover:opacity-90 font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-text-muted text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
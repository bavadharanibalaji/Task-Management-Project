import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import ThemeToggle from "../components/ThemeToggle";
import AuthSidePanel from "../components/AuthSidePanel";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password, role });
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          <h1 className="text-2xl font-display font-semibold mb-2">Create account</h1>
          <p className="text-text-muted text-sm mb-6">Sign up to get started</p>

          {error && (
            <p className="bg-danger/10 text-danger text-sm rounded-md px-3 py-2 mb-4">
              {error}
            </p>
          )}
          {success && (
            <p className="bg-success/10 text-success text-sm rounded-md px-3 py-2 mb-4">
              {success}
            </p>
          )}

          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-border rounded-md px-3 py-2 mb-4 bg-bg outline-none focus:border-primary"
          />

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
            minLength={6}
            className="w-full border border-border rounded-md px-3 py-2 mb-4 bg-bg outline-none focus:border-primary"
          />

          <label className="block text-sm mb-1">I am a</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 mb-6 bg-bg outline-none focus:border-primary"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-md py-2.5 hover:opacity-90 font-medium"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-sm text-text-muted text-center mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
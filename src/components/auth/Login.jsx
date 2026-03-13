import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import AuthCard from "../common/AuthCard";
import GoogleSignup from "./GoogleSignup";

function Login() {
  const navigate = useNavigate();
  const { setCredentials } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form);
      setCredentials({ token: data.token, user: data.user });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Welcome back">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full rounded-lg bg-slate-800 border border-slate-600 px-4 py-3"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full rounded-lg bg-slate-800 border border-slate-600 px-4 py-3"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {error ? <p className="text-red-400 text-sm">{error}</p> : null}

        <button
          className="w-full rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 disabled:opacity-60"
          disabled={loading}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <GoogleSignup />

      <p className="text-sm mt-6 text-slate-300">
        Need an account? <Link className="text-cyan-400" to="/register">Register</Link>
      </p>
    </AuthCard>
  );
}

export default Login;

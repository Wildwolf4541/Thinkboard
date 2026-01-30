import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api.post("/user/login", {
        email,
        password
      });

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Update global auth state
      dispatch({ type: "LOGIN", payload: res.data });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-linear-to-b from-[#050505] to-black overflow-hidden">
        <form
          className="signup w-95 bg-black rounded-2xl p-8 border-t-4 border-green-400
            shadow-[0_0_30px_rgba(0,255,136,0.25)]"
        >
          <h3 className="text-2xl font-bold text-green-400 text-center mb-2">
            Login
          </h3>

          <p className="text-sm text-gray-400 text-center mb-6">
            If you don’t have an account:{" "}
            <Link
              to="/signup"
              className="text-green-400 font-semibold hover:underline"
            >
              Signup
            </Link>
          </p>

          <label className="text-gray-300 text-sm mb-1 block">Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-3 py-2 text-white mb-4
              focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
          />

          <div className="relative mb-6">
            <label className="text-gray-300 text-sm mb-1 block">
              Password:
            </label>

            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-3 py-2 pr-10 text-white
                focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9.5 text-gray-400 hover:text-green-400 transition"
            >
              {showPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-green-400 text-black font-semibold py-2 rounded-xl
              hover:bg-green-300 transition-all disabled:opacity-50
              hover:shadow-[0_0_12px_rgba(0,255,136,0.8)]"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <div className="text-red-400 text-sm mt-4 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
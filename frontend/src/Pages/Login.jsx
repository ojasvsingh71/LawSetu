import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from "../api/axios";

const baseurl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(`/auth/login`, {
        email,
        password,
        remember
      }, { withCredentials: true }
      )

      localStorage.setItem("token", response.data.token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      navigate("/", { replace: true });
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!!! Please try again!!!");
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-xl overflow-hidden bg-white">

        {/* Left Login Form */}
        <div className="w-full md:w-1/2 p-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to LawSetu</h1>
            <p className="text-gray-600 mt-2">
              Your AI-Powered Bridge to Smarter, Simpler Legal Solutions
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>


            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="form-checkbox text-indigo-600" checked={remember} onChange={() => setRememberMe((prev) => !prev)} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              className={`w-full py-3  ${loading ? "bg-indigo-400" : "bg-indigo-600"} text-white font-semibold rounded-md hover:bg-indigo-700 transition`}
            >
              {loading ? " Signing In..." : "Sign In"}
            </button>

            <div className="text-center text-gray-500 font-semibold">OR</div>
          </form>

          <button
            type="button"
            onClick={() => window.location.href = `${baseurl}/auth/google`}
            className="w-full mt-4 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
             Continue with Google
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{"  "}
            <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
          </p>
        </div>

        {/* Right  side */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-2% to-indigo-600 flex-col items-center justify-center text-white p-10">
          <img
            src="https://i.pinimg.com/736x/8b/3b/40/8b3b4007c21da39a6dde49d2be19c544.jpg"
            alt="LawSetu Illustration"
            className="max-h-80 mb-4 rounded-lg shadow-lg"
          />
          <h2 className="text-2xl font-bold mb-2">Bridge the Gap Between </h2>
          <h2 className="text-2xl font-bold mb-2">Law and Simplicity</h2>
          <p className="text-center text-white/90">
            Draft smarter contracts, simplify legal terms, and manage documents with AI.
            <br />Save time. Reduce confusion. LawSetu has your back.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

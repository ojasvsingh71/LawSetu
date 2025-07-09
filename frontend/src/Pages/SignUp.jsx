import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import api from "../api/axios";

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(`/auth/register`, {
        name,
        email,
        password
      });

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "SignUP failed!!! Please try again!!!");
    } finally {
      setLoading(false);
    }

    // navigate("/login");
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full bg-white">

        {/* Left Section */}
        <div className="md:w-1/2 w-full p-8 md:p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create your LawSetu Account</h1>
          <p className="text-sm text-gray-500 mb-6">Sign up to simplify your legal work using AI</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="LawSetu"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="lawsetu@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setEmail(e.target.value)}
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
                  placeholder='••••••••'
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

            <button
              type="submit"
              className={`w-full ${loading ? "bg-indigo-400" : "bg-indigo-600"} text-white py-2 rounded-md hover:bg-indigo-700 transition`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/" className="text-indigo-600 hover:underline">Sign In</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full bg-gradient-to-b from-white to-indigo-600 flex flex-col items-center justify-center text-white p-6 md:p-10">
          <img
            src="https://i.pinimg.com/736x/8b/3b/40/8b3b4007c21da39a6dde49d2be19c544.jpg"
            alt="Sign Up Illustration"
            className="w-48 md:w-64 mb-4 md:mb-6"
          />
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">Join LawSetu today</h2>
          <p className="text-sm text-center leading-relaxed">
            Create your account to draft smarter contracts, simplify legal terms,
            and manage documents with AI. LawSetu empowers your legal journey.
          </p>
        </div>

      </div>
    </div>
  );
}

export default SignUp;

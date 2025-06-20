import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full bg-white">

        {/* Left Section */}
        <div className="md:w-1/2 w-full p-8 md:p-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">LawSetu</h1>
          <p className="text-sm text-gray-500 mb-6">Reset your password to regain access</p>

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600">
            <Link to="/" className="text-indigo-600 hover:underline">Back to Sign In</Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full bg-gradient-to-b from-white to-indigo-600 flex flex-col items-center justify-center text-white p-6 md:p-10">
          <img
            src="https://i.pinimg.com/736x/8b/3b/40/8b3b4007c21da39a6dde49d2be19c544.jpg"
            alt="Secure Access"
            className="w-48 md:w-64 mb-4 md:mb-6"
          />
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
            Bridge the Gap Between Law and Simplicity
          </h2>
          <p className="text-sm text-center leading-relaxed">
            Draft smarter contracts, simplify legal terms, and manage documents with AI.
            <br />
            Save time. Reduce confusion. LawSetu has your back.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;

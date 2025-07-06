import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import DocumentTemplate from "./Pages/DocumentTemplate";
import ProtectedRoute from "./components/ProtectedRoutes";
import Chatbot from "./components/Chatbot";
import Contact from "./Pages/Contact";
import GoogleCallback from "./Pages/GoogleCallback";

function App() {
  const token = localStorage.getItem('token');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><DocumentTemplate /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Chatbot />
    </>
  );
}

export default App;

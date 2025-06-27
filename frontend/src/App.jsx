import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home"; 
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import DocumentTemplate from "./Pages/DocumentTemplate";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <SignUp />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticated ? (
            <Home />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/editor" element={<DocumentTemplate />} />
    </Routes>
  );
}

export default App;

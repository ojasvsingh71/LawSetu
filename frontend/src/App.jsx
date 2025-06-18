import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home"; 

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
        path="/home"
        element={
          isAuthenticated ? (
            <Home />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default App;

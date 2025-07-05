import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    navigate("/", { replace: true });
  }, []);

  return <p>🔐 Signing you in with Google...</p>;
};

export default GoogleCallback;
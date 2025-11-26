import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      // Save token
      localStorage.setItem("token", token);

      // Redirect to dashboard after storing
      navigate("/dashboard", { replace: true }); // replace avoids back navigation to /oauth-success
    } else {
      // If no token, redirect to login
      navigate("/login", { replace: true });
    }
  }, [location.search, navigate]);

  return <p>Logging in...</p>;
};

export default OAuthSuccess;

import React, { useEffect, useState } from "react";
import API from "../api";

const DashboardPage: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/me") // protected endpoint
      .then((res) => setMessage(res.data.username))
      .catch((err) => setMessage("Error fetching dashboard data" + err));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Response: {message}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

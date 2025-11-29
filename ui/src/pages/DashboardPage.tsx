import React, { useEffect, useState } from "react";
import API from "../api";
import { Button } from "@/components/ui/button"

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
          <div onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }} className="flex min-h-svh flex-col items-center justify-center">
      <Button>Logout</Button>
    </div>
      
    </div>
  );
};

export default DashboardPage;

import React, { useEffect, useState } from "react";
import API from "../api";

const PublicPage: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/public") // your public endpoint
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("Error fetching public data" + err));
  }, []);

  return (
    <div>
      <h1>Public Pages</h1>
      <p>{message}</p>
      <a href="/login">Login</a>
    </div>
  );
};

export default PublicPage;

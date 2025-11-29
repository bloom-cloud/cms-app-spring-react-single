import React, { useEffect, useState } from "react";
import API from "../api";
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

const PublicPage: React.FC = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/public/test")
      .then((res) => setMessage(res.data))
      .catch((err) => setMessage("Error fetching public data" + err));
  }, []);

  return (
    <div className="flex flex-col m-auto">
      <h1 className="text-xl mb-2">Homepage</h1>
      <p>{message}</p>

    </div>
  );
};

export default PublicPage;

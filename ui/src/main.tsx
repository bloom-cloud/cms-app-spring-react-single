import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="min-h-screen bg-green-900">
          <AuthProvider>
        <App />
      </AuthProvider>
    </div>
  </React.StrictMode>
);

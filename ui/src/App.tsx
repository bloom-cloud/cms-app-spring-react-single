import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PublicPage from "./pages/PublicPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <DashboardPage />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

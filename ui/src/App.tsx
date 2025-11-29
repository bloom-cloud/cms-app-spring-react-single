import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PublicPage from "./pages/PublicPage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";
import OAuthSuccess from "./pages/OAuthSuccess";
import RegisterPage from "./pages/RegisterPage";
import { AppNavbar } from "./components/AppNavbar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AppNavbar />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            <Route
              path="/dashboard"
              element={
                
                  <ProtectedRoutes>
                    <DashboardPage />
                  </ProtectedRoutes>

                
              }
            />
          </Routes>
        </div>
      </main>

      {/* Optional Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          &copy; {new Date().getFullYear()} My App. All rights reserved.
        </div>
      </footer>

      </div>
    </BrowserRouter>

  );
};

export default App;

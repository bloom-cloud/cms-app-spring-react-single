import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicPage from "./pages/PublicPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

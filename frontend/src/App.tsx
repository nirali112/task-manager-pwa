import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditTask from "./pages/EditTask";
import Header from "./components/Header";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <AuthWrapper isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/add-task" element={isAuthenticated ? <AddTask /> : <Navigate to="/login" />} />
          <Route path="/edit-task/:id" element={isAuthenticated ? <EditTask /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthWrapper>
    </Router>
  );
}

const AuthWrapper: React.FC<{ isAuthenticated: boolean; setIsAuthenticated: (auth: boolean) => void; children: React.ReactNode }> = ({
  isAuthenticated,
  setIsAuthenticated,
  children,
}) => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && isAuthenticated && (
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      )}
      {children}
    </>
  );
};

export default App;
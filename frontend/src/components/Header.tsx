import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

interface HeaderProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            <span>Welcome!</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

interface HeaderProps {
  isAuthenticated: boolean; // Explicitly define the type
  setIsAuthenticated: (auth: boolean) => void; // Explicitly define the type
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Task Manager</h1>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-button">
              Login
            </Link>
            <Link to="/register" className="register-button">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
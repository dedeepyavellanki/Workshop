import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Workshop Management
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-links">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Statistics" className="nav-links">
              Statistics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

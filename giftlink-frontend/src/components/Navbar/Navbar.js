import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AuthContext';

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = sessionStorage.getItem('auth-token');
    const nameFromSession = sessionStorage.getItem('name');

    if (authToken && nameFromSession) {
      setUserName(nameFromSession);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/app');
  };

  const goToProfile = () => {
    navigate('/app/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">

      
        <Link className="navbar-brand fw-bold" to="/app">
          GiftLink
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* LEFT SIDE */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/app">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/app">
                Gifts
              </Link>
            </li>

          </ul>

          {/* RIGHT SIDE */}
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={goToProfile}
                  >
                    Welcome, {userName}
                  </span>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/app/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/app/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}
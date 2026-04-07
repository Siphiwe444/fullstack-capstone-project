import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  }, [setIsLoggedIn, setUserName]); 

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

        <a className="navbar-brand fw-bold" href="/home.html">
          GiftLink
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/home.html">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/app">Gifts</a>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" onClick={goToProfile} style={{ cursor: 'pointer' }}>
                    Welcome, {userName}
                  </span>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/app/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/app/register">Register</a>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}
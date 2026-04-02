// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages/components
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import DetailsPage from './components/DetailsPage/DetailsPage'; // <-- Import DetailsPage

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
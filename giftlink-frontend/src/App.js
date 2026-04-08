// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your pages/components
import Navbar from './components/Navbar/Navbar';
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/app" element={<MainPage />} />
        <Route path="/app/register" element={<RegisterPage />} />
        <Route path="/app/login" element={<LoginPage />} />
        <Route path="/app/product/:productId" element={<DetailsPage />} />
        <Route path="/app/search" element={<SearchPage />} /> {/* Search route */}
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
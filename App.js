import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ToggleButton from './src/components/ToggleButton';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const togglePage = () => {
    setCurrentPage(currentPage === 'home' ? 'about' : 'home');
  };

  return (
    <div className="App">
      <ToggleButton handleClick={togglePage} currentPage={currentPage} />
      {currentPage === 'home' ? <HomePage /> : <AboutPage />}
    </div>
  );
};

export default App;

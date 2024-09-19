import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@css/MainPage.css';

function MainPage() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className='main-page'>
      <h2>Our Services</h2>
      <button className='service-button' onClick={() => handleNavigation('/')}>
        메인
      </button>
      <button
        className='service-button'
        onClick={() => handleNavigation('/Diet')}
      >
        식단
      </button>
      <button
        className='service-button'
        onClick={() => handleNavigation('/Health')}
      >
        건강
      </button>
    </div>
  );
}

export default MainPage;

import React from 'react';
import '../css/Footer.css';
import { useNavigate } from 'react-router-dom';

function Footer() {
  
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className='footer'>
          <button className='service-button' onClick={() => handleNavigation('/')}>메인</button>
          <button className='service-button' onClick={() => handleNavigation('/Diet')}>식단</button>
          <button className='service-button' onClick={() => handleNavigation('/Health')}>건강</button>
    </footer>
  );
}

export default Footer;

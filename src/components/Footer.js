import React from 'react';
import { Container } from '@mui/material';
import '../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <p className="footer-text">
           개발자: 최준원 | Tel: 010-8028-1909 | Email: sunlift10000@naver.com 
        </p>
      </Container>
    </footer>
  );
}

export default Footer;

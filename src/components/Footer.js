import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  width: 100vw;
  height: 100%;
  padding: 0.5rem;
  margin: 0;
  box-sizing: border-box;
  background-color: #d4e7ee;
  text-align: center;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
`;

const StyledServiceButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  margin: 0.1rem;
  background-color: #d4e7ee;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f4f5;
  }
`;

function Footer() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <StyledFooter>
      <StyledServiceButton onClick={() => handleNavigation('/')}>
        메인
      </StyledServiceButton>
      <StyledServiceButton onClick={() => handleNavigation('/Diet')}>
        식단
      </StyledServiceButton>
      <StyledServiceButton onClick={() => handleNavigation('/Health')}>
        건강
      </StyledServiceButton>
    </StyledFooter>
  );
}

export default Footer;

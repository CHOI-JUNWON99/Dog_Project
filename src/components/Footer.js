import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome, AiOutlineHeart } from 'react-icons/ai';
import { GiFruitBowl } from 'react-icons/gi';

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  min-width: 320px;
  margin: 0 auto; /* 가로 중앙 정렬 */
  padding: 0 16px;
  box-sizing: border-box;
  background-color: #fff;
  color: #666;
  border-left: 2px solid #e0e0e0;
  border-right: 2px solid #e0e0e0;
  border-bottom: 2px solid #e0e0e0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  gap: 12px;
  transform: translateZ(0);
  padding-bottom: calc(env(safe-area-inset-bottom) + 0px);
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
`;

const StyledServiceButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.8rem;

  .icon {
    font-size: 1.5rem;
    margin-bottom: 2px;
  }

  &:hover {
    color: #333;
  }
`;

function Footer() {
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Container>
      <StyledFooter>
        <StyledServiceButton onClick={() => handleNavigation('/')}>
          <AiOutlineHome className='icon' />
          <span>메인</span>
        </StyledServiceButton>
        <StyledServiceButton onClick={() => handleNavigation('/Diet')}>
          <GiFruitBowl className='icon' />
          <span>식단</span>
        </StyledServiceButton>
        <StyledServiceButton onClick={() => handleNavigation('/Health')}>
          <AiOutlineHeart className='icon' />
          <span>건강</span>
        </StyledServiceButton>
      </StyledFooter>
    </Container>
  );
}

export default Footer;

import React from 'react';
import { LuDog } from 'react-icons/lu'; // 강아지 아이콘
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledNavbar = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  justify-content: center;
  justify-items: center;
  text-align: center;
  align-items: center;
  background-color: #d4e7ee;
  width: 100vw;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  cursor: pointer;
`;

const StyledNavbarButton = styled.button`
  display: flex;
  border: none;
  border-radius: 5px;
  width: 35px;
  height: 35px;
  background-color: #d4e7ee;
  cursor: pointer;

  /* 기존 .navbar--button:hover 효과 추가 */
  &:hover {
    background-color: #f0f4f5;
  }

  /* 기존 .dog_icon 스타일 추가 */
  .dog_icon {
    width: 35px;
    height: 35px;
  }
`;

function Navbar() {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <StyledNavbar>
      <StyledLink to='/' onClick={handleScrollToTop}>
        <h1>강아지 간식 사전</h1>
      </StyledLink>
      <StyledNavbarButton>
        <LuDog className='dog_icon' />
      </StyledNavbarButton>
    </StyledNavbar>
  );
}

export default Navbar;

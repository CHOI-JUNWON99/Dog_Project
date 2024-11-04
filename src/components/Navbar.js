import React from 'react';
import { LuDog } from 'react-icons/lu';
import { FiUser } from 'react-icons/fi';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import { CiSearch } from 'react-icons/ci'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  box-sizing: border-box;

  @media (max-width: 425px) {
    border-left: none;
    border-right: none;
    width: 100vw;
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background-color: #333;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 1000;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
`;

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: #fff;
//   border-radius: 5px;
//   padding: 5px 10px;
//   width: 300px;

//   input {
//     border: none;
//     outline: none;
//     width: 100%;
//     padding-left: 5px;
//   }

//   .search-icon {
//     color: #333;
//   }

//   @media (max-width: 425px) {
//     display: ${(props) => (props.showSearch ? 'block' : 'none')};
//     width: 100%;
//     margin-top: 0.5rem;
//   }
// `;

const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  .icon {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

function Navbar() {
  return (
    <Container>
      <ContentWrapper>
        <StyledNavbar>
          <Logo to='/'>Dog Snack Dictionary</Logo>
          {/* <SearchContainer>
            <CiSearch className='search-icon' />
            <input type='text' placeholder='검색어를 입력해 주세요' />
          </SearchContainer> */}
          <IconsContainer>
            <LuDog className='icon' />
            <FiUser className='icon' />
          </IconsContainer>
        </StyledNavbar>
      </ContentWrapper>
    </Container>
  );
}

export default Navbar;

import React from 'react';
import styled from 'styled-components';

const StyledMyPetInfo = styled.div`
  width: 400px;
  height: 100px;
  font-size: 2rem;
  color: #ffffff; 
  background-color: #6d6969; 
  text-align: center; 
  margin: 1rem; 
  border: none;
  border-radius: 5px;
`;

function MyPetInfo() {
  return (
    <StyledMyPetInfo>
        <h2>MyPetInfo</h2>
    </StyledMyPetInfo>
  );
}

export default MyPetInfo;

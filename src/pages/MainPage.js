import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci"; // 검색 아이콘
import styled from 'styled-components';
import snackData from '../components/SnackList'; // SnackList에서 데이터 가져오기

const MainPageContainer = styled.div`
  text-align: center;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #f0f9fc;
`;

const SearchSection = styled.section`
  padding: 1rem;
  width: 100vw;
  position: relative;
  right: 24px;

  input {
    width: 265px;
    padding: 10px;
    font-size: 13px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  button {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    cursor: pointer;
  }
`;

const SelectButtonSection = styled.section`
  button {
    width: 140px;
    height: 30px;
    font-size: 0.7rem;
    border: none;
    border-radius: 10px;
    color: #030000;
    background-color: #e1ecee;
    text-align: center;
    margin: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #c7c7c3;
    }
  }

  .selected {
    background-color: #add8e6; 
    color: white; 
  }
`;

const SnackListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 1.5rem;
`;

const SnackItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
  background-color: #e1ecee; 
  cursor: pointer;

  &:hover {
    background-color: #e7eeee; 
  }

  img {
    max-width: 80px; /* 이미지 크기 조정 */
    height: auto;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
  }

  p {
    margin: 5px 0 0 10px;
    font-size: 0.85rem;
    color: #333;
  }
`;

function MainPage() {
  const [filteredSnacks, setFilteredSnacks] = useState([]); // 필터링된 간식 상태
  const [selectedButton, setSelectedButton] = useState('safe');

  // '먹어도 되는 간식' 버튼 클릭 시 필터링 함수
  const handleSafeSnacks = () => {
    const safeSnacks = snackData.filter(snack => snack.category === 'safe');
    setFilteredSnacks(safeSnacks);
    setSelectedButton('safe');
  };

  // '절대 먹으면 안되는 간식' 버튼 클릭 시 필터링 함수
  const handleUnsafeSnacks = () => {
    const unsafeSnacks = snackData.filter(snack => snack.category === 'unsafe');
    setFilteredSnacks(unsafeSnacks);
    setSelectedButton('unsafe');
  };

  const getSafeSnacks = () => {
    const safeSnacks = snackData.filter(snack => snack.category === 'safe');
    setFilteredSnacks(safeSnacks);
    setSelectedButton('safe');
  };

  // 컴포넌트가 처음 렌더링될 때 '먹어도 되는 간식'을 기본으로 표시
  useEffect(() => {
    getSafeSnacks();
  }, []);

  return (
    <MainPageContainer>
      <SearchSection>
        <input placeholder='강아지가 먹어도 되는지 간식을 검색해보세요!' />
        <button> <CiSearch /> </button>
      </SearchSection>
      <h2>강아지 간식 정보</h2>
      <SelectButtonSection>
        <button onClick={handleSafeSnacks} className={selectedButton === 'safe' ? 'selected' : ''}>먹어도 되는 간식</button>
        <button onClick={handleUnsafeSnacks} className={selectedButton === 'unsafe' ? 'selected' : ''}>절대 먹으면 안되는 간식</button>
      </SelectButtonSection>
      {/* 필터링된 간식 목록을 표시 */}
      <SnackListSection>
        {filteredSnacks.map(snack => (
          <SnackItem key={snack.id}>
            <img src={snack.img} alt={snack.name} />
            <div className='snack-info'>
              <h3>{snack.name}</h3>
              <p>{snack.shortDescription}</p>
            </div>
          </SnackItem>
        ))}
      </SnackListSection>
    </MainPageContainer>
  );
}

export default MainPage;

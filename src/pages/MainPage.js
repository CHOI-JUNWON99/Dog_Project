// MainPage.js
import React, { useState, useEffect } from 'react';
import '../css/MainPage.css';
import { CiSearch } from "react-icons/ci"; // 검색 아이콘
import snackData from '../components/SnackList'; // SnackList에서 데이터 가져오기

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

  // 컴포넌트가 처음 렌더링될 때 '먹어도 되는 간식'을 기본으로 표시
  useEffect(() => {
    handleSafeSnacks();
  }, []);

  return (
    <div className='main-page'>
      <section className='search'>
        <input placeholder='강아지가 먹어도 되는지 간식을 검색해보세요!' />
        <button> <CiSearch /> </button>
      </section>
      <h2>강아지 간식 정보</h2>
      <section className='select-button'>
        <button onClick={handleSafeSnacks} className={selectedButton === 'safe' ? 'selected' : ''}>먹어도 되는 간식</button>
        <button onClick={handleUnsafeSnacks} className={selectedButton === 'unsafe' ? 'selected' : ''}>절대 먹으면 안되는 간식</button>
      </section>
      {/* 필터링된 간식 목록을 표시 */}
      <section className='snack-list'>
        {filteredSnacks.map(snack => (
          <div key={snack.id} className='snack-item'>
            <img src={snack.img} alt={snack.name} className='snack-image' />
            <div className='snack-info'>
              <h3>{snack.name}</h3>
              <p>{snack.shortDescription}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default MainPage;

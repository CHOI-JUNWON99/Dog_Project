import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import { FixedSizeList as List } from 'react-window';
import Loading from '../components/Loading';

const MainPageContainer = styled.div`
  min-height: calc(100vh - 100px); /* 100vh에서 Footer의 높이를 뺀 값 */
  margin-top: 80px;
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
    max-width: 80px;
    height: auto;
    border-radius: 10px;
    object-fit: contain;
    margin-right: 15px;
  }

  .snack-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: 180px;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => (props.isUnsafe ? 'red' : '#000')};
  }

  p {
    margin: 5px 0 0 10px;
    font-size: 0.85rem;
    color: #333;
  }
`;

function MainPage() {
  const [allSnacks, setAllSnacks] = useState([]); // 원본 간식 데이터
  const [filteredSnacks, setFilteredSnacks] = useState([]); // 필터링된 간식 상태
  const [selectedButton, setSelectedButton] = useState('safe');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // '먹어도 되는 간식' 버튼 클릭 시 필터링 함수
  const handleSafeSnacks = () => {
    const safeSnacks = allSnacks.filter((snack) => snack.category === 'safe');
    setFilteredSnacks(safeSnacks);
    setSelectedButton('safe');
  };

  // '절대 먹으면 안되는 간식' 버튼 클릭 시 필터링 함수
  const handleUnsafeSnacks = () => {
    const unsafeSnacks = allSnacks.filter(
      (snack) => snack.category === 'unsafe'
    );
    setFilteredSnacks(unsafeSnacks);
    setSelectedButton('unsafe');
  };

  // 검색기능 구현
  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value === '') {
      handleSafeSnacks(); // 검색 필드가 비어 있으면 safe 간식
    } else {
      const filtered = allSnacks.filter(
        (snack) =>
          snack.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          snack.shortDescription
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setFilteredSnacks(filtered);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 '먹어도 되는 간식'을 기본으로 표시
  useEffect(() => {
    async function fetchData() {
      const data = await getSnackList(); // snackData를 Promise로 받아오기
      setAllSnacks(data); // 원본 데이터를 저장
      setFilteredSnacks(data.filter((snack) => snack.category === 'safe')); // 먹어도 되는 간식만 표시
      setLoading(false); // 로딩 완료
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;

  // 가상 스크롤을 위한 항목 렌더링 함수
  const renderSnackItem = ({ index, style }) => {
    const snack = filteredSnacks[index];

    const itemStyle = {
      ...style,
      margin: '0px 0px',
    };

    return (
      <SnackItem
        key={snack.id}
        style={itemStyle}
        isUnsafe={snack.category === 'unsafe'}
      >
        <img src={snack.img} alt={snack.name} />
        <div className='snack-info'>
          <h3>{snack.name}</h3>
          <p>{snack.shortDescription}</p>
        </div>
      </SnackItem>
    );
  };

  return (
    <MainPageContainer>
      <SearchSection>
        <input
          placeholder='강아지가 먹어도 되는지 간식을 검색해보세요!'
          value={search}
          onChange={handleSearch}
        />
        <button>
          <CiSearch />
        </button>
      </SearchSection>
      <h2>강아지 간식 정보</h2>
      <SelectButtonSection>
        <button
          onClick={handleSafeSnacks}
          className={selectedButton === 'safe' ? 'selected' : ''}
        >
          먹어도 되는 간식
        </button>
        <button
          onClick={handleUnsafeSnacks}
          className={selectedButton === 'unsafe' ? 'selected' : ''}
        >
          절대 먹으면 안되는 간식
        </button>
      </SelectButtonSection>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          width={320}
          height={720}
          itemCount={filteredSnacks.length}
          itemSize={90}
          style={{ overflowX: 'hidden' }}
        >
          {renderSnackItem}
        </List>
      </div>
    </MainPageContainer>
  );
}

export default MainPage;

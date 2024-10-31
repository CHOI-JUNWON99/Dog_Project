import React, { useState, useEffect, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import { FixedSizeList as List } from 'react-window';
import Loading from '../components/Loading';

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px); /* 100vh에서 Footer의 높이를 뺀 값 */
  text-align: center;
  background-color: #fffffb;
  padding-bottom: 60px; /* Footer와의 간격을 위해 여유 공간 추가 */
  max-width: 600px;
  margin: 0 auto; /* 가로 중앙 정렬 */
  box-sizing: border-box;
  border-left: 2px solid #e0e0e0;
  border-right: 2px solid #e0e0e0;
`;

const StyledMainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SearchSection = styled.section`
  padding: 1rem;
  width: 100%;
  position: relative;

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
  border-radius: 2px;
  width: calc(100% - 20px);
  background-color: #e1ecee;
  cursor: pointer;
  box-sizing: border-box;

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
    flex: 1;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => (props.$isUnsafe ? 'red' : '#000')};
  }

  p {
    margin: 5px 0 0 10px;
    font-size: 0.85rem;
    color: #333;
  }
`;

const SnackListContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  overflow-y: auto; /* 세로 스크롤만 활성화 */
  overflow-x: hidden; /* 좌우 스크롤 제거 */
  cursor: grab;
  user-select: none;
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

function MainPage() {
  const [allSnacks, setAllSnacks] = useState([]);
  const [filteredSnacks, setFilteredSnacks] = useState([]);
  const [selectedButton, setSelectedButton] = useState('safe');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [listHeight, setListHeight] = useState(window.innerHeight * 0.75);
  const [listWidth, setListWidth] = useState(320);
  const listRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  // 화면 크기에 따라 리스트 크기를 조정하는 함수
  const updateListSize = () => {
    const newHeight = window.innerHeight * 0.75; // 화면 높이의 75%로
    const newWidth = window.innerWidth < 600 ? window.innerWidth - 40 : 320; // 화면 너비가 작을 때 동적으로 변경
    setListHeight(newHeight);
    setListWidth(newWidth);
  };

  // 컴포넌트가 마운트되면 resize 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('resize', updateListSize);
    updateListSize(); // 초기 사이즈 설정
    return () => {
      window.removeEventListener('resize', updateListSize);
    };
  }, []);

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
      setAllSnacks(data);
      setFilteredSnacks(data.filter((snack) => snack.category === 'safe'));
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <Loading />;

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    scrollTop.current = listRef.current.scrollTop;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientY - startY.current;
    listRef.current.scrollTop = scrollTop.current - delta;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

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
        $isUnsafe={snack.category === 'unsafe'}
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
      <StyledMainPage>
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
      </StyledMainPage>

      <SnackListContainer>
        <ListContainer
          ref={listRef}
          onMouseDown={handleMouseDown}
          width={listWidth}
          height={listHeight}
        >
          <List
            width={listWidth}
            height={listHeight}
            itemCount={filteredSnacks.length}
            itemSize={90}
            outerRef={listRef}
            style={{ overflowX: 'hidden', overflowY: 'hidden' }}
          >
            {renderSnackItem}
          </List>
        </ListContainer>
      </SnackListContainer>
    </MainPageContainer>
  );
}

export default MainPage;

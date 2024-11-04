import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import Loading from '../components/Loading';

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
  text-align: center;
  background-color: #fffffb;
  padding-bottom: 60px;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  border-left: 2px solid #e0e0e0;
  border-right: 2px solid #e0e0e0;

  @media (max-width: 425px) {
    border-left: none;
    border-right: none;
    width: 100vw;
    padding: 0;
  }
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

const SnackGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 550px;
  margin-left: 20px;
  margin-right: 20px;
`;

const SnackItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: #eff9f5;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;

  &:hover {
    background-color: #e7eeee;
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }

  .snack-info {
    margin-top: 10px;
  }

  h3 {
    margin: 5px 0 0;
    font-size: 1rem;
    font-weight: bold;
    color: ${(props) => (props.$isUnsafe ? 'red' : '#000')};
  }

  p {
    margin: 5px 0;
    font-size: 0.85rem;
    color: #333;
  }
`;

function MainPage() {
  const [allSnacks, setAllSnacks] = useState([]);
  const [filteredSnacks, setFilteredSnacks] = useState([]);
  const [selectedButton, setSelectedButton] = useState('safe');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getSnackList();
      setAllSnacks(data);
      setFilteredSnacks(data.filter((snack) => snack.category === 'safe'));
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleSafeSnacks = () => {
    setFilteredSnacks(allSnacks.filter((snack) => snack.category === 'safe'));
    setSelectedButton('safe');
    setSearch(''); // Reset search when switching categories
  };

  const handleUnsafeSnacks = () => {
    setFilteredSnacks(allSnacks.filter((snack) => snack.category === 'unsafe'));
    setSelectedButton('unsafe');
    setSearch(''); // Reset search when switching categories
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    if (searchTerm === '') {
      // Reset to current category when search is cleared
      setFilteredSnacks(
        allSnacks.filter((snack) => snack.category === selectedButton)
      );
    } else {
      const filtered = allSnacks.filter(
        (snack) =>
          snack.category === selectedButton &&
          (snack.name.toLowerCase().includes(searchTerm) ||
            snack.shortDescription.toLowerCase().includes(searchTerm))
      );
      setFilteredSnacks(filtered);
    }
  };

  if (loading) return <Loading />;

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

      <SnackGrid>
        {filteredSnacks.map((snack) => (
          <SnackItem key={snack.id} $isUnsafe={snack.category === 'unsafe'}>
            <img src={snack.img} alt={snack.name} />
            <div className='snack-info'>
              <h3>{snack.name}</h3>
              <p>{snack.shortDescription}</p>
            </div>
          </SnackItem>
        ))}
      </SnackGrid>
    </MainPageContainer>
  );
}

export default MainPage;

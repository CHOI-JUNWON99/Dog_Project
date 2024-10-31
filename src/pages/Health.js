import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import { FixedSizeList as List } from 'react-window';

const HealthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: #fffffb;
  padding-bottom: 60px;
  margin: 0 auto;
  max-width: 600px;
  box-sizing: border-box;
  border-left: 2px solid #e0e0e0;
  border-right: 2px solid #e0e0e0;
`;

const StyledHealthPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 60px;
  margin-bottom: 20px;
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

function Health() {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getSnackList();
      setSnacks(data);
    }
    fetchData();
  }, []);

  const filterSnackBySymptom = () => {
    if (!selectedSymptom) return snacks;
    return snacks.filter((snack) => snack.benefits.includes(selectedSymptom));
  };

  // 가상 스크롤을 위한 항목 렌더링 함수
  const renderSnackItem = ({ index, style }) => {
    const snack = filterSnackBySymptom()[index];

    return (
      <SnackItem key={snack.id} style={style}>
        <img src={snack.img} alt={snack.name} />
        <div className='snack-info'>
          <h3>{snack.name}</h3>
          <p>{snack.shortDescription}</p>
        </div>
      </SnackItem>
    );
  };

  return (
    <HealthPageContainer>
      <StyledHealthPage>
        <h3>특정부분에 좋은 간식을 찾아보세요</h3>
        <select onChange={(e) => setSelectedSymptom(e.target.value)}>
          <option value=''>선택하세요</option>
          <option value='cough'>기침</option>
          <option value='runny nose'>콧물</option>
          <option value='eyes'>눈</option>
          <option value='patella'>슬개골</option>
          <option value='energy recovery'>기력회복</option>
          <option value='bone'>뼈</option>
          <option value='supplement'>영양제</option>
        </select>
      </StyledHealthPage>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          width={320}
          height={720}
          itemCount={filterSnackBySymptom().length}
          itemSize={90}
          style={{ overflowX: 'hidden' }}
        >
          {renderSnackItem}
        </List>
      </div>
    </HealthPageContainer>
  );
}

export default Health;

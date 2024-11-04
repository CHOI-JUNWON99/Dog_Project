import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import Loading from '../components/Loading';

const HealthPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
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

const StyledHealthPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  padding-bottom: 60px;
  margin-top: 10px;
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

function Health() {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getSnackList();
      setSnacks(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // 선택된 증상에 맞는 safe한 간식만 필터링
  const filterSnackBySymptom = () => {
    return snacks.filter(
      (snack) =>
        snack.category === 'safe' &&
        (selectedSymptom === '' || snack.benefits.includes(selectedSymptom))
    );
  };

  if (loading) return <Loading />;

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

      <SnackGrid>
        {filterSnackBySymptom().map((snack) => (
          <SnackItem key={snack.id} $isUnsafe={snack.category === 'unsafe'}>
            <img src={snack.img} alt={snack.name} />
            <div className='snack-info'>
              <h3>{snack.name}</h3>
              <p>{snack.shortDescription}</p>
            </div>
          </SnackItem>
        ))}
      </SnackGrid>
    </HealthPageContainer>
  );
}

export default Health;

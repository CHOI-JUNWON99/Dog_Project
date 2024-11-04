import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import getBreedWeightData from '../components/BreedWeightData';

const DietPageContainer = styled.div`
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

const StyledDietPage = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

const CheckSection = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
  width: 100%;
  max-width: 320px;

  select,
  input {
    padding: 10px;
    font-size: 13px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  select {
    width: 140px;
  }

  input {
    width: 123px;
  }
`;

const MessageContainer = styled.div`
  margin-top: 10px;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: center;
  span {
    display: block;
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
  background-color: #e1ecee;
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

function Diet() {
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [filteredSnacks, setFilteredSnacks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchSnacks() {
      const data = await getSnackList();
      const dietSnacks = data.filter((snack) => snack.diet === 'diet-friendly');
      setFilteredSnacks(dietSnacks);
    }
    fetchSnacks();
  }, []);

  const handleCheckDiet = async () => {
    if (breed && weight) {
      const breedData = await getBreedWeightData();
      const breedInfo = breedData.find((item) => item.breed === breed);

      if (breedInfo) {
        const weightDifference = (weight - breedInfo.avgWeight).toFixed(1);
        if (weightDifference > 0.3) {
          setMessage(
            `평균보다 ${weightDifference}kg 초과! 다이어트가 필요해요!`
          );
        } else if (weightDifference >= -0.3 && weightDifference <= 0.3) {
          setMessage(`몸무게가 평균입니다~ 괜찮은 상태예요:)`);
        } else if (weightDifference < -0.3) {
          setMessage(
            `평균보다 ${Math.abs(weightDifference)}kg 적습니다. 간식을 늘려도 괜찮을 것 같아요!`
          );
        }
      } else {
        setMessage('견종을 찾지 못했습니다.');
      }
    }
  };

  useEffect(() => {
    handleCheckDiet();
  }, [breed, weight]);

  return (
    <DietPageContainer>
      <StyledDietPage>
        <h3>다이어트에 도움되는 간식을 찾아보세요</h3>
        <CheckSection>
          <select onChange={(e) => setBreed(e.target.value)} value={breed}>
            <option value=''>선택하세요</option>
            <option value='Chihuahua'>치와와</option>
            <option value='Beagle'>비글</option>
            <option value='Golden Retriever'>골든 리트리버</option>
            <option value='Poodle'>푸들</option>
          </select>
          <input
            type='number'
            placeholder='강아지 몸무게 (kg)'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </CheckSection>
        <MessageContainer>
          {message.split('\n').map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </MessageContainer>
      </StyledDietPage>

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
    </DietPageContainer>
  );
}

export default Diet;

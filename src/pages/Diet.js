import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import getSnackList from '../components/SnackList';
import getBreedWeightData from '../components/BreedWeightData';
import { FixedSizeList as List } from 'react-window';
import { FaCheck } from "react-icons/fa";

const StyledDietPage = styled.div`
  text-align: center;
  position: relative;
  margin-top: 100px;
`;

const CheckSection = styled.section`
  padding: 1rem;
  width: 100vw;
  position: relative;
  right: 24px;

  select {
    width: 110px;
    padding: 10px;
    font-size: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  input {
    width: 125px;
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

function Diet() {
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [filteredSnacks, setFilteredSnacks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch snack list data
    async function fetchSnacks() {
      const data = await getSnackList();
      const dietSnacks = data.filter((snack) => snack.diet === 'diet-friendly');
      setFilteredSnacks(dietSnacks);
    }
    fetchSnacks();
  }, []);

  const handleCheckDiet = async () => {
    const breedData = await getBreedWeightData(); // BreedWeightData에서 데이터를 가져옴
    const breedInfo = breedData.find((item) => item.breed === breed); // 사용자가 입력한 견종 찾기
    
    if (breedInfo) {
      const weightDifference = (weight - breedInfo.avgWeight).toFixed(1); // 현재 몸무게와 평균 몸무게 차이 계산
      if (weightDifference > 0.3) {
        setMessage(
          `평균보다 ${weightDifference}kg 초과! 다이어트가 필요해요!`
        );
      } else if (weightDifference >= -0.3 && weightDifference <= 0.3) {
        setMessage(`몸무게가 평균입니다~ 괜찮은 상태예요:)`);
      } else if (weightDifference < -0.3) {
        setMessage(`평균보다 ${Math.abs(weightDifference)}kg 적습니다. 간식을 늘려도 괜찮을 것 같아요!`);
      } 
    } else {
      setMessage('견종을 찾지 못했습니다.');
    }
  };

  // 가상 스크롤을 위한 항목 렌더링 함수
  const renderSnackItem = ({ index, style }) => {
    const snack = filteredSnacks[index]; // filteredSnacks 배열에서 항목 가져오기

    return (
      <SnackItem key={snack.id} style={style}>
        <img src={snack.img} alt={snack.name} />
        <div className="snack-info">
          <h3>{snack.name}</h3>
          <p>{snack.shortDescription}</p>
        </div>
      </SnackItem>
    );
  };

  return (
    <div>
      <StyledDietPage>
        <h3>다이어트에 도움되는 간식을 찾아보세요</h3>
        <CheckSection>
         <select onChange={(e)=>setBreed(e.target.value)}>
          <option value="">선택하세요</option>
          <option value="Chihuahua">치와와</option>
          <option value="Beagle">비글</option>
          <option value="Golden Retriever">골든 리트리버</option>
          <option value="Poodle">푸들</option>
         </select>
        <input
          type="number"
          placeholder="강아지 몸무게 (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button onClick={handleCheckDiet}>
          <FaCheck />
        </button>
        <p>{message}</p>
        </CheckSection>
      </StyledDietPage>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <List
          width={320}
          height={720}
          itemCount={filteredSnacks.length} // filteredSnacks 배열의 길이 사용
          itemSize={90}
          style={{ overflowX: 'hidden' }} 
        >
          {renderSnackItem}
        </List>
      </div>
    </div>
  );
}

export default Diet;

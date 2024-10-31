const breedWeightData = [
    {
      breed: 'Beagle',
      avgWeight: 10,
    },
    {
      breed: 'Golden Retriever',
      avgWeight: 30,
    },
    {
      breed: 'Poodle',
      avgWeight: 8,
    },
    // 다른 견종 추가
  ];
  
  export default function getBreedWeightData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(breedWeightData);
      }, 500); 
    });
  }
  
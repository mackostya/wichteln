import React from 'react';
import ResultImage from '../images/santa.png';

const ResultPage = () => {

  return (
    <div>
      <img src={ResultImage} className="Result-logo" alt="logo" />
        <p>
            Super, du hast Santa gewonnen!
        </p>
    </div>
  );
};

export default ResultPage;

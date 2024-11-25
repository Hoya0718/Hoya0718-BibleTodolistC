import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  const progressValue = parseFloat(progress); // progress가 문자열일 경우 숫자로 변환

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressValue}%` }}>
        <span className="progress-text">{progressValue.toFixed(2)}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;

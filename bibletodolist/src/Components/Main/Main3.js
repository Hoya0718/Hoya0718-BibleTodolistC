import React, { useState } from 'react';

const RangeSelector = () => {
  // 상태 선언
  const [num1, setNum1] = useState(null); // 첫 번째 값
  const [num2, setNum2] = useState(null); // 두 번째 값
  const [selectedRange, setSelectedRange] = useState([]); // 선택된 범위

  // 첫 번째 클릭된 값 설정
  const handleFirstClick = (value) => {
    setNum1(value);
    setNum2(null); // 두 번째 값을 초기화
    // 1부터 클릭한 값까지 범위를 설정
    const range = Array.from({ length: value }, (_, index) => index + 1);
    setSelectedRange(range); // 범위 저장
  };

  // 두 번째 클릭된 값 설정
  const handleSecondClick = (value) => {
    if (num1 !== null) {
      setNum2(value);
      // num1과 num2의 값을 비교하여 범위 계산
      const range = Array.from({ length: Math.abs(value - num1) + 1 }, (_, index) => {
        return num1 < value ? num1 + index : num1 - index;
      });
      setSelectedRange(range); // 범위 업데이트
    }
  };

  // 세 번째 클릭 시 num1을 새 값으로 변경하고 num2는 null로 초기화
  const handleThirdClick = (value) => {
    setNum1(value);
    setNum2(null); // num2를 초기화
    // 1부터 클릭된 값까지 범위 설정
    const range = Array.from({ length: value }, (_, index) => index + 1);
    setSelectedRange(range); // 범위 저장
  };

  // 버튼 클릭 시 하이라이트 처리
  const highlightButton = (value) => {
    return selectedRange.includes(value) ? '#4CAF50' : '#e0e0e0'; // 선택된 값이면 색상 변경
  };

  return (
    <div>
      <h1>값 처리 프로그램</h1>
      <p>1부터 30까지의 숫자를 클릭하여 값을 입력하거나 수정하세요.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {[...Array(30)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => {
              if (num1 === null) {
                handleFirstClick(i + 1); // 첫 번째 클릭
              } else if (num2 === null) {
                handleSecondClick(i + 1); // 두 번째 클릭
              } else {
                handleThirdClick(i + 1); // 세 번째 클릭에서 num1을 변경하고 num2는 초기화
              }
            }}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: highlightButton(i + 1),
              color: selectedRange.includes(i + 1) ? 'white' : 'black',
              border: '1px solid #ddd',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div>
        <h2>입력값:</h2>
        <p>num1: {num1 !== null ? num1 : '아직 입력되지 않음'}</p>
        <p>num2: {num2 !== null ? num2 : '아직 입력되지 않음'}</p>
      </div>

      <div>
        <h2>처리된 결과:</h2>
        <p>결과가 여기에 표시됩니다: {selectedRange.join(', ')}</p>
      </div>
    </div>
  );
};

export default RangeSelector;

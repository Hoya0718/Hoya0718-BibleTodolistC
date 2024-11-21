// src/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  // isOpen이 false일 때 모달을 렌더링하지 않음

  return (
    <div>
      {/* 모달 외부 클릭 시 닫히도록 처리 */}
      <div onClick={onClose} style={overlayStyle}></div>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}>닫기</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

// 오버레이 스타일 (배경)
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // 배경을 반투명 검은색으로
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,  // 모달이 다른 요소 위에 뜨도록 설정
};

// 모달 스타일
const modalStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  position: 'relative',
  zIndex: 1001,  // 오버레이보다 한 단계 위에 모달을 위치시킴
};

// 닫기 버튼 스타일
const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
};

export default Modal;

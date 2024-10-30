// Daybox.jsx
import React from 'react';
import './Daybox.css';

const Daybox = ({ filled, onClick }) => (
    // 'filled'가 true이면 'filled' 클래스를 추가하여 채워진 스타일을 적용
    // 'onClick' 함수는 박스 클릭 시 호출
    <div className={`day-box ${filled ? 'filled' : ''}`} onClick={onClick}></div>
);

export default Daybox;

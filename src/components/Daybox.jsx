// Daybox.jsx
import React from 'react';
import './Daybox.css';

const Daybox = ({ filled, onClick }) => (
    <div className={`day-box ${filled ? 'filled' : ''}`} onClick={onClick}></div>
);

export default Daybox;

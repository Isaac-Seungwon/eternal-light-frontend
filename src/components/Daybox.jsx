// Daybox.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Daybox.css';

const Daybox = ({ filled, onClick, isToday }) => {
    return (
        <motion.div
            className={`day-box ${filled ? 'filled' : ''}`}
            onClick={onClick}
            style={{
                backgroundColor: isToday ? '#ffeb3b' : '#e0e0e0',
                boxShadow: isToday ? 'rgb(255 228 0 / 90%) 0px 0px 5px' : 'none',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
        ></motion.div>
    );
};

export default Daybox;

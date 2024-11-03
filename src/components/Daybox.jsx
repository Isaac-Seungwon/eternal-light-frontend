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
                // backgroundColor: isToday ? '#ffeb3b' : '#e0e0e0',
                // boxShadow: isToday ? '0 0 15px rgba(255, 223, 186, 0.6)' : 'none',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
        ></motion.div>
    );
};

export default Daybox;

// Searchbar.jsx
import React from 'react';
import './Searchbar.css';

const Searchbar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit">🔍</button>
        </div>
    );
};

export default Searchbar;

// SearchBar.jsx
import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit">🔍</button>
        </div>
    );
};

export default SearchBar;

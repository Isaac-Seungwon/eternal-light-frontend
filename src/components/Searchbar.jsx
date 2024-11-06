// SearchBar.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = () => {
	return (
		<div className='search-bar'>
			<input type='text' placeholder='Search...' />
			<button type='submit'>
				<FaSearch />
			</button>
		</div>
	);
};

export default SearchBar;

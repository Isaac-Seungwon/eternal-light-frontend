// Header.jsx
import React from 'react';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaStar, FaCalendarAlt, FaRegCalendarAlt, FaSearch, FaHistory } from 'react-icons/fa';
import userImage from '../../assets/image/user.png';
import './Header.css';

const Header = ({ title }) => {
	const navigate = useNavigate();

	return (
		<header className='app-header'>
			<div className='header-top'>
				<div className='header-left'>
					<FaRegCalendarAlt className='logo-icon' />
					<h1 className='app-title'>{title}</h1>
				</div>
				<div className='header-right'>
					<SearchBar />
					<div className='user-settings' onClick={() => navigate('/settings')}>
						<img src={userImage} alt='User' className='user-image' />
					</div>
				</div>
			</div>

			<nav className='menu'>
				<ul>
					<li>
						<a href='#home'>
							<FaHome /> Overview
						</a>
					</li>
					<li>
						<a href='#calendars'>
							<FaCalendarAlt /> Calendars
						</a>
					</li>
					<li>
						<a href='#favorites'>
							<FaStar /> Favorites
						</a>
					</li>
					<li>
						<a href='#search'>
							<FaSearch /> Search
						</a>
					</li>
					<li>
						<a href='#history'>
							<FaHistory /> History
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;

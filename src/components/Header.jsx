// Header.jsx
import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';
import userImage from '../assets/image/user.png';
import { FaHome, FaStar, FaCalendarAlt, FaRegCalendarAlt, FaSearch, FaHistory } from 'react-icons/fa';

const Header = ({ title }) => (
    <header className="app-header">
        {/* First section: Left and Right */}
        <div className="header-top">
            <div className="header-left">
                <FaRegCalendarAlt className="logo-icon" />
                <h1 className="app-title">{title}</h1>
            </div>
            <div className="header-right">
                <SearchBar />
                <div className="user-settings" onClick={() => alert('User settings page')}>
                    <img src={userImage} alt="User" className="user-image" />
                </div>
            </div>
        </div>

        {/* Second section: Menu */}
        <nav className="menu">
            <ul>
                <li><a href="#home"><FaHome /> Overview</a></li>
                <li><a href="#calendars"><FaCalendarAlt /> Calendars</a></li>
                <li><a href="#favorites"><FaStar /> Favorites</a></li>
                <li><a href="#search"><FaSearch /> Search</a></li>
                <li><a href="#history"><FaHistory /> History</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;

// Header.jsx
import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';
import userImage from '../assets/image/user.png';
import { FaHome, FaStar, FaCalendarAlt, FaCog } from 'react-icons/fa';

const Header = ({ title }) => (
    <header className="app-header">
        {/* 첫 번째 단: 왼쪽과 오른쪽으로 구분 */}
        <div className="header-top">
            <div className="header-left">
                <h1 className="app-title">{title}</h1>
            </div>
            <div className="header-right">
                <SearchBar />
                <div className="user-settings" onClick={() => alert('User settings page')}>
                    <img src={userImage} alt="User" className="user-image" />
                </div>
            </div>
        </div>

        {/* 두 번째 단: 메뉴 */}
        <nav className="menu">
            <ul>
                <li><a href="#home"><FaHome /> Home</a></li>
                <li><a href="#favorites"><FaStar /> Favorites</a></li>
                <li><a href="#calendar"><FaCalendarAlt /> My Calendar</a></li>
                <li><a href="#settings"><FaCog /> Settings</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;

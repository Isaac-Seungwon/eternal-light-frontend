// Header.jsx
import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';
import userImage from '../asset/image/user.png'; // 경로 확인 후 수정하세요.

const Header = ({ title }) => (
    <header className="app-header">
        <div className="header-content">
            <h1 className="app-title">{title}</h1>
            <nav className="menu">
                <ul>
                    <li><a href="#home">🏠 Home</a></li>
                    <li><a href="#favorites">⭐ Favorites</a></li>
                    <li><a href="#calendar">📅 My Calendar</a></li>
                    <li><a href="#settings">⚙️ Settings</a></li>
                </ul>
            </nav>
            <SearchBar /> {/* 검색 바 추가 */}
            <div className="user-settings" onClick={() => { /* 사용자 설정 페이지로 이동 */ alert('User settings page'); }}>
                <img src={userImage} alt="User" className="user-image" />
            </div>
        </div>
    </header>
);

export default Header;

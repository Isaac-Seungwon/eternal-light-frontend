// Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ title }) => (
    <header className="app-header">
        <nav className="menu">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
);

export default Header;

import React from 'react';
import logo from '../logo.svg';
import './Header.css';

const Header = ({ title }) => (
    <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1>{title}</h1>
    </header>
);

export default Header;

import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
                {isOpen ? '←' : '→'}
            </button>
            <a href="#home">Home</a>
            <a href="#calendar">Calendar</a>
            <a href="#settings">Settings</a>
        </div>
    );
};

export default Sidebar;

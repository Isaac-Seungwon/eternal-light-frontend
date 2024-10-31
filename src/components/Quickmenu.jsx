// Quickmenu.jsx
import React, { useState, useEffect } from 'react';
import './Quickmenu.css';

const Quickmenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 800 });
    const [isDragging, setIsDragging] = useState(false);

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    // 드래그 시작
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // 드래그 이동
    const handleDrag = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - 25, // 중앙 정렬을 위해 25px 조정
                y: e.clientY - 25,
            });
        }
    };

    // 드래그 종료
    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleDrag);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`quick-menu ${menuOpen ? 'open' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            onMouseDown={handleMouseDown}
        >
            <div className="circle-button" onClick={toggleMenu}>
                ☰
            </div>
            {menuOpen && (
                <div className="menu-items">
                    <span className="menu-item">🏠 Home</span>
                    <span className="menu-item">📅 Calendar</span>
                    <span className="menu-item">⚙️ Settings</span>
                </div>
            )}
        </div>
    );
};

export default Quickmenu;

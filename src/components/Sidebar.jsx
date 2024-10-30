// Sidebar.jsx
import React from 'react';
import './Sidebar.css';

// Sidebar 컴포넌트
// 사이드바가 열리고 닫히는 애니메이션과 함께 Home, Calendar, Settings 링크를 표시
const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}> {/* 사이드바 상태에 따라 CSS 클래스 변경 */}
            {/* 사이드바 토글 버튼 */}
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
                {isOpen ? '←' : '→'} {/* 사이드바가 열려 있으면 닫기 아이콘(←), 닫혀 있으면 열기 아이콘(→) */}
            </button>

            {/* 사이드바 링크 목록 */}
            <a href="#home">Home</a> {/* Home 섹션으로 이동하는 링크 */}
            <a href="#calendar">Calendar</a> {/* Calendar 섹션으로 이동하는 링크 */}
            <a href="#settings">Settings</a> {/* Settings 섹션으로 이동하는 링크 */}
        </div>
    );
};

export default Sidebar;

// App.jsx
import React, { useState } from 'react';
import Homepage from './pages/Homepage';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
    // 사이드바의 열림 상태를 관리하는 상태 변수
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // 사이드바 열기/닫기 토글 함수
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // 사이드바 상태를 반전
    };

    return (
        <div className="App">
            {/* Sidebar 컴포넌트에 열림 상태와 토글 함수 전달 */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Sidebar가 열리면 메인 콘텐츠를 오른쪽으로 이동 */}
            {/* <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}> */}
                <Homepage /> {/* Homepage 컴포넌트 렌더링 */}
            {/* </div> */}
        </div>
    );
};

export default App;

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';

// 배경색 배열 정의
const backgroundColors = [
    '#3499FF', // 00:00 - 02:59
    '#56C0FF', // 03:00 - 05:59
    '#73E0FF', // 06:00 - 08:59
    '#357AAB', // 09:00 - 11:59
    '#1051AB', // 12:00 - 14:59
    '#7D119F', // 15:00 - 17:59
    '#0E1D24', // 18:00 - 20:59
    '#182635'  // 21:00 - 23:59
];

const App = () => {
    const [backgroundTop, setBackgroundTop] = useState('0px');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const updateBackgroundPosition = () => {
        const headerHeight = -800; // Header의 고정 높이
        const homePageHeight = document.querySelector('.HomePage')?.offsetHeight || 0; // HomePage 높이
        const totalHeight = headerHeight + homePageHeight;

        const newTop = totalHeight > 0 ? `${totalHeight}px` : '0px';
        setBackgroundTop(newTop);
    };

    const setBackgroundImageAndColor = () => {
        const currentHour = new Date().getHours();
        const index = Math.floor(currentHour / 3); // 3시간마다 변경
        
        setCurrentImageIndex(index);

        // HTML <body> 배경색 변경
        document.body.style.backgroundColor = backgroundColors[index]; // <body>의 배경색 변경
    };

    useEffect(() => {
        updateBackgroundPosition();
        setBackgroundImageAndColor(); // 초기 배경 이미지 및 색상 설정

        const observer = new MutationObserver(updateBackgroundPosition);
        const targetNode = document.querySelector('.HomePage');

        if (targetNode) {
            observer.observe(targetNode, { childList: true, subtree: true });
        }

        window.addEventListener('resize', updateBackgroundPosition);

        return () => {
            if (targetNode) {
                observer.disconnect();
            }
            window.removeEventListener('resize', updateBackgroundPosition);
        };
    }, []);

    return (
        <div className="App">
            <div
                className={`background-image background-${currentImageIndex}`} // CSS 클래스 적용
                style={{
                    top: backgroundTop,
                }}
            />
            <Header title="Daily Life" />
            <HomePage />
        </div>
    );
};

export default App;

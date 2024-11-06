// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import './App.css';

// 배경색 배열 정의 (시간대에 따른 배경색)
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
        const headerHeight = -700; // Header의 고정 높이
        const homePageHeight = document.querySelector('.HomePage')?.offsetHeight || 0; // HomePage 높이
        const totalHeight = headerHeight + homePageHeight;

        const newTop = totalHeight > 0 ? `${totalHeight}px` : '0px';
        setBackgroundTop(newTop);
    };

    const setBackgroundImageAndColor = () => {
        const currentHour = new Date().getHours(); // 현재 시각
        let index = 0;

        // console.log("currentHour: " + currentHour);

        // 시간대에 맞는 인덱스를 구하는 로직
        if (currentHour >= 0 && currentHour < 3) {
            index = 0; // 00:00 - 02:59
        } else if (currentHour >= 3 && currentHour < 6) {
            index = 1; // 03:00 - 05:59
        } else if (currentHour >= 6 && currentHour < 9) {
            index = 2; // 06:00 - 08:59
        } else if (currentHour >= 9 && currentHour < 12) {
            index = 3; // 09:00 - 11:59
        } else if (currentHour >= 12 && currentHour < 15) {
            index = 4; // 12:00 - 14:59
        } else if (currentHour >= 15 && currentHour < 18) {
            index = 5; // 15:00 - 17:59
        } else if (currentHour >= 18 && currentHour < 21) {
            index = 6; // 18:00 - 20:59
        } else if (currentHour >= 21 && currentHour < 24) {
            index = 7; // 21:00 - 23:59
        }

        setCurrentImageIndex(index); // 배경 이미지 인덱스 설정

        // HTML <body> 배경색 변경
        document.body.style.backgroundColor = backgroundColors[index]; // <body>의 배경색 변경
    };

    useEffect(() => {
        // 페이지가 처음 로드될 때마다 배경을 바로 반영
        setBackgroundImageAndColor(); // 초기 로딩 시 바로 실행

        // 시간 계산을 주기적으로 실행하도록 설정 (5분마다)
        const intervalId = setInterval(() => {
            setBackgroundImageAndColor();
        }, 1000 * 60 * 5); // 5분마다 업데이트

        const observer = new MutationObserver(updateBackgroundPosition);
        const targetNode = document.querySelector('.HomePage');

        if (targetNode) {
            observer.observe(targetNode, { childList: true, subtree: true });
        }

        window.addEventListener('resize', updateBackgroundPosition);

        // 컴포넌트 언마운트 시 클린업
        return () => {
            clearInterval(intervalId); // setInterval 클린업
            if (targetNode) {
                observer.disconnect();
            }
            window.removeEventListener('resize', updateBackgroundPosition);
        };
    }, []); // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행되게 합니다.

    return (
        <div className="App">
            <div
                className={`background-image background-${currentImageIndex}`} // 동적으로 배경 이미지 클래스 적용
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

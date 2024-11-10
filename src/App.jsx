// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/navigation/Header';
import Homepage from './pages/Homepage';
import UserSettingsPage from './pages/UserSettingsPage';
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
	'#182635', // 21:00 - 23:59
];

const App = () => {
	const [backgroundTop, setBackgroundTop] = useState('0px');
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const updateBackgroundPosition = () => {
		const headerHeight = -800;
		const HomepageHeight = document.querySelector('.Homepage')?.offsetHeight || 0;
		const totalHeight = headerHeight + HomepageHeight;

		const newTop = totalHeight > 0 ? `${totalHeight}px` : '0px';
		setBackgroundTop(newTop);
	};

	const setBackgroundImageAndColor = () => {
		const currentHour = new Date().getHours();
		let index = 0;

		if (currentHour >= 0 && currentHour < 3) {
			index = 0;
		} else if (currentHour >= 3 && currentHour < 6) {
			index = 1;
		} else if (currentHour >= 6 && currentHour < 9) {
			index = 2;
		} else if (currentHour >= 9 && currentHour < 12) {
			index = 3;
		} else if (currentHour >= 12 && currentHour < 15) {
			index = 4;
		} else if (currentHour >= 15 && currentHour < 18) {
			index = 5;
		} else if (currentHour >= 18 && currentHour < 21) {
			index = 6;
		} else if (currentHour >= 21 && currentHour < 24) {
			index = 7;
		}

		setCurrentImageIndex(index);
		document.body.style.backgroundColor = backgroundColors[index];
	};

	useEffect(() => {
		setBackgroundImageAndColor();

		const intervalId = setInterval(setBackgroundImageAndColor, 1000 * 60 * 5);

		const observer = new MutationObserver(updateBackgroundPosition);
		const targetNode = document.querySelector('.Homepage');

		if (targetNode) {
			observer.observe(targetNode, { childList: true, subtree: true });
		}

		window.addEventListener('resize', updateBackgroundPosition);

		return () => {
			clearInterval(intervalId);
			if (targetNode) {
				observer.disconnect();
			}
			window.removeEventListener('resize', updateBackgroundPosition);
		};
	}, []);

	return (
		<div className='App'>
			<div className={`background-image background-${currentImageIndex}`} style={{ top: backgroundTop }} />
			<Header title='Daily Life' />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/settings' element={<UserSettingsPage />} />
			</Routes>
		</div>
	);
};

export default App;

// Notification.jsx
import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ message, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		setIsVisible(true); // 컴포넌트가 마운트될 때 알림 표시

		const timer = setTimeout(() => {
			setFadeOut(true); // 2.5초 후 페이드 아웃 시작
			setTimeout(onClose, 500); // 500ms 후에 onClose 호출
		}, 2500); // 2.5초 후 페이드 아웃 시작

		return () => clearTimeout(timer);
	}, [onClose]);

	return <div className={`notification ${isVisible ? 'fade-in' : ''} ${fadeOut ? 'fade-out' : ''}`}>{message}</div>;
};

export default Notification;

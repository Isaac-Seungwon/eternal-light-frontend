// SelectBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import './SelectBox.css';
import Notification from '../notice/NotificationMessage';

const SelectBox = ({ selectedYears = [], onYearChange, onScrollToYear }) => {
	const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
	const [lastSelectedYear, setLastSelectedYear] = useState(
		selectedYears[selectedYears.length - 1] || new Date().getFullYear() // 마지막 선택된 연도 초기화
	);
	const dropdownRef = useRef(); // 드롭다운 참조
	const [previousYear, setPreviousYear] = useState(lastSelectedYear); // 이전 연도 저장
	const [notificationMessage, setNotificationMessage] = useState(''); // 알림 메시지
	const [showNotification, setShowNotification] = useState(false); // 알림 표시 상태

	// 드롭다운 토글 함수
	const toggleDropdown = () => setIsOpen((prev) => !prev);

	// 드롭다운 외부 클릭 시 닫기
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// 드롭다운이 열릴 때 선택된 옵션이 화면에 보이도록 스크롤
	useEffect(() => {
		if (isOpen && dropdownRef.current) {
			const selectedOption = dropdownRef.current.querySelector(
				`.select-box-option[data-year='${lastSelectedYear}']`
			);
			selectedOption?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [isOpen, lastSelectedYear]);

	// 연도 선택 핸들러
	const handleYearSelect = (year, event) => {
		// Shift 키와 함께 연도 선택 시 연도 범위 추가
		if (event.shiftKey && previousYear !== null) {
			const start = Math.min(previousYear, year);
			const end = Math.max(previousYear, year);
			const newYears = Array.from({ length: end - start + 1 }, (_, i) => start + i); // 선택된 연도 범위 생성

			const filteredYears = newYears.filter((newYear) => !selectedYears.includes(newYear)); // 이미 선택된 연도 제외
			// 최대 15개 연도 허용
			if (selectedYears.length + filteredYears.length <= 15) {
				filteredYears.forEach((newYear) => {
					onYearChange(newYear); // 연도 변경 함수 호출
				});
			} else {
				showAlert(); // 연도 초과 선택 시 알림 표시
			}
		} else {
			// 이미 선택된 연도라면 해제
			if (selectedYears.includes(year)) {
				onYearChange(year, true); // true로 해제 플래그 전달
			} else {
				// 새로 추가
				if (selectedYears.length < 15) {
					onYearChange(year); // 연도 추가
				} else {
					showAlert(); // 연도 초과 선택 시 알림 표시
				}
			}
		}
		setLastSelectedYear(year); // 마지막 선택된 연도 업데이트
		setPreviousYear(year); // 이전 연도 업데이트
	};

	// 알림 표시 함수
	const showAlert = () => {
		setNotificationMessage('15개 이상을 선택하실 수 없습니다!'); // 알림 메시지 설정
		setShowNotification(true); // 알림 표시
	};

	// 해시태그 클릭 시 해당 연도로 스크롤
	const handleYearHashtagClick = (year) => {
		onScrollToYear(year); // 스크롤 함수 호출
		setLastSelectedYear(year); // 마지막 선택된 연도 업데이트
		setPreviousYear(year); // 이전 연도 업데이트
	};

	return (
		<div className='select-box' ref={dropdownRef}>
			<div className='select-box-selected' onClick={toggleDropdown}>
				{lastSelectedYear} Year
			</div>
			{isOpen && (
				<div className='select-box-dropdown'>
					<div className='select-box-options'>
						{/* 0부터 3000까지 연도 생성 */}
						{[...Array(3001)].map((_, index) => (
							<div
								key={index}
								data-year={index}
								className={`select-box-option ${selectedYears.includes(index) ? 'selected' : ''}`}
								onClick={(event) => handleYearSelect(index, event)} // 연도 선택 핸들러
							>
								{index} {/* 연도 표시 */}
							</div>
						))}
					</div>
				</div>
			)}
			<div className='selected-years'>
				{/* 선택된 연도 해시태그 표시 */}
				{selectedYears.map((year) => (
					<span
						key={year}
						className='year-hashtag'
						onClick={() => handleYearHashtagClick(year)} // 해시태그 클릭 핸들러
					>
						#{year}
					</span>
				))}
			</div>
			{showNotification && (
				<Notification message={notificationMessage} onClose={() => setShowNotification(false)} />
			)}
		</div>
	);
};

export default SelectBox;

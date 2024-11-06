// Month.jsx
import React, { useState } from 'react';
import Daybox from './Daybox';
import './Month.css';

const Month = ({ month, days, filledDates, onToggleDate, monthIndex, year }) => {
	const [isHovered, setIsHovered] = useState(false); // Hover 상태를 관리
	const weeks = []; // 각 주를 저장하는 배열
	const dates = Array.from({ length: days }, (_, i) => i + 1); // 해당 월의 날짜 목록을 생성

	// 월의 첫 번째 날짜가 무슨 요일인지 계산 (0: 일요일, 1: 월요일, ..., 6: 토요일)
	const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

	// 오늘 날짜 정보
	const today = new Date();
	const todayMonth = today.getMonth(); // 현재 월
	const todayDate = today.getDate(); // 현재 날짜
	const todayYear = today.getFullYear(); // 현재 연도

	// 첫 주의 첫날 이전에 필요한 빈 날짜 수만큼 null을 채움
	const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

	// 빈 날짜와 실제 날짜를 결합하여 전체 날짜 배열 생성
	const allDays = [...emptyDays, ...dates];

	// 전체 날짜 배열을 7일씩 잘라서 주 단위 배열을 만듦
	for (let i = 0; i < allDays.length; i += 7) {
		weeks.push(allDays.slice(i, i + 7)); // 한 주(7일)를 추출하여 weeks 배열에 추가
	}

	// 월 클릭 핸들러
	const handleMonthClick = () => {
		// 해당 월의 모든 날짜를 토글
		dates.forEach((date) => {
			onToggleDate(monthIndex, date);
		});
	};

	return (
		<div
			className={`month ${isHovered ? 'hovered' : ''}`} // Hover 상태에 따른 클래스 추가
			onMouseEnter={() => setIsHovered(true)} // 마우스가 올라갈 때 hover 상태 변경
			onMouseLeave={() => setIsHovered(false)} // 마우스가 떠날 때 hover 상태 변경
		>
			{/* 월 이름을 클릭 가능하게 만들어 클릭 시 핸들러 호출 */}
			<span
				className='month-name' // 클래스 추가
				onClick={handleMonthClick} // 월 이름 클릭 시 핸들러 호출
			>
				{month}
			</span>
			<div className='month-calendar'>
				{weeks.map((week, weekIndex) => (
					<div className='week' key={weekIndex}>
						{/* 각 주(week) 내에서 날짜 또는 빈 박스 렌더링 */}
						{week.map((date, dateIndex) =>
							date !== null ? ( // 실제 날짜가 존재하는 경우에만 Daybox 생성
								<Daybox
									key={dateIndex}
									filled={filledDates[date] || false} // 선택된 날짜에 대해 채움 여부 확인
									onClick={() => onToggleDate(monthIndex, date)} // 날짜 클릭 시 상태 변경 함수 호출
									isToday={date === todayDate && monthIndex === todayMonth && year === todayYear} // 오늘 날짜 확인
								>
									{date} {/* Daybox 내부에 날짜 표시 */}
								</Daybox>
							) : (
								<div key={dateIndex} className='empty-day-box'></div> // 빈 날짜 박스
							)
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Month;

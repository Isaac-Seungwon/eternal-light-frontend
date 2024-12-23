// Homepage.jsx
import React, { useState, useRef } from 'react';
import Calendar from '../components/calendar/Calendar';
import SelectBox from '../components/calendar/SelectBox';
import EventList from '../components/calendar/EventList';
import UserProfile from '../components/user/UserProfile';
import { useTransition, animated } from '@react-spring/web';
import './Homepage.css';

const Homepage = () => {
	const [years, setYears] = useState([new Date().getFullYear()]); // 선택된 연도들 저장
	const [events, setEvents] = useState([]); // 이벤트 목록 상태
	const [selectedDates, setSelectedDates] = useState([]); // 여러 날짜를 선택할 수 있도록 날짜 배열
	const calendarRefs = useRef({}); // 각 연도의 Calendar 컴포넌트 참조 저장

	// 연도별 애니메이션 설정
	const transitions = useTransition(years, {
		keys: (year) => year,
		from: { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
		enter: { opacity: 1, transform: 'translateY(0px) scale(1)' },
		leave: { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
		config: { tension: 200, friction: 20, clamp: true },
	});

	// 연도 변경 핸들러 - 새로운 연도 추가 또는 제거
	const handleYearChange = (newYear) => {
		setYears((prevYears) => {
			if (prevYears.includes(newYear)) {
				return prevYears.filter((year) => year !== newYear); // 이미 선택된 연도는 제거
			}
			return [...prevYears, newYear].sort((a, b) => a - b); // 새로운 연도 추가 후 정렬
		});
	};

	// 특정 연도로 부드럽게 스크롤
	const handleScrollToYear = (year) => {
		if (calendarRefs.current[year]) {
			calendarRefs.current[year].scrollIntoView({ behavior: 'smooth' });
		}
	};

	// Daybox 클릭 핸들러 - 선택된 날짜에 이벤트 추가 또는 제거
	const handleDayboxClick = (year, month, date, isFilled) => {
		const selectedDateString = `${year}-${month}-${date}`;

		if (isFilled) {
			// 선택된 날짜가 없을 경우 새로운 이벤트 추가
			if (!selectedDates.includes(selectedDateString)) {
				const newEvent = {
					title: `Sample title`,
					description: 'Sample description',
					details: 'Sample details',
					date: selectedDateString,
					image: 'https://via.placeholder.com/150',
				};
				setEvents((prevEvents) => [...prevEvents, newEvent]);
				setSelectedDates((prev) => [...prev, selectedDateString]); // 선택된 날짜 배열에 추가
			}
		} else {
			// 선택된 날짜가 해제되면 이벤트 제거
			setEvents((prevEvents) => prevEvents.filter((event) => event.date !== selectedDateString));
			setSelectedDates((prev) => prev.filter((date) => date !== selectedDateString)); // 선택된 날짜 배열에서 삭제
		}
	};

	// 연도별로 이벤트 필터링
	const getEventsForYear = (year) => {
		return events
			.filter((event) => event.date.startsWith(year.toString()))
			.sort((a, b) => new Date(a.date) - new Date(b.date));
	};

	return (
		<div className='Homepage'>
			{/* Background Floating Circles */}
			<div className='floating-circle'></div>
			<div className='floating-circle'></div>
			<div className='floating-circle'></div>

			<div className='section-1'>
				<UserProfile
					imageSrc={require('../assets/image/user.png')}
					name='User Name'
					description='Some user description or details.'
					age={30}
					location='Seoul, South Korea'
					badges={['Contributor', 'Top Reviewer', 'Early Adopter']}
				/>

				<SelectBox
					selectedYears={years} // 현재 선택된 연도 배열 전달
					onYearChange={handleYearChange} // 연도 변경 핸들러 전달
					onScrollToYear={handleScrollToYear} // 특정 연도로 스크롤하는 핸들러 전달
				/>
			</div>
			<div className='section-2'>
				{/* 연도별 Calendar와 EventList 쌍으로 렌더링 */}
				{transitions((style, year) => (
					<animated.div style={style} key={year} className='year-container'>
						<div ref={(el) => (calendarRefs.current[year] = el)}>
							{' '}
							{/* 특정 연도에 대한 참조 저장 */}
							<Calendar year={year} onDayClick={handleDayboxClick} /> {/* 캘린더 컴포넌트 */}
							{/* 마지막 연도가 아닐 때만 구분선 렌더링 */}
							{year !== years[years.length - 1] && <div className='calendar-divider'></div>}
						</div>
						<EventList year={year} events={getEventsForYear(year)} /> {/* 해당 연도의 이벤트 리스트 */}
					</animated.div>
				))}
			</div>
		</div>
	);
};

export default Homepage;

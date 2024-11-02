import React, { useState, useRef } from 'react';
import Calendar from '../components/Calendar';
import SelectBox from '../components/SelectBox';
import EventList from '../components/EventList';
import UserProfile from '../components/UserProfile';
import { useTransition, animated } from '@react-spring/web';
import './HomePage.css';
import userImage from '../assets/image/user.png'; 

const HomePage = () => {
    const [years, setYears] = useState([new Date().getFullYear()]); // 선택된 연도들 저장
    // const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
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

    // 모달 열기/닫기
    // const toggleModal = () => setIsModalOpen(!isModalOpen);

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
            setEvents((prevEvents) => prevEvents.filter(event => event.date !== selectedDateString));
            setSelectedDates((prev) => prev.filter(date => date !== selectedDateString)); // 선택된 날짜 배열에서 삭제
        }
    };

    // 선택된 날짜의 이벤트만 필터링 및 날짜순 정렬
    const filteredEvents = events
        .filter(event => selectedDates.includes(event.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="HomePage">
            <div className="section-1">
                <UserProfile 
                    imageSrc={require('../assets/image/user.png')} 
                    name="User Name" 
                    description="Some user description or details."
                    age={30}
                    location="Seoul, South Korea"
                    badges={["Contributor", "Top Reviewer", "Early Adopter"]}
                />

                <SelectBox
                    selectedYears={years} // 현재 선택된 연도 배열 전달
                    onYearChange={handleYearChange} // 연도 변경 핸들러 전달
                    onScrollToYear={handleScrollToYear} // 특정 연도로 스크롤하는 핸들러 전달
                />
            </div>
            <div className="section-2">
                {/* 홈페이지 타이틀 */}
                <span className="HomePage-title">Calendar Name</span>
                
                {/* 연도별 Calendar 컴포넌트 렌더링 */}
                {transitions((style, year, _, index) => (
                    <animated.div style={style} key={year}>
                        {index > 0 && <div className="divider" />} {/* 각 연도 사이에 구분선 추가 */}
                        <div ref={(el) => (calendarRefs.current[year] = el)}> {/* 특정 연도에 대한 참조 저장 */}
                            <Calendar year={year} onDayClick={handleDayboxClick} /> {/* 달력 컴포넌트 */}
                        </div>
                    </animated.div>
                ))}
            </div>
            <div className="section-3">
                {/* 선택된 날짜에 대한 이벤트 목록 */}
                <EventList events={filteredEvents} />
            </div>
        </div>
    );
};

export default HomePage;

// Homepage.jsx
import React, { useState, useRef } from 'react';
import Calendar from '../components/Calendar';
import Modal from '../components/Modal';
import Selectbox from '../components/Selectbox';
import EventList from '../components/EventList';
import { useTransition, animated } from '@react-spring/web';
import './Homepage.css';

const Homepage = () => {
    const [years, setYears] = useState([new Date().getFullYear()]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]); // 여러 날짜를 선택할 수 있도록 수정
    const calendarRefs = useRef({});

    const transitions = useTransition(years, {
        keys: (year) => year,
        from: { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
        enter: { opacity: 1, transform: 'translateY(0px) scale(1)' },
        leave: { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
        config: { tension: 200, friction: 20, clamp: true },
    });

    const handleYearChange = (newYear) => {
        setYears((prevYears) => {
            if (prevYears.includes(newYear)) {
                return prevYears.filter((year) => year !== newYear);
            }
            return [...prevYears, newYear].sort((a, b) => a - b);
        });
    };

    const handleScrollToYear = (year) => {
        if (calendarRefs.current[year]) {
            calendarRefs.current[year].scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleDayboxClick = (year, month, date, isFilled) => {
        const selectedDateString = `${year}-${month}-${date}`;

        if (isFilled) {
            // 선택된 날짜가 없으면 새 이벤트 추가
            if (!selectedDates.includes(selectedDateString)) {
                const newEvent = {
                    title: `Event for ${selectedDateString}`,
                    description: 'Sample description',
                    details: 'Sample details',
                    date: selectedDateString,
                    image: 'https://via.placeholder.com/150',
                };
                setEvents((prevEvents) => [...prevEvents, newEvent]);
                setSelectedDates((prev) => [...prev, selectedDateString]); // 선택된 날짜 추가
            }
        } else {
            // 이미 선택된 날짜가 해제되면 이벤트 삭제
            setEvents((prevEvents) => prevEvents.filter(event => event.date !== selectedDateString));
            setSelectedDates((prev) => prev.filter(date => date !== selectedDateString)); // 선택된 날짜에서 삭제
        }
    };

    // 선택된 날짜에 대한 모든 이벤트 필터링 및 정렬
    const filteredEvents = events
        .filter(event => selectedDates.includes(event.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜순 정렬 추가

    return (
        <div className="homepage">
            <div className="section-1">
                <button onClick={toggleModal}>
                    {isModalOpen ? 'Hide Selectbox' : 'Show Selectbox'}
                </button>
            </div>
            <div className="section-2">
                <span className="homepage-title">Seungwon Lee</span>
                {transitions((style, year, _, index) => (
                    <animated.div style={style} key={year}>
                        {index > 0 && <div className="divider" />}
                        <div ref={(el) => (calendarRefs.current[year] = el)}>
                            <Calendar year={year} onDayClick={handleDayboxClick} />
                        </div>
                    </animated.div>
                ))}
            </div>
            <div className="section-3">
                <EventList events={filteredEvents} /> {/* 선택된 날짜에 대한 이벤트만 표시 */}
            </div>

            {isModalOpen && (
                <Modal onClose={toggleModal}>
                    <Selectbox
                        selectedYears={years}
                        onYearChange={handleYearChange}
                        onScrollToYear={handleScrollToYear}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Homepage;

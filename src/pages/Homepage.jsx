// Homepage.jsx
import React, { useState, useRef } from 'react';
import Calendar from '../components/Calendar';
import Daybox from '../components/Daybox'; // Daybox import 추가
import Modal from '../components/Modal';
import Selectbox from '../components/Selectbox'; // Selectbox import 추가
import EventList from '../components/EventList';
import './Homepage.css';

const Homepage = () => {
    const [years, setYears] = useState([new Date().getFullYear()]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRefs = useRef({});

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

    // 날짜 클릭 시 이벤트 추가 핸들러
    const handleDayboxClick = (date) => {
        const newEvent = {
            title: `Event for ${date}`,
            description: 'Sample description',
            details: 'Sample details',
            date,
            image: 'https://via.placeholder.com/150',
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    return (
        <div className="homepage">
            <div className="section-1">
                <button onClick={toggleModal}>
                    {isModalOpen ? 'Hide Selectbox' : 'Show Selectbox'}
                </button>
            </div>
            <div className="section-2">
                <span className="homepage-title">Seungwon Lee</span>
                {years.map((year, index) => (
                    <React.Fragment key={year}>
                        {index > 0 && <div className="divider" />} 
                        <div ref={(el) => (calendarRefs.current[year] = el)}>
                            <Calendar year={year} onDayClick={handleDayboxClick} />
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="section-3">
                <EventList events={events} />
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

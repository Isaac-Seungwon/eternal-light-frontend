// Homepage.jsx
import React, { useState, useRef } from 'react';
import Calendar from '../components/Calendar';
import Selectbox from '../components/Selectbox';
import './Homepage.css';

const Homepage = () => {
    const [years, setYears] = useState([new Date().getFullYear()]);
    const calendarRefs = useRef({}); // 각 연도를 참조할 객체 생성

    const handleYearChange = (newYear) => {
        setYears((prevYears) => {
            if (prevYears.includes(newYear)) {
                return prevYears.filter((year) => year !== newYear);
            }
            const updatedYears = [...prevYears, newYear].sort((a, b) => a - b);
            return updatedYears;
        });
    };

    const handleScrollToYear = (year) => {
        if (calendarRefs.current[year]) {
            calendarRefs.current[year].scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="homepage">
            <div className="section-1">
                <Selectbox selectedYears={years} onYearChange={handleYearChange} onScrollToYear={handleScrollToYear} />
            </div>
            <div className="section-2">
                <h1>Seungwon Lee</h1>
                {years.map((year) => (
                    <div key={year} ref={(el) => (calendarRefs.current[year] = el)}>
                        <Calendar year={year} />
                    </div>
                ))}
            </div>
            <div className="section-3">
                {/* 여기서 3번째 섹션의 내용을 추가할 수 있습니다. */}
            </div>
        </div>
    );
};

export default Homepage;

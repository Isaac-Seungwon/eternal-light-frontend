// Calendar.jsx
import React, { useState, useRef, useEffect } from 'react';
import Month from './Month';
import './Calendar.css';

const Calendar = ({ year, onDayClick, onTitleHeightChange }) => { 
    const [filledDates, setFilledDates] = useState({}); // 날짜의 채워짐 상태 관리
    const titleRef = useRef(null); // 제목 요소 참조

    const months = [
        { name: "January", days: 31 },
        { name: "February", days: year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28 },
        { name: "March", days: 31 },
        { name: "April", days: 30 },
        { name: "May", days: 31 },
        { name: "June", days: 30 },
        { name: "July", days: 31 },
        { name: "August", days: 31 },
        { name: "September", days: 30 },
        { name: "October", days: 31 },
        { name: "November", days: 30 },
        { name: "December", days: 31 },
    ];

    // 날짜 클릭 핸들러
    const handleToggleDate = (monthIndex, date) => {
        const monthKey = monthIndex + 1;

        if (onDayClick) {
            onDayClick(year, monthKey, date, !filledDates[year]?.[monthKey]?.[date]);
        }

        setFilledDates((prev) => ({
            ...prev,
            [year]: {
                ...prev[year],
                [monthKey]: {
                    ...prev[year]?.[monthKey],
                    [date]: !prev[year]?.[monthKey]?.[date], // 날짜 상태 토글
                },
            },
        }));
    };

    // 제목 높이를 부모 컴포넌트에 전달
    useEffect(() => {
        if (titleRef.current && onTitleHeightChange) {
            onTitleHeightChange(year, titleRef.current.offsetHeight);
        }
    }, [onTitleHeightChange, year]);

    return (
        <div className="calendar-container">
            {/* 캘린더의 연도 제목 표시 */}
            <h2 className="calendar-title" ref={titleRef}>{year}</h2>
            <div className="calendar">
                {/* 각 월의 Month 컴포넌트를 순회하여 생성 */}
                {months.map((month, index) => (
                    <div key={index} className="month-wrapper">
                        <Month
                            month={month.name}
                            days={month.days}
                            filledDates={filledDates[year]?.[index + 1] || {}}
                            onToggleDate={handleToggleDate}
                            monthIndex={index}
                            year={year}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;

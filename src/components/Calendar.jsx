// Calendar.jsx
import React, { useState, useRef, useEffect } from 'react';
import Month from './Month';
import './Calendar.css';

const Calendar = ({ year, onDayClick, onTitleHeightChange }) => { 
    const [filledDates, setFilledDates] = useState({});
    const titleRef = useRef(null);

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
                    [date]: !prev[year]?.[monthKey]?.[date],
                },
            },
        }));
    };

    // 제목 높이를 계산해 전달
    useEffect(() => {
        if (titleRef.current && onTitleHeightChange) {
            onTitleHeightChange(year, titleRef.current.offsetHeight);
        }
    }, [onTitleHeightChange, year]);

    return (
        <div className="calendar-container">
            <h2 className="calendar-title" ref={titleRef}>{year}</h2>
            <div className="calendar">
                {months.map((month, index) => (
                    <Month
                        key={index}
                        month={month.name}
                        days={month.days}
                        filledDates={filledDates[year]?.[index + 1] || {}}
                        onToggleDate={handleToggleDate}
                        monthIndex={index}
                        year={year}
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

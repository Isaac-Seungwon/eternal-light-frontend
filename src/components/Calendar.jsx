// Calendar.jsx
import React, { useState } from 'react';
import Month from './Month';
import './Calendar.css';

const Calendar = ({ year, onDayClick }) => { // onDayClick prop 추가
    const [filledDates, setFilledDates] = useState({});

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
        
        // 날짜가 클릭되었을 때 onDayClick 호출
        if (onDayClick) {
            onDayClick(year, monthKey, date); // 년, 월, 날짜 전달
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

    return (
        <div className="calendar-container">
            <span>- {year} -</span>
            <div className="calendar">
                {months.map((month, index) => (
                    <Month
                        key={index}
                        month={month.name}
                        days={month.days}
                        filledDates={filledDates[year]?.[index + 1] || {}} // 해당 년도의 월 상태 전달
                        onToggleDate={handleToggleDate}
                        monthIndex={index} // 월 인덱스 전달
                        year={year} // year 전달
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

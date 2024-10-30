// Calendar.jsx
import React, { useState } from 'react';
import Month from './Month';
import './Calendar.css';

const Calendar = ({ year, onDayClick }) => { 
    // 선택된 날짜를 저장하는 상태를 관리
    const [filledDates, setFilledDates] = useState({});

    // 각 월의 이름과 일 수 정의 (윤년 조건 포함)
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

    // 특정 날짜 클릭 시 호출되는 함수
    const handleToggleDate = (monthIndex, date) => {
        const monthKey = monthIndex + 1; // 월을 1부터 시작하도록 맞춤

        // 날짜 클릭 시 외부 onDayClick 콜백 호출, 선택 여부 전달
        if (onDayClick) {
            onDayClick(year, monthKey, date, !filledDates[year]?.[monthKey]?.[date]);
        }

        // filledDates 상태 업데이트, 클릭된 날짜의 선택 여부를 토글
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
            {/* 캘린더의 연도 제목 표시 */}
            <span>- {year} -</span>
            <div className="calendar">
                {/* 각 월의 Month 컴포넌트를 순회하여 생성 */}
                {months.map((month, index) => (
                    <Month
                        key={index} // 고유 키 값 설정
                        month={month.name} // 월 이름 전달
                        days={month.days} // 일 수 전달
                        filledDates={filledDates[year]?.[index + 1] || {}} // 해당 연도/월의 선택된 날짜 전달
                        onToggleDate={handleToggleDate} // 날짜 클릭 핸들러 전달
                        monthIndex={index} // 월 인덱스 전달
                        year={year} // 연도 전달
                    />
                ))}
            </div>
        </div>
    );
};

export default Calendar;

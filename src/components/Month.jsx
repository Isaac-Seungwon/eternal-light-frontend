import React from 'react';
import Daybox from './Daybox';
import './Month.css';

const Month = ({ month, days, filledDates, onToggleDate, monthIndex, year }) => {
    const weeks = [];
    const dates = Array.from({ length: days }, (_, i) => (i + 1));

    // 월의 첫날이 무슨 요일인지 계산 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay(); // 0~6

    // 주의 첫 날짜가 맞춰질 수 있도록 빈 날짜 추가
    const emptyDays = Array.from({ length: firstDayOfMonth }, () => null); // 첫 주의 빈 날짜 추가

    // 모든 날짜를 하나의 배열에 결합
    const allDays = [...emptyDays, ...dates];

    // 날짜를 주로 나누기
    for (let i = 0; i < allDays.length; i += 7) {
        weeks.push(allDays.slice(i, i + 7)); // 7일씩 잘라서 주 배열에 추가
    }

    return (
        <div className="month">
            <h2>{month}</h2>
            <div className="month-calendar">
                {weeks.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                        {week.map((date, dateIndex) => (
                            date !== null ? ( // 날짜가 있을 때만 박스 생성
                                <Daybox 
                                    key={dateIndex} 
                                    filled={filledDates[date] || false} // 해당 날짜의 상태 확인
                                    onClick={() => onToggleDate(monthIndex, date)} // 클릭 시 상태 변경
                                >
                                    {date} {/* 날짜가 있을 경우 표시 */}
                                </Daybox>
                            ) : (
                                <div key={dateIndex} className="empty-day-box"></div> // 빈 날짜에 대한 박스
                            )
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Month;

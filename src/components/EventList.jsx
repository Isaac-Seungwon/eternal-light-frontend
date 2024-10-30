import React, { useState } from 'react';
import './EventList.css';

// 월 숫자를 영문으로 변환하는 함수
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const EventList = ({ events }) => {
    const [expandedIndex, setExpandedIndex] = useState(null); // 확장된 이벤트의 인덱스 상태

    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // 클릭 시 세부 정보 토글
    };

    // 이벤트를 연도와 월에 따라 그룹화
    const groupedEvents = events.reduce((acc, event) => {
        const [year, month] = event.date.split('-'); // YYYY-MM-DD 형식에서 연도와 월 추출
        if (!acc[year]) {
            acc[year] = {};
        }
        if (!acc[year][month]) {
            acc[year][month] = [];
        }
        acc[year][month].push(event);
        return acc;
    }, {});

    return (
        <div className="event-list">
            <span className="event-list-title"></span>
            {Object.entries(groupedEvents).map(([year, months]) => (
                <div key={year}>
                    <span className="event-year">- {year} -</span> {/* 연도 표시 */}
                    {Object.entries(months).map(([month, events]) => (
                        <div key={month}>
                            <span className="event-month">{monthNames[month - 1]}</span> {/* 월을 영문으로 표시 */}
                            {events.map((event, index) => (
                                <div key={index} className="event-item">
                                    <div className="event-summary" onClick={() => toggleDetails(`${year}-${month}-${index}`)}>
                                        <div className="event-image">
                                            {event.image && <img src={event.image} alt="Event" />}
                                        </div>
                                        <div className="event-info">
                                            <span className="event-title">{event.title}</span>
                                            <span className="event-description">{event.description}</span>
                                            <span className="event-date">{event.date}</span>
                                        </div>
                                    </div>
                                    {/* 연도와 월이 같은 경우에만 디테일 보여주기 */}
                                    {expandedIndex === `${year}-${month}-${index}` && (
                                        <div className="event-details">
                                            <span className="event-details-content">{event.details}</span> {/* 추가 세부 내용 */}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            {events.length === 0 && <span>No events selected.</span>}
        </div>
    );
};

export default EventList;

// EventList.jsx
import React from 'react';
import './EventList.css';

const EventList = ({ events }) => {
    return (
        <div className="event-list">
            {/* 리스트 제목 */}
            <h2>Selected Dates</h2>
            {/* 이벤트가 하나 이상 존재하면 이벤트 목록을 표시, 아니면 메시지 표시 */}
            {events.length > 0 ? (
                events.map((event, index) => (
                    // 이벤트 아이템 구성 요소
                    // 'title', 'content', 'details', 'date' 등의 정보와 이미지가 있을 경우 이미지를 표시
                    <div key={index} className="event-item">
                        <h3>{event.title}</h3> {/* 이벤트 제목 */}
                        <p>{event.content}</p> {/* 이벤트 간략 내용 */}
                        <p>{event.details}</p> {/* 이벤트 상세 설명 */}
                        <span>{event.date}</span> {/* 이벤트 날짜 */}
                        {event.image && <img src={event.image} alt="Event" />} {/* 이벤트 이미지 */}
                    </div>
                ))
            ) : (
                // 이벤트가 없을 경우 표시할 메시지
                <p>No events selected.</p>
            )}
        </div>
    );
};

export default EventList;

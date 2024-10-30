// EventList.jsx
import React, { useState } from 'react';
import './EventList.css';

const EventList = ({ events }) => {
    const [expandedIndex, setExpandedIndex] = useState(null); // 확장된 이벤트의 인덱스 상태

    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index); // 클릭 시 세부 정보 토글
    };

    return (
        <div className="event-list">
            <span className="event-list-title">Selected Dates</span>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index} className="event-item">
                        <div className="event-summary" onClick={() => toggleDetails(index)}>
                            <div className="event-image">
                                {event.image && <img src={event.image} alt="Event" />}
                            </div>
                            <div className="event-info">
                                <span className="event-title">{event.title}</span>
                                <span className="event-description">{event.description}</span>
                                <span className="event-date">{event.date}</span>
                            </div>
                        </div>
                        {expandedIndex === index && (
                            <div className="event-details">
                                <span>{event.details}</span>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <span className="no-events">No events selected.</span>
            )}
        </div>
    );
};

export default EventList;

// EventList.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EventList.css';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const EventList = ({ events }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    
    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const groupedEvents = events.reduce((acc, event) => {
        const [year, month] = event.date.split('-');
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
            <span className="event-list-title">Selected Dates</span>
            {Object.entries(groupedEvents).map(([year, months]) => (
                <div key={year}>
                    <span className="event-year">- {year} -</span>
                    {Object.entries(months).map(([month, events]) => (
                        <div key={month}>
                            <span className="event-month">{monthNames[month - 1]}</span>
                            {events.map((event, index) => (
                                <motion.div
                                    key={`${year}-${month}-${event.title}-${index}`} // 고유한 키 사용
                                    className="event-item"
                                    initial={{ opacity: 0, translateY: -10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    exit={{ opacity: 0, translateY: -10 }}
                                >
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
                                    {expandedIndex === `${year}-${month}-${index}` && ( // 고유한 키로 비교
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: "auto" }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="event-details"
                                        >
                                            <span className="event-details-content">{event.details}</span>
                                        </motion.div>
                                    )}
                                </motion.div>
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

// EventList.jsx
import React from 'react';
import './EventList.css';

const EventList = ({ events }) => {
    return (
        <div className="event-list">
            <h2>Selected Dates</h2>
            {events.length > 0 ? (
                events.map((event, index) => (
                    <div key={index} className="event-item">
                        <h3>{event.title}</h3>
                        <p>{event.content}</p>
                        <p>{event.details}</p>
                        <span>{event.date}</span>
                        {event.image && <img src={event.image} alt="Event" />}
                    </div>
                ))
            ) : (
                <p>No events selected.</p>
            )}
        </div>
    );
};

export default EventList;
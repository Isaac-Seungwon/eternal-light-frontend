// EventList.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EventList.css';
import Modal from './Modal';

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const EventList = ({ events }) => {
    const [activeEvents, setActiveEvents] = useState([]); // 클릭한 이벤트 목록 관리

    const toggleModal = (event) => {
        const key = `${event.date}-${event.title}`; // 키 생성
        if (activeEvents.includes(key)) {
            setActiveEvents(activeEvents.filter(activeKey => activeKey !== key)); // 이미 열려 있는 경우 닫기
        } else {
            setActiveEvents([...activeEvents, key]); // 새 이벤트 모달 열기
        }
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
            {Object.entries(groupedEvents).map(([year, months]) => (
                <div key={year}>
                    <span className="event-list-title event-year">Lights of {year}</span>
                    {Object.entries(months).map(([month, events]) => (
                        <div key={month}>
                            <span className="event-month">{monthNames[month - 1]}</span>
                            {events.map((event) => {
                                const key = `${event.date}-${event.title}`; // 키 생성
                                return (
                                    <motion.div
                                        key={event.id} // ID로 고유성 보장
                                        className={`event-item ${activeEvents.includes(key) ? 'active' : ''}`} // 클릭한 이벤트에 대한 클래스 추가
                                        onClick={() => toggleModal(event)} // 이벤트 클릭 시 모달 열기
                                        initial={{ opacity: 0, translateY: -10 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        exit={{ opacity: 0, translateY: -10 }}
                                    >
                                        <div className="event-summary">
                                            <div className="event-image">
                                                {event.image && <img src={event.image} alt="Event" />}
                                            </div>
                                            <div className="event-info">
                                                <span className="event-title">{event.title}</span>
                                                <span className="event-description">{event.description}</span>
                                                <span className="event-date">{event.date}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}
            {events.length === 0 && <span>No lights selected.</span>}

            {activeEvents.map(key => ( // activeKey가 있을 때만 모달 표시
                <Modal
                    key={key} // 고유 키로 모달 설정
                    onClose={() => setActiveEvents(activeEvents.filter(activeKey => activeKey !== key))} // 모달 닫기 핸들러
                    event={events.find(event => `${event.date}-${event.title}` === key)} // activeKey에 해당하는 이벤트 전달
                />
            ))}
        </div>
    );
};

export default EventList;

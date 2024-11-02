// SelectBox.jsx
import React, { useState, useEffect, useRef } from 'react';
import './SelectBox.css';
import Notification from './Notification';

const SelectBox = ({ selectedYears = [], onYearChange, onScrollToYear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastSelectedYear, setLastSelectedYear] = useState(
        selectedYears[selectedYears.length - 1] || new Date().getFullYear()
    );
    const dropdownRef = useRef();
    const [previousYear, setPreviousYear] = useState(lastSelectedYear);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const selectedOption = dropdownRef.current.querySelector(`.select-box-option[data-year='${lastSelectedYear}']`);
            selectedOption?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isOpen, lastSelectedYear]);

    const handleYearSelect = (year, event) => {
        if (event.shiftKey && previousYear !== null) {
            const start = Math.min(previousYear, year);
            const end = Math.max(previousYear, year);
            const newYears = Array.from({ length: end - start + 1 }, (_, i) => start + i);

            const filteredYears = newYears.filter(newYear => !selectedYears.includes(newYear));
            // 15개까지만 허용
            if (selectedYears.length + filteredYears.length <= 15) {
                filteredYears.forEach((newYear) => {
                    onYearChange(newYear);
                });
            } else {
                showAlert();
            }
        } else {
            if (selectedYears.includes(year)) {
                // 이미 선택된 연도라면 해제
                onYearChange(year, true); // true로 해제 플래그 전달
            } else {
                // 새로 추가
                if (selectedYears.length < 15) {
                    onYearChange(year);
                } else {
                    showAlert();
                }
            }
        }
        setLastSelectedYear(year);
        setPreviousYear(year);
    };

    const showAlert = () => {
        setNotificationMessage('15개 이상을 선택하실 수 없습니다!');
        setShowNotification(true);
    };

    const handleYearHashtagClick = (year) => {
        onScrollToYear(year);
        setLastSelectedYear(year);
        setPreviousYear(year);
    };

    return (
        <div className="select-box" ref={dropdownRef}>
            <div className="select-box-selected" onClick={toggleDropdown}>
                {lastSelectedYear} Year
            </div>
            {isOpen && (
                <div className="select-box-dropdown">
                    <div className="select-box-options">
                        {[...Array(3001)].map((_, index) => (
                            <div
                                key={index}
                                data-year={index}
                                className={`select-box-option ${selectedYears.includes(index) ? 'selected' : ''}`}
                                onClick={(event) => handleYearSelect(index, event)}
                            >
                                {index}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="selected-years">
                {selectedYears.map((year) => (
                    <span 
                        key={year} 
                        className="year-hashtag" 
                        onClick={() => handleYearHashtagClick(year)}
                    >
                        #{year}
                    </span>
                ))}
            </div>
            {showNotification && (
                <Notification message={notificationMessage} onClose={() => setShowNotification(false)} />
            )}
        </div>
    );
};

export default SelectBox;

// Selectbox.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Selectbox.css';

const Selectbox = ({ selectedYears = [], onYearChange, onScrollToYear }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastSelectedYear, setLastSelectedYear] = useState(
        selectedYears[selectedYears.length - 1] || new Date().getFullYear()
    ); // 마지막 선택된 연도 또는 기본값
    const dropdownRef = useRef();
    const [previousYear, setPreviousYear] = useState(lastSelectedYear); // 기본값으로 초기화

    // 드롭다운 열기/닫기 핸들러
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // 드롭다운 닫기 (외부 클릭 시)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 드롭다운 열릴 때 마지막 선택된 연도로 부드럽게 스크롤
    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const selectedOption = dropdownRef.current.querySelector(`.select-box-option[data-year='${lastSelectedYear}']`);
            selectedOption?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isOpen, lastSelectedYear]);

    // 연도 선택 핸들러
    const handleYearSelect = (year, event) => {
        if (event.shiftKey && previousYear !== null) {
            const start = Math.min(previousYear, year);
            const end = Math.max(previousYear, year);
            const newYears = Array.from({ length: end - start + 1 }, (_, i) => start + i);
            newYears.forEach((newYear) => {
                if (!selectedYears.includes(newYear)) {
                    onYearChange(newYear); // 중간 연도 모두 선택
                }
            });
        } else {
            if (!selectedYears.includes(year)) {
                onYearChange(year);
            }
        }
        setLastSelectedYear(year);
        setPreviousYear(year); // 현재 선택된 연도를 이전 연도로 설정
    };

    // 해시태그 클릭 시 연도 선택 및 업데이트
    const handleYearHashtagClick = (year) => {
        onScrollToYear(year); // 해시태그 클릭 시 스크롤
        setLastSelectedYear(year); // select-box-selected 업데이트
        setPreviousYear(year); // 이전 선택 연도 업데이트
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
                                data-year={index} // 연도 데이터를 속성으로 추가
                                className={`select-box-option ${selectedYears.includes(index) ? 'selected' : ''}`}
                                onClick={(event) => handleYearSelect(index, event)} // 클릭 이벤트 전달
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
                        onClick={() => handleYearHashtagClick(year)} // 해시태그 클릭 시 선택 연도 업데이트
                    >
                        #{year}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Selectbox;

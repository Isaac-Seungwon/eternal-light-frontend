// Selectbox.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Selectbox.css';

const Selectbox = ({ selectedYears = [], onYearChange, onScrollToYear }) => {
    const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열려 있는지 여부를 저장하는 상태
    const [lastSelectedYear, setLastSelectedYear] = useState(
        selectedYears[selectedYears.length - 1] || new Date().getFullYear()
    ); // 마지막으로 선택된 연도 또는 기본값으로 현재 연도를 설정
    const dropdownRef = useRef(); // 드롭다운 DOM 요소에 대한 참조 생성
    const [previousYear, setPreviousYear] = useState(lastSelectedYear); // 마지막 선택된 연도 저장

    // 드롭다운 열기 및 닫기 핸들러
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // 드롭다운 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // 드롭다운 외부 클릭 시 닫음
            }
        };
        document.addEventListener('mousedown', handleClickOutside); // 클릭 이벤트 리스너 등록
        return () => document.removeEventListener('mousedown', handleClickOutside); // 언마운트 시 이벤트 리스너 제거
    }, []);

    // 드롭다운 열릴 때 마지막 선택된 연도로 부드럽게 스크롤
    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            const selectedOption = dropdownRef.current.querySelector(`.select-box-option[data-year='${lastSelectedYear}']`);
            selectedOption?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // 선택된 연도로 부드럽게 스크롤
        }
    }, [isOpen, lastSelectedYear]);

    // 연도 선택 시 실행되는 함수
    const handleYearSelect = (year, event) => {
        if (event.shiftKey && previousYear !== null) {
            // Shift 키를 누르고 연도를 클릭하면 중간 연도를 포함하여 모두 선택
            const start = Math.min(previousYear, year);
            const end = Math.max(previousYear, year);
            const newYears = Array.from({ length: end - start + 1 }, (_, i) => start + i); // 중간 연도 배열 생성
            newYears.forEach((newYear) => {
                if (!selectedYears.includes(newYear)) {
                    onYearChange(newYear); // 중간 연도를 모두 선택하여 업데이트
                }
            });
        } else {
            if (!selectedYears.includes(year)) {
                onYearChange(year); // 중복이 아닌 경우에만 연도 추가
            }
        }
        setLastSelectedYear(year); // 마지막 선택 연도 업데이트
        setPreviousYear(year); // 현재 선택된 연도를 이전 연도로 저장
    };

    // 해시태그 클릭 시 해당 연도로 스크롤
    const handleYearHashtagClick = (year) => {
        onScrollToYear(year); // 스크롤 함수 호출
        setLastSelectedYear(year); // 해시태그 클릭 시 lastSelectedYear 업데이트
        setPreviousYear(year); // 이전 연도 업데이트
    };

    return (
        <div className="select-box" ref={dropdownRef}>
            {/* 선택된 연도 표시 영역 */}
            <div className="select-box-selected" onClick={toggleDropdown}>
                {lastSelectedYear} Year
            </div>
            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <div className="select-box-dropdown">
                    <div className="select-box-options">
                        {[...Array(3001)].map((_, index) => (
                            <div
                                key={index}
                                data-year={index} // 각 연도에 해당하는 데이터 속성 추가
                                className={`select-box-option ${selectedYears.includes(index) ? 'selected' : ''}`} // 선택된 연도 스타일 적용
                                onClick={(event) => handleYearSelect(index, event)} // 클릭 이벤트로 연도 선택
                            >
                                {index} {/* 연도 표시 */}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* 선택된 연도의 해시태그 목록 */}
            <div className="selected-years">
                {selectedYears.map((year) => (
                    <span 
                        key={year} 
                        className="year-hashtag" 
                        onClick={() => handleYearHashtagClick(year)} // 해시태그 클릭 시 연도 선택
                    >
                        #{year}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Selectbox;

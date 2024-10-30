// Modal.jsx
import React, { useState, useRef } from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false); // 모달 최소화 상태 관리
    const [position, setPosition] = useState({ x: 0, y: 0 }); // 모달 위치 상태 관리
    const modalRef = useRef(null); // 모달 DOM 참조
    const offset = useRef({ x: 0, y: 0 }); // 드래그 시 마우스 위치와 모달의 위치 차이 저장

    // 최소화 상태를 토글하는 함수
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    // 드래그 시작 시 호출되는 함수
    const handleMouseDown = (e) => {
        // 마우스와 모달의 위치 차이를 기록
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        // 드래그 이벤트 등록
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // 드래그 중에 모달 위치를 업데이트하는 함수
    const handleMouseMove = (e) => {
        // 모달의 새로운 위치를 계산하여 설정
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y
        });
    };

    // 드래그 종료 시 이벤트 해제
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="modal-overlay">
            {/* 모달 컨테이너 */}
            <div
                className={`modal ${isMinimized ? 'minimized' : ''}`}
                ref={modalRef}
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                {/* 모달 헤더, 드래그 및 버튼 포함 */}
                <div className="modal-header" onMouseDown={handleMouseDown}>
                    <button className="modal-minimize" onClick={toggleMinimize}>
                        {isMinimized ? '□' : '_'} {/* 최소화/복구 버튼 */}
                    </button>
                    <button className="modal-close" onClick={onClose}>
                        × {/* 닫기 버튼 */}
                    </button>
                </div>
                {/* 최소화 상태가 아닐 경우에만 자식 콘텐츠 표시 */}
                {!isMinimized && <div className="modal-content">{children}</div>}
            </div>
        </div>
    );
};

export default Modal;

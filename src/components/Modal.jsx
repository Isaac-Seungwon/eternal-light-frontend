// Modal.jsx
import React, { useState, useRef, useEffect } from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const modalRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const toggleMinimize = () => setIsMinimized(!isMinimized);

    // 드래그 시작
    const handleMouseDown = (e) => {
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // 드래그 중
    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y
        });
    };

    // 드래그 종료
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="modal-overlay">
            <div
                className={`modal ${isMinimized ? 'minimized' : ''}`}
                ref={modalRef}
                style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            >
                <div className="modal-header" onMouseDown={handleMouseDown}>
                    <button className="modal-minimize" onClick={toggleMinimize}>
                        {isMinimized ? '□' : '_'}
                    </button>
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                </div>
                {!isMinimized && <div className="modal-content">{children}</div>}
            </div>
        </div>
    );
};

export default Modal;

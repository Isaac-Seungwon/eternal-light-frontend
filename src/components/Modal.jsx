// Modal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ onClose, event }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableEvent, setEditableEvent] = useState(event);
    const [isDragging, setIsDragging] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setEditableEvent(event); // 이벤트가 변경될 때 editableEvent도 업데이트
    }, [event]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableEvent({
            ...editableEvent,
            [name]: value
        });
    };

    const handleEdit = () => setIsEditing(true);
    const handleSave = () => {
        // Save logic here (optional)
        setIsEditing(false);
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - modalPosition.x,
            y: e.clientY - modalPosition.y
        });
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            setModalPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    }, [isDragging, dragStart]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const modalContent = (
        <div className="modal-overlay">
            <div
                className="modal"
                style={{ transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)` }}
            >
                <div className="modal-header" onMouseDown={handleMouseDown}>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-content">
                    {isEditing ? (
                        <>
                            <input
                                name="title"
                                value={editableEvent.title}
                                onChange={handleInputChange}
                                className="modal-input"
                                placeholder="Event Title"
                            />
                            <input
                                name="date"
                                value={editableEvent.date}
                                onChange={handleInputChange}
                                className="modal-input"
                                placeholder="Event Date"
                            />
                            <input
                                name="image"
                                value={editableEvent.image}
                                onChange={handleInputChange}
                                className="modal-input"
                                placeholder="Image URL"
                            />
                            <textarea
                                name="description"
                                value={editableEvent.description}
                                onChange={handleInputChange}
                                className="modal-textarea"
                                placeholder="Description"
                            />
                            <button className="modal-save" onClick={handleSave}>Save</button>
                        </>
                    ) : (
                        <>
                            <h2>{editableEvent.title}</h2>
                            <p>{editableEvent.date}</p>
                            {editableEvent.image && <img src={editableEvent.image} alt="Event" className="event-image" />}
                            <p>{editableEvent.description}</p>
                            <button className="modal-edit" onClick={handleEdit}>Edit</button>
                        </>
                    )}
                    <button className="modal-delete" onClick={onClose}>Delete</button>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;

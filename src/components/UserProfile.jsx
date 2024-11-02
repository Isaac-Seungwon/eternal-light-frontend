// UserProfile.jsx
import React from 'react';
import './UserProfile.css';
import { FaMapMarkerAlt, FaBirthdayCake, FaCalendarDay } from 'react-icons/fa';

const UserProfile = ({ imageSrc, name, description, age, birthDate, location, badges }) => {
    return (
        <div className="user-profile">
            <img src={imageSrc} alt={`${name}'s profile`} className="user-profile-image" />
            <div className="user-profile-info">
                <h2 className="user-name">{name}</h2>
                <p className="user-description">{description}</p>
                <div className="user-details">
                    <p className="user-detail">
                        <FaBirthdayCake /> Age: {age}
                    </p>
                    <p className="user-detail">
                        <FaCalendarDay /> Birthdate: {birthDate}
                    </p>
                    <p className="user-detail">
                        <FaMapMarkerAlt /> {location}
                    </p>
                </div>
                <h3 className="achievement-title">Archivement</h3>
                <div className="user-badges">
                    {badges.map((badge, index) => (
                        <span key={index} className="user-badge">{badge}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

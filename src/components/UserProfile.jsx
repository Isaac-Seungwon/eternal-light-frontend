// UserProfile.jsx
import React from 'react';
import './UserProfile.css';

const UserProfile = ({ imageSrc, name, description, age, location, badges }) => {
    return (
        <div className="user-profile">
            <img src={imageSrc} alt={`${name}'s profile`} className="user-profile-image" />
            <div className="user-profile-info">
                <h2 className="user-name">{name}</h2>
                <p className="user-description">{description}</p>
                <p className="user-detail"><strong>Age:</strong> {age}</p>
                <p className="user-detail"><strong>Location:</strong> {location}</p>
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

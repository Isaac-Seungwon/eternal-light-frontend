// UserSettings.jsx
import React, { useState } from 'react';
import './UserSettings.css';

const UserSettings = () => {
	const [username, setUsername] = useState('John Doe');
	const [email, setEmail] = useState('johndoe@example.com');
	const [notifications, setNotifications] = useState(true);

	const handleSave = () => {
		alert('Settings saved!');
	};

	return (
		<div className='user-settings-page'>
			<h2>User Settings</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className='form-group'>
					<label>Username:</label>
					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className='form-group'>
					<label>Email:</label>
					<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className='form-group'>
					<label>Notifications:</label>
					<input
						type='checkbox'
						checked={notifications}
						onChange={(e) => setNotifications(e.target.checked)}
					/>
				</div>
				<button type='button' onClick={handleSave}>
					Save Changes
				</button>
			</form>
		</div>
	);
};

export default UserSettings;

// UserSettingsPage.jsx
import React from 'react';
import './UserSettingsPage.css';

const UserSettingsPage = () => (
	<div className='user-settings-page'>
		<h2>User Settings</h2>
		<p>Manage your account settings and preferences here.</p>
		<div className='setting-option'>
			<label>Change Username:</label>
			<input type='text' placeholder='Enter new username' />
		</div>
		<div className='setting-option'>
			<label>Update Email:</label>
			<input type='email' placeholder='Enter new email' />
		</div>
		<div className='setting-option'>
			<label>Change Password:</label>
			<input type='password' placeholder='Enter new password' />
		</div>
		<button className='save-button'>Save Changes</button>
	</div>
);

export default UserSettingsPage;

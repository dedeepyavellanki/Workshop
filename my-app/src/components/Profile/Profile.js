import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const { currentUser } = useSelector(state => state.workshopManagement);
    const navigate = useNavigate();
    
    // Fallback phone number handling
    const phone = currentUser?.phonenumber || currentUser?.phone || '0000000000';

    // Navigate to manage password page
    const managePassword = () => {
        navigate('/admin/profile/manage-password');
    };

    // Render Profile Component
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Profile</h1>
                <div className="profile-info">
                    <p><strong>Admin Name:</strong> {currentUser?.username || 'N/A'}</p>
                    <p><strong>Admin ID:</strong> {currentUser?.facultyId || 'N/A'}</p>
                    <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
                    <p><strong>Phone Number:</strong> {phone}</p>
                </div>
                <button className="manage-password-button" onClick={managePassword}>
                    Manage Password
                </button>
            </div>
        </div>
    );
}

export default Profile;

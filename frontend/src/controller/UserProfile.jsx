import React, { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { CgArrowLeft } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import './UserProfile.css'; // Ensure to include a custom CSS file

const UserProfile = () => {
  const { isLogged, usersData, loader } = useAuth();
  console.log("useData",usersData)

  return (
    <div className="user-profile-container">
      <Link to="/" className="back-link">
        <CgArrowLeft className="back-icon" />
      </Link>

      <div className="profile-wrapper">
        <div className="profile-info">
          <h2 className="profile-title">User Profile</h2>
          {loader ? (
            <p className="loading-text">Loading...</p>
          ) : isLogged ? (
            <div className="profile-card">
              <p><strong>Name:</strong> {usersData ? usersData?.name : 'Loading...'}</p>
              <p><strong>Email:</strong> {usersData ? usersData?.email : 'Loading...'}</p>
              <p><strong>Created At:</strong> {usersData ? new Date(usersData?.createdAt).toLocaleString() : 'Loading...'}</p>
            </div>
          ) : (
            <p className="login-prompt">Please login</p>
          )}
        </div>

        <div className="profile-background">
          <div className="animated-background"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

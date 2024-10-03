import React from 'react';
import "./ProfilePage.css"
import AuthButton from '../Buttons';

const ProfilePage = () => {
  return (
    <div className='profile-page'>
      <h1>Profile Page</h1>
      <p>This is your Profile Page.</p>
      <AuthButton/>
    </div>
  );
};

export default ProfilePage;

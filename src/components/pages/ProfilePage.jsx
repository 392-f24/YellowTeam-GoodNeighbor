import React from 'react';
import "./ProfilePage.css"
import AuthButton from '../Buttons';
import StarRate from "../starRate";
import { useState, useEffect } from "react";
import { renderStars } from "../renderStars";
import { useAuthState, useDbData } from '../../utilities/firebase';
import EditProfileModal from '../EditProfileModal'
import CreateUser from './CreateUser'

const ProfilePage = () => {

  const [user] = useAuthState();

  const user_id = user ? user.uid : "TESTING";

  const [usersData, usersError] = useDbData(`users/${user_id}`);

  //for waiting until the information is fetched. If timed out, then go to create Profile button.
  const [isDelayed, setIsDelayed] = useState(false); // State to control delayed rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayed(true); 
    }, 5000); 

    return () => clearTimeout(timer); 
  }, []);


  //edit profile
  const [openModal, setOpenModal] = useState(false);


  if (!user) {
    return <p>Loading user data...</p>;
  }

  if (!usersData) {
    return (
      <div className='profile-page'>
        {isDelayed ? (
          <>
          <p>It seems like you have not made an account with us. Create your profile now!</p>
          {/* <AuthButton/> */}
          <button className="white-custom-button" onClick={() => {
          setOpenModal(true);
        }}>Create Profile</button>

        {openModal && (
          <CreateUser
            closeModal={() => setOpenModal(false)}
            userId={user_id} // Pass userId to CreateUser to create profile with correct ID
          />

        )}
      </> ) : (
        <p>Loading user data...</p>
      )}
      {/* <AuthButton/> */}

      </div>
    )
    // return <p>User data loaded!</p>; 
  }
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className='profile-page'>
      {/* should be replaced with auth data */}
      <h1 className="user-name"> {user.displayName || "Anonymous"} </h1>  
      {/* Ensure user.displayName is not undefined */}

      {/* Stars */}
      <div className="starStyle">
        { renderStars(usersData.rate_score) }  {/* Pass the rateScore to renderStars */}
        <p className="ratingCountContainer">{usersData.rate_count}</p>
      </div>
      <p className="goodNeighborRanking">Good Neightbor Rating</p>

      {/* Stats */}
      <div className="StatsContainer">
        <div className="TasksBy">
          <h1 className="numberStyle"> {usersData.task_CBU || 0} </h1>
          <p className="textStyle">Tasks completed by User </p>
        </div>
        <div className="TasksFor">
          <h1 className="numberStyle">{usersData.task_CFU || 0}</h1>
          <p className="textStyle">Tasks completed for User </p>
        </div>

      </div>
         {/* //edit profile button */}
         <button className="white-custom-button" onClick={() => {
            setOpenModal(true);
          }}> Edit Profile</button>

          {openModal && (
            <EditProfileModal
              closeModal={() => setOpenModal(false)}
              userId={user_id} //passes userId to modal, avoids redundancy
              // initialLocation={usersData.location} // Pass user's initial location
            />
          )}      

      <AuthButton/>
    </div>
  );
};

export default ProfilePage;

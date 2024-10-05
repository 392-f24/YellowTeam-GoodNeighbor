import React from 'react';
import "./ProfilePage.css"
import AuthButton from '../Buttons';
import StarRate from "../starRate";
import { renderStars } from "../renderStars";
import { useAuthState, useDbData } from '../../utilities/firebase';

const ProfilePage = () => {

  const [user] = useAuthState();

  const user_id = user ? user.uid : "TESTING";

  const [usersData, usersError] = useDbData(`users/${user_id}`);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  if (!usersData) {
    return <p>Loading user-specific data...</p>;  // Handle loading state for usersData
  }
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className='profile-page'>
      {/* should be replaced with auth data */}
      <h1 className="user-name"> {user.displayName || "Anonymous"} </h1>  {/* Ensure user.displayName is not undefined */}

      {/* Stars */}
      <div className="starStyle">
        { renderStars(usersData.rate_score) }  {/* Pass the rateScore to renderStars */}
      </div>

      <p className="goodNeighborRanking">Good Neightbor Rating</p>

      {/* Stats */}
      <div className="StatsContainer">
        <div className="TasksBy">
          <h1 className="numberStyle"> 14 </h1>
          <p className="textStyle">Tasks completed by User </p>
        </div>
        <div className="TasksFor">
          <h1 className="numberStyle"> 23 </h1>
          <p className="textStyle">Tasks completed for User </p>
        </div>

      </div>
      <AuthButton/>
    </div>
  );
};

export default ProfilePage;

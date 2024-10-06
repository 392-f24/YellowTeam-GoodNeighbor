import React from 'react';
import "./ProfilePage.css"
import AuthButton from '../Buttons';
import StarRate from "../starRate";
import { renderStars } from "../renderStars";

const ProfilePage = () => {
  return (
    <div className='profile-page'>
      {/* should be replaced with auth data */}
      <h1 className="user-name">Herbert Botwe</h1>

      {/* Stars */}
      {/* <div className="starStyle">
        <StarRate />


      </div>   */}
      <div className="starStyle">
        { renderStars(4.5)}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";

import RequestList from "../RequestList"
import TextOnlyForm from "../Form";
import { GreenButton } from "../Buttons";

const HomePage = () => {
  const [description, setDescription] = useState(''); 
  const navigate = useNavigate();

  const DirectToRequestForm = () => {
    navigate('/requestform', { state: { description } }); // Pass description as state
  };

  return (
    <div className='homepage'>      
      <h5>New Request</h5>
      <TextOnlyForm text={description} setText={setDescription} placeholder={'How can your neighbors help?'}/>
      <GreenButton onClick={DirectToRequestForm} text={'Submit'}/>
      <RequestList />
    </div>
  );
};

export default HomePage;

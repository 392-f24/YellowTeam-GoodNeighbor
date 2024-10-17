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
      
      <div className='new-request-area'> 
        <h2 className="mb-0 me-2">New Request</h2>
        <TextOnlyForm text={description} setText={setDescription} placeholder={'How can your neighbors help?'}/>
        <GreenButton onClick={DirectToRequestForm} text={'Submit'}/>

      </div>

      <RequestList />
    </div>
  );
};

export default HomePage;

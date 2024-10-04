import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import RequestList from "../RequestList"

const HomePage = () => {
  const [description, setDescription] = useState(''); // State for textbox
  const navigate = useNavigate();

  const DirectToRequestForm = () => {
    navigate('/requestform', { state: { description } }); // Pass description as state
  };

  return (
    <div className='homepage'>
      {/* <nav class="navbar fixed-bottom navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand" href="#">Fixed bottom</a>
        </div>
      </nav> */}
      

      <h5>New Request</h5>
      <textarea
        placeholder="How can your neighbors help?" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className= "form-control"
        rows="4" 
        style={{ height: 'auto' }} 
      />
      <button onClick={DirectToRequestForm} className="request-submit-button">Submit</button>

      <RequestList />

    </div>
  );
};

export default HomePage;

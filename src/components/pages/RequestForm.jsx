import React from 'react';
import { useFormData } from '../../utilities/useFormData';
import { useDbAdd } from '../../utilities/firebase';
import './RequestForm.css'
import { useAuthState } from '../../utilities/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { push, ref } from 'firebase/database';
import { database } from '../../utilities/firebase';
import { RequestForm } from "../Form";
import { useState } from 'react';

const RequestFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const initialValues = {
    description: location.state?.description || '',
    expected_duration: '',
    timer: ''
  };

  const [formState] = useFormData(null);
  const [add] = useDbAdd('requests');
  const [user] = useAuthState();

  const newRequestId = push(ref(database, 'requests')).key;

  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState('');
  const [pickupPref, setPickupPref] = useState('');

  const data = {
    description: description,
    timer: timer, 
    pickup_pref: pickupPref,
    expected_duration: "",
    accept_status: false,
    accept_userid: "",
    location: "",
    post_time: new Date().toISOString(),
    request_id: newRequestId,
    userid: user ? user.uid : "TESTING",
    username: user ? user.displayName || "Anonymous" : "Anonymous",
  };


  const submit = async (evt) => {
    evt.preventDefault();

    const errors = formState.errors || {};

    if (Object.keys(errors).length === 0) {
      try {
        await add({ ...data }, newRequestId);
        console.log('Form submitted:', { ...data });
        navigate('/'); // Navigate back to homepage after successful submission
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  return (
    <div className="requestform-page">
      <h4 className='title'>New Request</h4>
      <RequestForm 
        data={data} 
        setDescription={setDescription} 
        setTimer={setTimer} 
        pickupPref={pickupPref}
        setPickupPref={setPickupPref}
        onClick={submit}/>
    </div>
  );
};

export default RequestFormPage;
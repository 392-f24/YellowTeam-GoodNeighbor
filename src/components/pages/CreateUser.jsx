// EditProfile.jsx
import React from 'react'
import { useState, useEffect } from 'react';
import './CreateUser.css'
import { useDbAdd, useDbData, useDbUpdate } from '../../utilities/firebase';


function CreateUser({ closeModal, userId }) {
    // const [userData, userDataError] = useDbData(`/users/${userId}`);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setStateLoc] = useState('');
    const [zip, setZip] = useState('');
    const [neighborhoodCode, setNeighborhoodCode] = useState('');

    const [addUser, result] = useDbAdd(`/users`);


    const handleSave = async () => {
        if (!userId) {
            console.error("User ID is missing.");
            return;
        }
        const newUserProfile = {
            username: name,
            Address: address,
            Apartment: apartment,
            City: city,
            StateLoc: state,
            Zip: zip,
            NeighborhoodCode: neighborhoodCode,
            userid: userId,  // Use the passed-in userId
            rate_count: 0,
            rate_score: 0,
            task_CBU: 0,
            task_CFU: 0,
            photo_url: '',
            location: ''
        };
        try {
            await addUser(newUserProfile, userId);  // Store user data under /users/{userId}
            console.log("Profile created successfully!");
            closeModal();
        } catch (error) {
            console.error("Error creating profile:", error);
        }
    };




    return (
        <div className='modalBackground'>
            <div className="modalContainer">
                {/* <div className="titleCloseBtn">
                    <button onClick={() => closeModal(false)}> X </button>
                </div> */}
                <div className="title">
                    <h1>Edit Profile</h1>
                </div>
                <div className="body">
                    <div>
                        <h2>Full Name</h2>
                        <input
                            className="input fullWidth"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                        />
                    </div>


                    <div className="address">
                        <h2>Home Address</h2>
                        <input
                            className="input fullWidth"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                        />
                        <input
                            className="input fullWidth"
                            value={apartment}
                            onChange={(e) => setApartment(e.target.value)}
                            placeholder="Apartment, suite, etc."
                        />
                        <input
                            className="input fullWidth"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        />
                        <div className="twoColumns">
                            <input
                                className="input"
                                value={state}
                                onChange={(e) => setStateLoc(e.target.value)}
                                placeholder="State"
                            />
                            <input
                                className="input"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Zip Code"
                            />
                        </div>
                    </div>


                    <div className="neighborhood">
                        <h2> Neighborhood Code</h2>
                        {/* <input className="input" value="Enter Here"/> */}
                        <input
                            className="input"
                            value={neighborhoodCode}
                            onChange={(e) => setNeighborhoodCode(e.target.value)}
                            placeholder="Enter Neighborhood Code"
                        />
                        <p className="smallText">please allow up to 2 days for approval from your Neighborhood Admin</p>
                    </div>
                    
                </div>
                <div className="footer">
                    <button  id='cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
                    <button id='saveBtn' onClick={handleSave} >Save Profile</button>
                </div>


            </div>
        </div>
    )
}
export default CreateUser
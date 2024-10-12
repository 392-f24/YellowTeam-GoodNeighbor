// EditProfile.jsx
import React from 'react'
import { useState, useEffect } from 'react';
import './EditProfileModal.css'
import { useDbData, useDbUpdate } from '../utilities/firebase';


function EditProfileModal({ closeModal, userId }) {
    const [userData, userDataError] = useDbData(`/users/${userId}`);

    const [address, setAddress] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [state, setStateLoc] = useState('');
    const [zip, setZip] = useState('');
    const [neighborhoodCode, setNeighborhoodCode] = useState('');

    const [updateData, result] = useDbUpdate(`/users/${userId}`);


    useEffect(() => {
        if (userData) {
            setAddress(userData.Address || ''); 
            setApartment(userData.Apartment || ''); 
            setCity(userData.City || '');
            setStateLoc(userData.StateLoc || '');
            setZip(userData.Zip || '');
            setNeighborhoodCode(userData.NeighborhoodCode || '');
        }
    }, [userData]);

    const handleSave = async () => {
        const updates = {
            Address: address,
            Apartment: apartment,
            City: city,
            StateLoc: state,
            Zip: zip,
            NeighborhoodCode: neighborhoodCode
        };

        try {
            await updateData(updates);
            console.log("Profile updated successfully!");

            closeModal();
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };



    if (!userData) {
        return <p>Loading...</p>; 
    }

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

                        {/* <input className="input fullWidth" value="Address" />
                        <input className="input fullWidth" value="Apartment, suite, etc" /> */}
                        {/* <input className="input fullWidth" value="City" /> */}
                        <div className="twoColumns">
                            {/* <input className="input " value="State" />
                            <input className="input " value="Zip Code" /> */}
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

export default EditProfileModal
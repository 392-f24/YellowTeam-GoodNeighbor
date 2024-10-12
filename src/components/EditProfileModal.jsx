// EditProfile.jsx
import React from 'react'
import './EditProfileModal.css'

function EditProfileModal( {closeModal} ) {

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
                        <input className="input fullWidth" value="Address" />
                        <input className="input fullWidth" value="Apartment, suite, etc" />
                        <input className="input fullWidth" value="City" />
                        <div className="twoColumns">
                            <input className="input " value="State" />
                            <input className="input " value="Zip Code" />
                        </div>
                    </div>
                    <div className="neighborhood">
                        <h2> Neighborhood Code</h2>
                        <input className="input" value="Enter Here"/>
                        <p className="smallText">please allow up to 2 days for approval from your Neighborhood Admin</p>
                    </div>
                    
                </div>
                <div className="footer">
                    <button  id='cancelBtn' onClick={() => closeModal(false)}>Cancel</button>
                    <button id='saveBtn'>Save Profile</button>
                </div>


            </div>
        </div>
    )
}

export default EditProfileModal
// defining various forms
import React, { useState, useEffect } from 'react';
import {Form, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
// import {Form, Container, Button} from 'react-bootstrap';
import { useDbUpdate ,useAuthState} from "../utilities/firebase";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GreyButton, GreenButton } from "./Buttons";
import './Form.css'

export const TextOnlyForm = ({text, setText, placeholder}) => (
        <Form.Control
            as="textarea"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}  
            className='text-only'
            placeholder={placeholder}
            style={{ width: '90%', height: 'auto' }}
        />
);

export const AcceptanceForm = ({request, handleClose}) => {
    const [updateData, result] = useDbUpdate(`/requests/${request.request_id}`);
    const [user] = useAuthState();
    const currentUserID = user?.uid;
    const updatedData = { ...(request), accept_status: true,accept_userid : currentUserID };
    const AcceptRequest = async(evt) => {
        evt.preventDefault();
        try{
            await(updateData(updatedData));
            handleClose();
        } 
        catch (error) {
            console.error("Error occurred:", error.message);
        }
        return;
    }

    return (

        <Container className="mt-5">
            <Form className="custom-form" style={{ background: '#D1E7DD' }}>
                {/* Phone Number Input */}
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        className="w-100"
                        type="phone number"
                        placeholder="Phone number"
                        autoFocus
                    />
                </Form.Group>
                {/* Message Input */}
                <Form.Group
                    className="mb-3"
                    controlId="formMessage"
                >
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                        className="w-100"
                        as="textarea" 
                        rows={5} 
                        style={{ minHeight: '100px' }}
                        placeholder="Write your message"
                    />
                </Form.Group>

                {/* Accept Button */}
                <div className="d-flex justify-content-center">
                    <GreyButton onClick={AcceptRequest} text={'Accept Request'}/>
                </div>
            </Form>
        </Container>
    );

}

const TimeSelector = ({setTimer}) => {
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [selectedMinute, setSelectedMinute] = useState('');

    const days = Array.from({ length: 8 }, (_, i) => i); // Generates array [1, 2, 3, ..., 7]
    const hours = Array.from({ length: 24 }, (_, i) => i);  // Generates array [0, 1, 2, ..., 23]
    const minutes = Array.from({ length: 60 }, (_, i) => i);  // Generates array [0, 1, 2, ..., 59]

    const dropdownMenuStyle = {
        maxHeight: '160px', // Approx. 5 rows (adjust as needed for row height)
        overflowY: 'auto',
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs="auto">
                    <DropdownButton 
                        variant="secondary"
                        id="dropdown-day"
                        size="sm"
                        title={selectedDay !== '' ? `${selectedDay} Days` : 'Day'}
                        onSelect={(e) => {setSelectedDay(e); setTimer(e*24*60+selectedHour*60+selectedMinute*1)}}
                    >
                        <div style={dropdownMenuStyle}>
                            {days.map((day) => (
                                <Dropdown.Item key={day} eventKey={day}>
                                    Day {day}
                                </Dropdown.Item>
                            ))}
                        </div>
                    </DropdownButton>
                </Col>

                <Col xs="auto">
                    <DropdownButton
                        variant="secondary"
                        id="dropdown-hour"
                        size="sm"
                        title={selectedHour !== '' ? `${selectedHour} Hours` : 'Hour'}
                        onSelect={(e) => {setSelectedHour(e); setTimer(selectedDay*24*60+e*60+selectedMinute*1)}}
                    >
                        <div style={dropdownMenuStyle}>
                            {hours.map((hour) => (
                                <Dropdown.Item key={hour} eventKey={hour}>
                                    {hour < 10 ? `0${hour}` : hour} Hour(s)
                                </Dropdown.Item>
                            ))}
                        </div>
                    </DropdownButton>
                </Col>

                <Col xs="auto">
                    <DropdownButton
                        variant="secondary"
                        id="dropdown-minute"
                        size="sm"
                        title={selectedMinute !== '' ? `${selectedMinute} Minutes` : 'Min'}
                        onSelect={(e) => {setSelectedMinute(e); setTimer(selectedDay*24*60+selectedHour*60+e*1)}}
                    >
                        <div style={dropdownMenuStyle}>
                            {minutes.map((minute) => (
                                <Dropdown.Item key={minute} eventKey={minute}>
                                    {minute < 10 ? `0${minute}` : minute} Minute(s)
                                </Dropdown.Item>
                            ))}
                        </div>
                    </DropdownButton>
                </Col>
            </Row>

            {/* <Row className="mt-3 justify-content-center">
                <Col xs="auto">
                    <p>
                        Selected Time: Day {selectedDay || 'No day'} at{' '}
                        {selectedHour !== '' ? `${selectedHour} hour(s)` : 'No hour'} and{' '}
                        {selectedMinute !== '' ? `${selectedMinute} minute(s)` : 'No minute'}
                    </p>
                </Col>
            </Row> */}
        </Container>
    );
};

const MultiSelect = ({pickupPref, setPickupPref}) => {
    const options = ['Pick up', 'Drop off', 'Meet up'];
    const [selected, setSelected] = useState([]);
    const [meetUpLocation, setMeetUpLocation] = useState(''); // Changed variable name

    // Handle select logic
    const handleSelect = (option) => {
        setPickupPref((prevSelected) => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter((item) => item !== option); // Deselect the option
            } else {
                return [...prevSelected, option]; // Select the option
            }
        });
    };

    return (
        <div>
            <Form.Label>Select Options:</Form.Label>
            {options.map((option) => (
                <Form.Check
                    key={option}
                    type="checkbox"
                    label={option}
                    checked={pickupPref.includes(option)}
                    onChange={() => handleSelect(option)} // Handle checkbox change
                />
            ))}
            {pickupPref.includes('Meet up') && (
                <Form.Group className="mt-3">
                    <Form.Label>Meet-up Location:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={meetUpLocation} // Updated to use meetUpLocation
                        onChange={(e) => setMeetUpLocation(e.target.value)} // Update location state
                    />
                </Form.Group>
            )}
            <div className="mt-3">
                <strong>Selected: </strong>{pickupPref.length === 0 ? 'None' : pickupPref.join(', ')}
            </div>
        </div>
    );
};
  
export const RequestFormForm = ({data, setDescription, setTimer, pickupPref, setPickupPref, onClick}) => {
    const location = useLocation();
    // const [description, setDescription] = useState('');
    // setTest("Hello")
    console.log(data.pickup_pref);

    useEffect(() => {
        const { description } = location.state || {};
        if (description) {
            setDescription(description);
        }
    }, [location.state]);
    const navigate = useNavigate();
    const DirectToHome = () => {
        navigate('/'); 
      };
    return (

        <Container className="mt-1">
            <Form className="custom-form">
                {/* Description Input */}
                <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        className="w-100"
                        as="textarea" 
                        rows={5} 
                        style={{ minHeight: '100px' }}
                        placeholder="How can your neighbors help?"
                        value={data.description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <hr />
                <Form.Group className="mb-3 d-flex align-items-center" controlId="formExpectedDuration">
                    <Form.Label>Post Expiration</Form.Label>
                    <TimeSelector setTimer={setTimer}/>
                </Form.Group>
                <hr />
                <Form.Group controlId="formPickUpDropOff">
                    <Form.Label>Pick Up / Drop Off Preference</Form.Label>
                    <MultiSelect pickupPref={pickupPref} setPickupPref={setPickupPref}/>
                </Form.Group>

                {/* Accept/Submit Button */}
                <div className="d-flex justify-content-center gap-3">
                    <GreenButton onClick={DirectToHome} text={'Cancel'}/>
                    <GreenButton onClick={onClick} text={'Submit'}/>
                </div>
            </Form>
        </Container>
    );
}

export default TextOnlyForm
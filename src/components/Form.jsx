// defining various forms
import React, { useState, useEffect } from 'react';
import {Form, Container, Row, Col, Dropdown, DropdownButton, Alert } from 'react-bootstrap';
import { useDbUpdate ,useAuthState} from "../utilities/firebase";
import { useNavigate } from 'react-router-dom';

import { GreyButton, GreenButton, GreyOutlineButton } from "./Buttons";
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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [msg, setMsg] = useState('');
    const [deliveryOption, setDeliveryOption] = useState(''); // State to track the selected option
    const [err, setErr] = useState(false);

    const updatedData = { ...(request), 
                        request_status: "Pending",
                        accept_userid : currentUserID,
                        delivery_pref: [...request.delivery_pref, deliveryOption], // adding selected pref to the end, any repeat indicates a selected option
                        accept_phone_number: phoneNumber,
                        accept_msp: msg
                     };
    const AcceptRequest = async(evt) => {
        evt.preventDefault();
        if(deliveryOption !== ''){
            try{
                await(updateData(updatedData));
                handleClose();
            } 
            catch (error) {
                console.error("Error occurred:", error.message);
            }
        }
        else {
            setErr(true);
        }
        return;
    }

    const handleButtonClick = (option) => {
        setErr(false);
        setDeliveryOption(deliveryOption === option ? '' : option);
    };

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
                        onChange={(e) => setPhoneNumber(e.target.value)} 
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
                        onChange={(e) => setMsg(e.target.value)}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="formOptions"
                >
                    <Form.Label>Deliver option (choose one): </Form.Label>
                    <div className="d-flex flex-wrap">
                        {(request.delivery_pref).map( (option) => {
                            return(
                                <div className="me-2 mb-2">
                                    <GreyOutlineButton 
                                        onClick={() => handleButtonClick(option)} 
                                        text={option}
                                        disabled={deliveryOption !== '' && deliveryOption !== option}/>
                                </div>
                            );
                        })}
                    </div>
                </Form.Group>

                {err && (
                        <Alert variant="danger" className="mb-2 small-alert">
                        Please select a delivery option. 
                        </Alert>
                )}
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
        </Container>
    );
};

const MultiSelect = ({ deliveryPref, setDeliveryPref, meetUpLocation, setMeetUpLocation }) => {
    const options = ['Pick up', 'Drop off', 'Meet up'];

    const handleSelect = (option) => {
        setDeliveryPref((prevSelected) => {
            if (prevSelected.includes(option)) {
                return prevSelected.filter((item) => item !== option); // Deselect
            } else {
                return [...prevSelected, option]; // Select
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
                    checked={deliveryPref.includes(option)}
                    onChange={() => handleSelect(option)} // Handle checkbox change
                />
            ))}
            {deliveryPref.includes('Meet up') && (
                <Form.Group className="mt-3">
                    <Form.Label>Meet-up Location:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter location"
                        value={meetUpLocation}
                        onChange={(e) => setMeetUpLocation(e.target.value)}
                    />
                </Form.Group>
            )}
            <div className="mt-3">
                <strong>Selected: </strong>
                {deliveryPref.length === 0 ? 'None' : deliveryPref.join(', ')}
            </div>
        </div>
    );
};

  
export const RequestForm = ({
    data,
    setDescription,
    setTimer,
    deliveryPref,
    setDeliveryPref,
    meetUpLocation,
    setMeetUpLocation,
    onClick,
  }) => {
    const navigate = useNavigate();
    const DirectToHome = () => navigate('/');
  
    return (
      <Container className="mt-1">
        <Form className="custom-form">
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
            <TimeSelector setTimer={setTimer} />
          </Form.Group>
          <hr />
          <Form.Group controlId="formDelivery">
            <Form.Label>Delivery Preference</Form.Label>
            <MultiSelect
              deliveryPref={deliveryPref}
              setDeliveryPref={setDeliveryPref}
              meetUpLocation={meetUpLocation}
              setMeetUpLocation={setMeetUpLocation}
            />
          </Form.Group>
          <div className="d-flex justify-content-center gap-3">
            <GreenButton onClick={DirectToHome} text="Cancel" />
            <GreenButton onClick={onClick} text="Submit" />
          </div>
        </Form>
      </Container>
    );
  };
  
  
export default TextOnlyForm
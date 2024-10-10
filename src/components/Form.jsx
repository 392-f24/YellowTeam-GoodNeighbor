// defining various forms
import React, { useState } from 'react';
import {Form, Container} from 'react-bootstrap';
// import {Form, Container, Button} from 'react-bootstrap';
import { useDbUpdate ,useAuthState} from "../utilities/firebase";

import { GreyButton } from "./Buttons";
import './Form.css'

const TextOnlyForm = ({text, setText, placeholder}) => (
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

export default TextOnlyForm
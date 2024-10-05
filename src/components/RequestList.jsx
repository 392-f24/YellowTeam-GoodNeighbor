import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import AcceptanceForm from '../components/AcceptanceForm'
import "./RequestList.css";
import AcceptRequestModal from "./Modal"

const RequestList = () => {
    const [sortBy, setSortBy] = useState('timeRemaining');
    const [show, setShow] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    // For Modal pop up
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Fetch the JSON data when the component loads
    // useEffect(() => {
    //     fetch('/data/mockupdata.json') // Hardcoding this for now
    //         .then(response => response.json())
    //         .then(data => {
    //             const requestArray = Object.values(data.requests);
    //             setRequests(requestArray);
    //             setUsers(data.users);
    //         })
    //         .catch(error => console.error('Error fetching data:', error));
    // }, []);

    const handleSort = (criterion) => {
        const sortedRequests = [...requests].sort((a, b) => {
            if (criterion === 'timeRemaining') {
                return a.expected_duration - b.expected_duration;
            } else if (criterion === 'distance') {
                return 0;
            } else if (criterion === 'rating') {
                const userA = users[a.userid]?.rate_score || 0;
                const userB = users[b.userid]?.rate_score || 0;
                return userB - userA;
            }
            return 0;
        });
        setSortBy(criterion);
        setRequests(sortedRequests);
    };

    return (
        <div className="w-100">
            <div className="request-list-header d-flex justify-content-center align-items-center mb-3">
                <h2 className="mb-0 me-2">Request List</h2>
                <DropdownButton id="dropdown-basic" variant="secondary" size="sm" title="Sort by">
                    <Dropdown.Item onClick={() => handleSort('timeRemaining')}>Time Remaining</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('distance')}>Distance</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('rating')}>Rating</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className="flex-grow-1 overflow-auto px-3 py-2">
                <div className="row">
                    {requestsNotAccepted.map(request => {
                        const user = users[request.userid]; // Get user info for each request
                        const rating = user ? user.rate_score : 0;

                        return (
                            <div key={request.request_id} className="col-12 mb-3">
                                <Card className="shadow border-0" onClick={handleShow}>
                                    <Card.Body className="p-0">
                                        <Card.Header className="text-muted">
                                            {request.timer} min remaining
                                        </Card.Header>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <Card.Title className="h5 mb-0">{user?.username || "Unknown"}</Card.Title>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    <span>{rating}</span>
                                                </div>
                                            </div>
                                            <small className="text-muted mb-2">{request.location || "Unknown location"}</small>
                                            <Card.Text>{request.description}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modal heading</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <AcceptanceForm />
                                    </Modal.Body>
                                </Modal>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal outside the map to avoid rendering multiple modals */}
            {currentRequest && <AcceptRequestModal show={show} handleClose={handleClose} currentRequest={currentRequest} />}
        </div>
    );
};

export default RequestList;

import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import AcceptanceForm from '../components/AcceptanceForm'
import "./RequestList.css";

const initialUsers = {
    // "MhzK1F5wrjYKtyxh9enputHKKRE2": {
    //     "location": "",
    //     "photo_url": "",
    //     "rate_count": 1,
    //     "rate_score": 5,
    //     "task_CBU": 0,
    //     "task_CFU": 0,
    //     "userid": "MhzK1F5wrjYKtyxh9enputHKKRE2",
    //     "username": "Diana"
    // },
    // "hFiohCGBZ3WaQyCVbr58WQA94Oh2": {
    //     "location": "",
    //     "photo_url": "",
    //     "rate_count": 1,
    //     "rate_score": 5,
    //     "task_CBU": 0,
    //     "task_CFU": 0,
    //     "userid": "hFiohCGBZ3WaQyCVbr58WQA94Oh2",
    //     "username": "Herbert"
    // },
    // "4M9VkGLjNUfC9wmjE25EtG5oAXG3": {
    //     "location": "",
    //     "photo_url": "",
    //     "rate_count": 1,
    //     "rate_score": 5,
    //     "task_CBU": 0,
    //     "task_CFU": 0,
    //     "userid": "4M9VkGLjNUfC9wmjE25EtG5oAXG3",
    //     "username": "Haichen"
    // },
    "5YWLUchgSKMICGcUq6ctzynfvBS2": {
        "location": "",
        "photo_url": "",
        "rate_count": 1,
        "rate_score": 5,
        "task_CBU": 0,
        "task_CFU": 0,
        "userid": "5YWLUchgSKMICGcUq6ctzynfvBS2",
        "username": "Linh"
    }
};

const initialRequests = [
    // {
    //     "accept_status": false,
    //     "accept_userid": "",
    //     "duration": 1,
    //     "location": "",
    //     "post_time": "2024-10-01T00:00:00Z",
    //     "request_id": "-O8SWNA-j6h9MgVQ9n_s",
    //     "request_text": "I need an onion for my soup!",
    //     "userid": "MhzK1F5wrjYKtyxh9enputHKKRE2",
    //     "username": "Diana"
    // },
    // {
    //     "accept_status": false,
    //     "accept_userid": "",
    //     "duration": 5,
    //     "location": "",
    //     "post_time": "2024-10-01T00:00:00Z",
    //     "request_id": 1,
    //     "request_text": "Could someone borrow me a hammer?",
    //     "userid": "hFiohCGBZ3WaQyCVbr58WQA94Oh2",
    //     "username": "Herbert"
    // },
    // {
    //     "accept_status": false,
    //     "accept_userid": "",
    //     "duration": 15,
    //     "location": "",
    //     "post_time": "2024-10-02T09:30:00Z",
    //     "request_id": 2,
    //     "request_text": "Can anyone walk my dog tomorrow morning?",
    //     "userid": "4M9VkGLjNUfC9wmjE25EtG5oAXG3",
    //     "username": "Haichen"
    // },
    {
        "accept_status": false,
        "accept_userid": "",
        "description": "Testing",
        "expected_duration": 60,
        "location": "",
        "post_time": "2024-10-03T14:00:00Z",
        "request_id": "-O8TitKag8bdO1C_0Vbm",
        "timer": "",
        "userid": "5YWLUchgSKMICGcUq6ctzynfvBS2",
        "username": "Linh Ly"
    }
    // {
    //     "accept_status": false,
    //     "accept_userid": "",
    //     "duration": 10,
    //     "location": "",
    //     "post_time": "2024-10-04T08:15:00Z",
    //     "request_id": "-O8TitKag8bdO1C_0Vbm",
    //     "request_text": "Can someone water my plants while I’m on vacation?",
    //     "userid": "4M9VkGLjNUfC9wmjE25EtG5oAXG3",
    //     "username": "Haichen"
    // },
    // {
    //     "accept_status": false,
    //     "accept_userid": "",
    //     "duration": 45,
    //     "location": "",
    //     "post_time": "2024-10-05T17:45:00Z",
    //     "request_id": 5,
    //     "request_text": "I need help with assembling some furniture this weekend.",
    //     "userid": "hFiohCGBZ3WaQyCVbr58WQA94Oh2",
    //     "username": "Herbert"
    // }
];


const RequestList = () => {
    // const [requests, setRequests] = useState([]);
    // const [users, setUsers] = useState({});
    const [requests, setRequests] = useState(initialRequests);
    const [users, setUsers] = useState(initialUsers);
    const [sortBy, setSortBy] = useState('timeRemaining');

    // For Modal pop up
    const [show, setShow] = useState(false);
    const [curretRequest, setCurrentRequest] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (request) => {
        setCurrentRequest(request);
        setShow(true);
    };

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

    // Sorting function for time remaining, distance, and rating
    const handleSort = (criterion) => {
        const sortedRequests = [...requests].sort((a, b) => {
            if (criterion === 'timeRemaining') {
                return a.duration - b.duration;
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
        <div>
            <div className="d-flex justify-content-center align-items-center mb-3">
                <h2 className="mb-0 me-2">Request List</h2>
                <DropdownButton id="dropdown-basic" variant="secondary" size="sm" title="Sort by">
                    <Dropdown.Item onClick={() => handleSort('timeRemaining')}>Time Remaining</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('distance')}>Distance</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('rating')}>Rating</Dropdown.Item>
                </DropdownButton>
            </div>

            <div className="flex-grow-1 overflow-auto px-3 py-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                <div className="row">
                    {requests.map(request => {
                        const user = users[request.userid]; // Get user info for each request
                        const rating = user ? user.rate_score : 0;

                        return (
                            <div key={request.request_id} className="col-12 mb-3">
                                <Card className="shadow border-0" onClick={() => handleShow(request)}>
                                    <Card.Body className="p-0">
                                        <Card.Header className="text-muted">
                                            {request.duration} min remaining
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
                                {/* Create a pop up modal when a card is selected
                                    in order to complete a request */}
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{curretRequest.username} ({curretRequest.duration} min remaining)</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>
                                            {curretRequest.description}
                                        </p>
                                        <AcceptanceForm request={curretRequest} handleClose={handleClose}/>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default RequestList;

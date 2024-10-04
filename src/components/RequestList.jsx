import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, Card, Button } from 'react-bootstrap';
import "./RequestList.css";

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [users, setUsers] = useState({});
    const [sortBy, setSortBy] = useState('timeRemaining');

    // Fetch the JSON data when the component loads
    useEffect(() => {
        fetch('/data/mockupdata.json')
            .then(response => response.json())
            .then(data => {
                const requestArray = Object.values(data.requests);
                setRequests(requestArray);
                setUsers(data.users);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

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
                                <Card className="shadow border-0">
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
                                            <Card.Text>{request.request_text}</Card.Text>

                                            <div className="d-flex justify-content-end">
                                                <Button variant="success" size="sm">Accept</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default RequestList;

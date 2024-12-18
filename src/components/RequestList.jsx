import React, { useState } from 'react';
import { DropdownButton, Dropdown, Card, Badge } from 'react-bootstrap';
import { useDbData } from '../utilities/firebase';
import "./RequestList.css";
import AcceptRequestModal from "./Modal"
import CountdownTimer from './CountdownTimer';
import DistanceMatrix from '../utilities/Dynamic_Distance';

const RequestList = () => {
    const [sortBy, setSortBy] = useState('timeRemaining');
    const [show, setShow] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);

    // Use useDbData hook to get the users and requests from Firebase
    const [requestsData, requestsError] = useDbData('/requests');
    const [usersData, usersError] = useDbData('/users');

    if (requestsError || usersError) {
        return <div>Error loading data!</div>;
    }

    if (!requestsData || !usersData) {
        return <div>Loading...</div>;
    }

    const requests = Object.values(requestsData); // Convert requests object to array
    const users = usersData;
    const requestsNotAccepted = requests.filter(request => request.request_status === "Open");

    const handleClose = () => setShow(false);
    const handleShow = (request) => {
        setCurrentRequest(request);
        setShow(true);
    };

    // Remove duplicates from delivery preferences
    const getUniqueDeliveryPrefs = (prefs) => {
        return [...new Set(prefs)];
    };

    // Return the correct color based on the delivery preference
    const getBadgeColor = (pref) => {
        switch (pref) {
            case 'Drop off':
                return 'primary'; // Blue
            case 'Meet up':
                return 'success'; // Green
            case 'Pick up':
                return 'warning'; // Yellow
            default:
                return 'secondary'; // Gray unexpected values
        }
    };

    return (
        <div className="w-100">
            <div className="request-list-header d-flex justify-content-center align-items-center mb-3">
                <h2 className="mb-0">Request List</h2>
            </div>

            <div className="flex-grow-1 overflow-auto px-3 py-2">
                <div className="row">
                    {requestsNotAccepted.map(request => {
                        const user = users[request.userid]; // Get user info for each request
                        const rating = user ? user.rate_score : 0;
                        const uniquePrefs = getUniqueDeliveryPrefs(request.delivery_pref);

                        const address = user ? user.Address : '';
                        const city = user ? user.City : '';
                        const state = user ? user.StateLoc : '';
                        const zip = user ? user.Zip : '';
                        const fullAddress = `${address}, ${city}, ${state} ${zip}`;

                        return (
                            <div key={request.request_id} className="col-12 mb-3">
                                <Card className="shadow border-0 cursor-pointer hover-effect" onClick={() => handleShow(request)}>
                                    <Card.Body className="p-0">
                                        <Card.Header className="d-flex justify-content-between align-items-center text-muted">
                                            <CountdownTimer request={request} />
                                            <div>
                                                {uniquePrefs.map((pref, index) => (
                                                    <Badge key={index} bg={getBadgeColor(pref)} className="ms-1">
                                                        {pref}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </Card.Header>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <Card.Title className="h5 mb-0">{user?.username || "Unknown"}</Card.Title>
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-star-fill text-warning me-1"></i>
                                                    <span>{rating}</span>
                                                </div>
                                            </div>
                                            <DistanceMatrix arrival={fullAddress} />
                                            <Card.Text>{request.description}</Card.Text>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal outside the map to avoid rendering multiple modals */}
            {currentRequest && <AcceptRequestModal show={show} handleClose={handleClose} currentRequest={currentRequest}/>}
        </div>
    );
};

export default RequestList;

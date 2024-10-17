import React, { useState, useEffect } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import './Request_Page_list.css'; 
import { useDbData, useAuthState, useDbRemove,useDbStatusUpdate } from '../utilities/firebase';
import { buttonCreate } from './buttons_request';

const Request_Page_List = () => {
  //request hook
  const [showUserRequests, setShowUserRequests] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  //get userid
  const [user] = useAuthState();
  const currentUserID = user?.uid;

  //DatabaseHook
  const [requests, error] = useDbData('requests');
  const [users, usersError] = useDbData('users');
  const [removeRequest, removeResult] = useDbRemove();
  const[updateStatus,updateResult] = useDbStatusUpdate();
  
  useEffect(() => {
    if (removeResult) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000); // Alert will disappear after 1 second
  
      return () => clearTimeout(timer);
    }
  }, [removeResult]);

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error
  }
  if (usersError) {
    return <div>Error: {usersError.message}</div>; // Handle users error
  }
  if (!requests || !users) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  // Filter requests based on the logged-in user (currentUserID)
  const userRequests = Object.values(requests).filter(request => request.userid === currentUserID);
  const acceptedRequests = Object.values(requests).filter(request => request.accept_userid === currentUserID);
  // Obtain User Info
  const getUserById = (userId) => {
    const user = Object.values(users).find(u => u.userid === userId);
    return user ? user: "Unknown User";
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-secondary';
      case 'Pending':
        return 'bg-warning';
      case 'Accepted':
        return 'bg-success';
      case 'Done':
        return 'bg-info';
      default:
        return 'bg-secondary'; // Default color for unknown statuses
    }
  };

  //UI construction
  return (
    <div className="container">
      {/* Top buttons */}
      <div className="top-buttons">
        <Button
          variant={showUserRequests ? "primary" : "outline-primary"}
          onClick={() => setShowUserRequests(true)}
          className="me-2"
        >
          Your Requests
        </Button>
        <Button
          variant={!showUserRequests ? "primary" : "outline-primary"}
          onClick={() => setShowUserRequests(false)}
        >
          Requests You've Accepted
        </Button>
      </div>
      {showAlert && (
        <Alert variant={removeResult.error ? "danger" : "success"} className="mt-3">
          {removeResult.message}
        </Alert>
      )}

      {/* Single content section */}
      <div className="row">
        <div className="col-12">
          {showUserRequests ? (
            <div>
              <h2>Your Requests</h2>
              {userRequests.length > 0 ? (
                  userRequests.map((request) => {
                    const user = getUserById(request.accept_userid); // Retrieve the user object
      
                    return (
                      <Card key={request.request_id} className="mb-3 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong className="text-highlight">
                                {request.accept_status && user
                                  ? <span><strong>{user.username}</strong> has accepted your request:</span>
                                  : <span><strong>No one</strong> accepts your request yet</span>}
                              </strong>
                              <Card.Text className="normal-text">{request.description}</Card.Text>
                            </div>
                            <div className="text-end">
                              <span className="me-2 text-muted">Status:</span>
                              <span className={`badge ${getBadgeClass(request.request_status)} badge-responsive`}>
                                {request.request_status}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mt-3">
                            {/* Dynamically create buttons based on request status, including Withdraw Help */}
                            {buttonCreate(request.request_status, request.request_id, removeRequest, updateStatus)}
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })
                ) : (
                  <p>No requests from you yet.</p>
                )}
            </div>
              ) : (
                <div>
                  <h2>Requests You've Accepted</h2>
                 {acceptedRequests.length > 0 ? (
                  acceptedRequests.map((request) => {
                    const user = getUserById(request.userid); 
                    return (
                      <Card key={request.request_id} className="mb-3 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong className="text-highlight">
                                You have accepted <strong>{user.username}</strong>'s Request
                              </strong>

                              <div className="text-muted">
                                <i className="bi bi-geo-alt"></i> 

                                {user.Address}, {user.Apartment}, {user.City}, {user.StateLoc} {user.Zip}
                              </div>

                              {/* Description section */}
                              <Card.Text className="normal-text">
                                <strong>Description:</strong> {request.description}
                              </Card.Text>
                            </div>
                            <div className="text-end">
                              <span className="me-2 text-muted">Status:</span>
                              <span className={`badge ${getBadgeClass(request.request_status)} badge-responsive`}>
                                {request.request_status}
                              </span>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center mt-3">
                            {/* Dynamically create buttons for accepted requests */}
                            {buttonCreate('Your_accept', request.request_id, removeRequest, updateStatus, request.delivery_pref)}
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })
                ) : (
                  <p>You haven't accepted any requests yet.</p>
                )}
                </div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Request_Page_List;

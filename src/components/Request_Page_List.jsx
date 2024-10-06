import React, { useState, useEffect } from 'react';
import { Button, Card ,Alert} from 'react-bootstrap';
import './Request_Page_list.css'; 
import { useDbData ,useAuthState,useDbRemove } from '../utilities/firebase';


const Request_Page_List = () => {
  const [showUserRequests, setShowUserRequests] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const [user] = useAuthState();
  const currentUserID = user?.uid;
  const [requests, error] = useDbData('requests');
  const [removeRequest, removeResult] = useDbRemove();
  
  useEffect(() => {
    if (removeResult) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000); // Alert will disappear after 5 seconds
  
      return () => clearTimeout(timer);
    }
  }, [removeResult]);

  if (error) {
    return <div>Error: {error.message}</div>; // Handle error
  }

  if (!requests) {
    return <div>Loading...</div>; // Show loading until data is fetched
  }

  // Filter requests based on the logged-in user (currentUserID)
  const userRequests = Object.values(requests).filter(request => request.userid === currentUserID);
  const acceptedRequests = Object.values(requests).filter(request => request.accept_userid === currentUserID);


  const handleWithdraw = (requestId) => {
    removeRequest(`requests/${requestId}`);
  };


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
                userRequests.map((request) => (
                  <Card key={request.request_id} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title><strong>{request.username}</strong></Card.Title>
                      <Card.Text>{request.description}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">{request.expected_duration} Duration</span>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleWithdraw(request.request_id)}
                        >
                          Withdraw
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No requests from you yet.</p>
              )}
            </div>
          ) : (
            <div>
              <h2>Requests You've Accepted</h2>
              {acceptedRequests.length > 0 ? (
                acceptedRequests.map((request) => (
                  <Card key={request.request_id} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title><strong>{request.username}</strong></Card.Title>
                      <Card.Text>{request.description}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">{request.timeRemaining} min remaining</span>
                        <Button variant="primary" size="sm">Manage</Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))
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

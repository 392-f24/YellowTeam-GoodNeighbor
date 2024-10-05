import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import './Request_Page_list.css';  // Assuming you are using the same stylesheet

const Request_Page_List = () => {
  const [requests, setRequests] = useState([]);
  const [showUserRequests, setShowUserRequests] = useState(true);

  // Simulate current user ID (in a real app, this could come from context or auth)
  const currentUserID = "123"; 

  useEffect(() => {
    // Simulating fetching data from an API or database
    const fetchedRequests = [
      { id: 1, userid: "123", accept_userid: "", username: "Herbert", description: "Could someone borrow me a hammer?", timeRemaining: 5 },
      { id: 2, userid: "456", accept_userid: "123", username: "Linh", description: "Looking for help fixing my fence. Anyone available?", timeRemaining: 60 },
      { id: 3, userid: "789", accept_userid: "", username: "Haichen", description: "Can anyone walk my dog tomorrow morning?", timeRemaining: 15 },
      { id: 4, userid: "123", accept_userid: "", username: "Herbert", description: "Could someone borrow me a hammer?", timeRemaining: 5 }
    ];

    setRequests(fetchedRequests);
  }, []);

  // Filter requests based on the logged-in user (currentUserID)
  const userRequests = requests.filter(request => request.userid === currentUserID);
  const acceptedRequests = requests.filter(request => request.accept_userid === currentUserID);

  const handleWithdraw = (requestId) => {
    // Remove the request with the given ID
    // Next work  connect database and request a delete}
    const updatedRequests = requests.filter(request => request.id !== requestId);
    setRequests(updatedRequests);
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

      {/* Single content section */}
      <div className="row">
        <div className="col-12">
          {showUserRequests ? (
            <div>
              <h2>Your Requests</h2>
              {userRequests.length > 0 ? (
                userRequests.map((request) => (
                  <Card key={request.id} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title><strong>{request.username}</strong></Card.Title>
                      <Card.Text>{request.description}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">{request.timeRemaining} min remaining</span>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleWithdraw(request.id)}
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
                  <Card key={request.id} className="mb-3 shadow-sm">
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

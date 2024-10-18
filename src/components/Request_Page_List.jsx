import React, { useState, useEffect } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import './Request_Page_list.css';
import { useDbData, useAuthState, useDbRemove, useDbStatusUpdate } from '../utilities/firebase';
import { buttonCreate } from './buttons_request';
import RateModal from './rate_modal';
import ProfileModal from './ProfileModal';

const Request_Page_List = () => {
  // Request hook
  const [showUserRequests, setShowUserRequests] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  // Get userid
  const [user] = useAuthState();
  const currentUserID = user?.uid;

  // Database hook
  const [requests, error] = useDbData('requests');
  const [users, usersError] = useDbData('users');
  const [removeRequest, removeResult] = useDbRemove();
  const [updateStatus, updateResult] = useDbStatusUpdate();

  /// Rating modal handle //////////////////////////
  const [selectedRequestId, setSelectedRequestId] = useState(null);  // No initial request selected
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);     // Rate modal closed by default
  const [selectedUser, setSelectedUser] = useState(null);            // User for profile modal
  const [contactNumber, setContactNumber] = useState('xxx-xxx-xxxx');
  const [acceptMsg, setAcceptMsg] = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // Profile modal closed by default

  const handleRateModalOpen = (requestId) => {
    setSelectedRequestId(requestId);  // Set the clicked request ID
    setIsRateModalOpen(true);         // Open the rate modal
  };

  const handleRateModalClose = () => {
    setSelectedRequestId(null);       // Clear the selected request
    setIsRateModalOpen(false);        // Close the rate modal
  };

  const handleCloseRequest = (requestId, acceptUserId, newRating, userId) => {
    const userToUpdate = users[acceptUserId];  // Get the user data
    const rateCount = userToUpdate.rate_count || 1;  // Default rate count
    
    // Update the request status to 'Closed'
    updateStatus(`requests/${requestId}`, {
      request_status: 'Closed',  // Mark request as closed
    });
  
    // Update the accepted user's rating and increment task_CBU
    updateStatus(`users/${acceptUserId}`, {
      rate_score: newRating,           // Update the new rating
      rate_count: rateCount + 1,       // Increment the rate count
      task_CBU: (userToUpdate.task_CBU || 0) + 1,  // Increment task_CBU
    });
  
    // Update the current user's task_CFU
    const currentUser = users[userId];  // Fetch the current user
    updateStatus(`users/${userId}`, {
      task_CFU: (currentUser.task_CFU || 0) + 1,  // Increment task_CFU
    });
  
    console.log(`Closing request ID: ${requestId}, updated user ${acceptUserId} with new rating: ${newRating}, and incremented task_CBU/CFU`);
  
    handleRateModalClose();
  };

  //////////////////////////////////////////////////////////////////
  ///// Profile modal stuff ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////

  // Open profile modal using requestId to find the requester's profile
  const handleProfileModalOpen = (requestId) => {
    const request = requests[requestId];
    const userId = request.accept_userid; // Get the userId of the person who made the request
    const user = users[userId];
    const msg = request.accept_msg;
    const number = request.accept_phone_number;

    if (user) {
      setSelectedUser(user);
      setIsProfileModalOpen(true);
      setAcceptMsg(msg);
      setContactNumber(number);
    }
  };

  // Close profile modal
  const handleProfileModalClose = () => {
    setSelectedUser(null);
    setIsProfileModalOpen(false); 
  };

  /////////////////////

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
    return user ? user : "Unknown User";
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

  // UI construction
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
              <div className="request-page-list-header">
                <h2>Your Requests</h2>
              </div>
              {userRequests.length > 0 ? (

                  userRequests.map((request) => {
                    const user = getUserById(request.accept_userid); // Retrieve the user object
                    
                    return (
                      <Card key={request.request_id} className="mb-3 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between">
                            <div className="text-start">
                              <strong className="text-highlight">
                                { user && user.username
                                  ? <span><strong>{user.username}</strong> has accepted your request:</span>
                                  : <span><strong>No one</strong> has accepted your request yet</span>}
                              </strong>
                              {request.meet_up_loc && 
                              <div className="text-muted">
                                <i className="bi bi-geo-alt"></i>

                                Meet up location: {request.meet_up_loc}
                              </div>}
                              <Card.Text className="normal-text">{request.description}</Card.Text>
                            </div>
                            <div className="text-end">

                            <span className="me-2 text-muted">Status:</span>
                            <span className={`badge ${getBadgeClass(request.request_status)} badge-responsive`}>
                              {request.request_status}
                              {(request.request_status === 'Pending' || request.request_status === 'Accepted') && ` / ${findDuplicate(request.delivery_pref)}`}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          {/* Dynamically create buttons based on request status, including Withdraw Help */}
                          {buttonCreate(request.request_status, request.request_id, request.delivery_pref, removeRequest, updateStatus, handleRateModalOpen, handleProfileModalOpen)}
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
              <div className="request-page-list-header">
                <h2>Requests You've Accepted</h2>
              </div>
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
                            {request.meet_up_loc && 
                            <div className="text-muted">
                              <i className="bi bi-geo-alt"></i>

                              Meet up location: {request.meet_up_loc}
                            </div>}
                            {/* Description section */}
                            <Card.Text className="normal-text">
                              <strong>Description:</strong> {request.description}
                            </Card.Text>
                          </div>
                          <div className="text-end">
                            <span className="me-2 text-muted">Status:</span>
                            <span className={`badge ${getBadgeClass(request.request_status)} badge-responsive`}>
                              {request.request_status}
                              {(request.request_status === 'Pending' || request.request_status === 'Accepted') && ` / ${findDuplicate(request.delivery_pref)}`}
                            </span>
                          </div>

                        </div>

                          <div className="d-flex justify-content-center mt-3">
                            {/* Dynamically create buttons for accepted requests */}
                            {buttonCreate(request.request_status === 'Closed' ? request.request_status : 'Your_accept', request.request_id,request.delivery_pref, removeRequest, updateStatus,handleRateModalOpen)}
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
      <RateModal
        show={isRateModalOpen}
        handleClose={handleRateModalClose}
        requestId={selectedRequestId}
        handleSubmit={handleCloseRequest}
        requests={requests}
        users={users}
      />
      <ProfileModal
        show={isProfileModalOpen}
        handleClose={handleProfileModalClose}
        user={selectedUser}
        msg={acceptMsg}
        contactNumber={contactNumber}
      />
    </div>
  );
};

const findDuplicate = (array) => {
  const counts = {};
  array.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });

  for (let item in counts) {
    if (counts[item] > 1) {
      return item;
    }
  }
  return "Invalid";
};


export default Request_Page_List;

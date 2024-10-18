import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Rating from './rating';  

const RateModal = ({ show, handleClose, requestId, handleSubmit, requests, users }) => {
  const [rating, setRating] = useState(0);  // State to store the rating

  // Find the specific request based on requestId
  const request = requests ? requests[requestId] : null;

  // Get the accept_userid from the request
  const acceptUserId = request ? request.accept_userid : null;

  // Find the user's username based on accept_userid
  const neighborUsername = acceptUserId && users[acceptUserId] ? users[acceptUserId].username : 'Unknown User';

  const requestDescription = request ? request.description : 'No description available';

  const handleRatingSubmit = () => {
    const userToUpdate = users[acceptUserId];  // Get the user from users data
  
    const currentRating = userToUpdate.rate || 5;  // Current user rating (default to 5 if not available)
    const rateCount = userToUpdate.rate_count || 1;  // Current rate count (default to 1 if not available)
    const currentUserId = request.userid;
    // Calculate the new rating
    let newRating = (currentRating * rateCount + rating) / (rateCount + 1);  
    newRating = parseFloat(newRating.toFixed(2)); 
    // Pass data to the parent through handleSubmit
    handleSubmit(requestId, acceptUserId, newRating,currentUserId);  // Pass new rating, userId, and requestId
    handleClose();  // Close modal
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">Please rate your neighbor's help</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {requestId ? (
          <div className="text-center">
            {/* Neighbor Username */}
            <div className="mb-3">
              <strong className="fw-bold">Neighbor Username:</strong>
              <p className="text-muted">{neighborUsername}</p>
            </div>

            {/* Request Description */}
            <div className="mb-3">
              <strong className="fw-bold">Request Description:</strong>
              <p className="text-muted">{requestDescription}</p>
            </div>

            {/* Rating Section */}
            <div className="rating-section">
              <p className="fw-bold">Please rate your neighbor's help:</p>
              <Rating onRate={(rate) => setRating(rate)} /> 
            </div>
          </div>
        ) : (
          <p>No request selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* Submit button centered */}
        <Button 
          variant="primary" 
          onClick={handleRatingSubmit}  // Handle the submit action and rating
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RateModal;




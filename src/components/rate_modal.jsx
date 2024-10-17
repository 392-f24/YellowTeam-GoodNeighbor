// rate_modal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RateModal = ({ show, handleClose, requestId, handleCloseRequest }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Close Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display dynamic content based on requestId */}
        {requestId ? (
          <p>Are you sure you want to close request ID: {requestId}?</p>
        ) : (
          <p>No request selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          variant="danger" 
          onClick={() => {
            handleCloseRequest(requestId); // Pass the requestId to the handler
            handleClose(); // Close modal
          }}
          disabled={!requestId}  // Disable if no requestId is passed
        >
          Close Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RateModal;

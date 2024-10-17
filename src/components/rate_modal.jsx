import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const RateModal = ({ show, handleClose, requestId, handleSubmit ,requests,users}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Close Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Current content showing the requestId */}
        {requestId ? (
          <p>Are you sure you want to close request ID: {requestId}?</p>
        ) : (
          <p>No request selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {/* Submit button centered */}
        <Button 
          variant="primary" 
          onClick={() => {
            handleSubmit(requestId);  // Handle the submit action
            handleClose();            // Close modal after submit
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RateModal;

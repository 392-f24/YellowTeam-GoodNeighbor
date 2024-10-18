import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { renderStars } from "./renderStars";

const ProfileModal = ({ show, handleClose, user }) => {
    if (!user) return null; // If no user data is passed, return null

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ background: '#EEEEEE' }} closeButton>
                <Modal.Title>{user.username}'s Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Name:</strong> {user.username || 'Not available'}</p>
                <p><strong>Location:</strong> {user.location || 'Not available'}</p>
                <p><strong>Rating:</strong> {renderStars(user.rate_score)}</p>
                <p><strong>Tasks Completed:</strong> {user.task_CBU || 0}</p>
                <p><strong>Tasks Offered:</strong> {user.task_CFU || 0}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;

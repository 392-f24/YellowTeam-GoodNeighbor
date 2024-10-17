import React, { useState, useEffect } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useDbData, useAuthState, useDbRemove } from '../utilities/firebase';



// Function to create buttons based on request status and connect handlers
export const buttonCreate = (status, requestId,withdrawHook,statusHook,deliveryPref) => {
  switch (status) {
    case 'Open':
      return (
        <>
          <Button variant="danger" size="sm" onClick={() => handleWithdrawRequest(requestId,withdrawHook)}>
            Withdraw Request
          </Button>
        </>
      );

    case 'Pending':
      return (
        <>
          <Button variant="success" size="sm" className="me-2" onClick={() => handleAcceptHelp(requestId,statusHook)}>
            Accept Help
          </Button>
          <Button variant="info" size="sm" onClick={() => handleViewProfile(requestId)}>
            View Profile
          </Button>
        </>
      );

    case 'Accepted':
      return (
        <>
          <Button variant="success" size="sm" className="me-2" onClick={() => handleCloseRequest(requestId)}>
            Close Request
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleWithdrawRequest(requestId,withdrawHook)}>
            Withdraw Request
          </Button>
        </>
      );

    case 'Done':
      return null; // No buttons for "Done" status
    case 'Your_accept':
      console.log(deliveryPref);
      return (
        <>
          <Button variant="danger" size="sm" onClick={() => handleWithdrawHelp(requestId,statusHook,deliveryPref)}>
            Withdraw Help
          </Button>
        </>
      );

    default:
      return null; // No buttons for unknown status
  }
};

// Event Handlers (inside the same file)
const handleWithdrawRequest = (requestId,withdrawHook) => {
  console.log(`Withdrawing request for request ID: ${requestId}`);
  withdrawHook(`requests/${requestId}`);
};

const handleAcceptHelp = (requestId,statusHook) => {
  console.log(`Accepting help for request ID: ${requestId}`);
  statusHook(`requests/${requestId}`, {
    request_status : 'Accepted'
  });
};

const handleWithdrawHelp = (requestId,statusHook,deliveryPref) => {
  const oldDevlivery = new Set([...deliveryPref]);
  statusHook(`requests/${requestId}`, {
    request_status: 'Open',
    accept_status: false,
    accept_userid: '',
    delivery_pref: [...oldDevlivery]
  });
};
const handleViewProfile = (requestId) => {
  console.log(`Viewing profile for request ID: ${requestId}`);
  // Implement view profile logic here
};

const handleCloseRequest = (requestId) => {
  console.log(`Closing request for request ID: ${requestId}`);
  // Implement close request logic here
};
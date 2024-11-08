import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import React, { useState } from 'react'; 
import Request_Page_List from '../Request_Page_List';
import { useDbData, useDbRemove, useDbStatusUpdate, useAuthState } from '../../utilities/firebase';


vi.mock('../../utilities/firebase', () => {
  return {
    useDbData: vi.fn(),
    useDbRemove: vi.fn(),
    useDbStatusUpdate: vi.fn(),
    useAuthState: vi.fn(() => [{ uid: 'user1' }, false]),
  };
});

let removeRequestMock;
let updateStatusMock;

describe('Request_Page_List Component', () => {
  it("deletes request from the mock database after clicking 'Withdraw Request'", async () => {

    let mockRequestsState;
    const setMockRequests = (newState) => {
      mockRequestsState = newState;
    };


    const initialRequests = {
      '1': {
        request_id: '1',
        request_status: 'Open',
        description: 'Request 1',
        userid: 'user1',
        delivery_pref: ['Drop off', 'Meet up'],
      },
    };
    mockRequestsState = initialRequests;

    useDbData.mockImplementation((path) => {
      if (path === 'requests') {
        return [mockRequestsState, null];
      }
      if (path === 'users') {
        return [{ user1: { name: 'Test User' } }, null];
      }
      return [null, null];
    });


    removeRequestMock = vi.fn((path) => {
      const requestId = path.split('/')[1];
      const { [requestId]: _, ...rest } = mockRequestsState;
      setMockRequests(rest); 
    });
    useDbRemove.mockImplementation(() => [removeRequestMock, null]);


    updateStatusMock = vi.fn();
    useDbStatusUpdate.mockImplementation(() => [updateStatusMock, null]);


    const { rerender } = render(<Request_Page_List />);


    const withdrawButton = await screen.findByText(/Withdraw Request/i);
    expect(withdrawButton).toBeInTheDocument();


    fireEvent.click(withdrawButton);


    await waitFor(() => {
      expect(removeRequestMock).toHaveBeenCalledWith('requests/1');
    });


    rerender(<Request_Page_List />);


    await waitFor(() => {

      expect(mockRequestsState['1']).toBeUndefined();

      expect(screen.queryByText(/Withdraw Request/i)).not.toBeInTheDocument();
    });
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import '@testing-library/jest-dom';
import { useDbData, useAuthState, useDbRemove } from '../../utilities/firebase';
import RequestsPage from './RequestsPage';
import Request_Page_List from '../Request_Page_List';
import RequestList from '../RequestList';

const mockRequests = {
  request2: {
    "accept_msp": "",
    "accept_phone_number": "",
    "accept_status": false,
    "accept_userid": "",
    "delivery_pref": [
      "Drop off",
      "Meet up",
      "Meet up"
    ],
    "description": "My dogs biting me",
    "expected_duration": "",
    "location": "",
    "post_time": "2024-10-28T00:30:40.549Z",
    "request_id": "-O9MsZ5SbGo3-gBk2yws",
    "request_status": "Open",
    "timer": 15586,
    "userid": "user1",
    "username": "Ziye Wang"
  }
};

const mockUsers = {
  user1 : {
    "Address": "1234 Another St",
    "Apartment": "Apt 125",
    "City": "New York",
    "NeighborhoodCode": "1234Code!",
    "StateLoc": "NY",
    "Zip": "12345",
    "location": "",
    "photo_url": "",
    "rate_count": 1,
    "rate_score": 5,
    "task_CBU": 0,
    "task_CFU": 0,
    "userid": "user1",
    "username": "Ziye Wang"
  }
};

vi.mock('../../utilities/firebase', async () => {
  const actual = await import('../../utilities/firebase');
  return {
    ...actual,
    useDbData: vi.fn(),
    useAuthState: vi.fn(),
    useDbRemove: vi.fn(() => [vi.fn(), null]), // Mock useDbRemove
  };
});

beforeEach(() => {
  useDbData.mockImplementationOnce(() => [mockRequests, null]); // First call
  useDbData.mockImplementationOnce(() => [mockUsers, null]); // Second call
  // useDbData.mockReturnValue([[], null]); // Default for subsequent calls
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('HomePage', () => {
  

  it('renders request list correctly', () => {
    render(
      <MemoryRouter>
        <RequestList />
      </MemoryRouter>
    );

    // expect(screen.getByText(/Your Requests Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Ziye/i)).toBeInTheDocument();
    expect(screen.getByText(/My dogs biting me/i)).toBeInTheDocument();
    // Add your expectations here if needed
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useDbData, useAuthState } from '../../utilities/firebase';
import RequestsPage from './RequestsPage';

vi.mock('../../utilities/firebase', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDbData: vi.fn(),
    useAuthState: vi.fn(),
  };
});


const mockRequests = {
  request1: { request_id: "1", request_status: "Open", description: "Request 1", userid: "user1", delivery_pref: ["Drop off", "Meet up"] },
  request2: { request_id: "2", request_status: "Pending", description: "Request 2", userid: "user1", delivery_pref: ["Drop off"] },
  request3: { request_id: "3", request_status: "Accepted", description: "Request 3", userid: "user1", delivery_pref: ["Meet up"] },
  request4: { request_id: "4", request_status: "Closed", description: "Request 4", userid: "user1", delivery_pref: ["Drop off", "Meet up", "Meet up"] },
};

const mockUsers = {
  user1: { userid: "user1", username: "Haichen Xu" },
};

beforeEach(() => {
  useAuthState.mockReturnValue([{ uid: "user1" }, false]);
  useDbData.mockImplementation((path) => {
    if (path === "requests") return [mockRequests, null];
    if (path === "users") return [mockUsers, null];
    return [null, null];
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("RequestsPage Component", () => {
  it("displays request statuses for user1: Open, Pending, Accepted, Closed", async () => {
    render(
      <MemoryRouter>
        <RequestsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
        const openBadge = screen.getAllByText(/Open/i).find((el) => el.closest(".badge-responsive"));
        const pendingBadge = screen.getAllByText(/Pending/i).find((el) => el.closest(".badge-responsive"));
        const acceptedBadge = screen.getAllByText(/Accepted/i).find((el) => el.closest(".badge-responsive"));
        const closedBadge = screen.getAllByText(/Closed/i).find((el) => el.closest(".badge-responsive"));
      
        expect(openBadge).toBeInTheDocument();
        expect(pendingBadge).toBeInTheDocument();
        expect(acceptedBadge).toBeInTheDocument();
        expect(closedBadge).toBeInTheDocument();
      });
      
  });
});

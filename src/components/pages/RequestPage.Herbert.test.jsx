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
  request2: { request_id: "2", request_status: "Pending", description: "Request 2", userid: "user2", delivery_pref: ["Drop off"] },
};

const mockUsers = {
  user1: { userid: "user1", username: "Haichen Xu", rate_score: 5 },
  user2: { userid: "user2", username: "Linh Ly", rate_score: 4 },
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
  it("fetches request data and verifies the expected format", async () => {
    render(
      <MemoryRouter>
        <RequestsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const request1Text = screen.getByText(/Request 1/i);
      const request2Text = screen.getByText(/Request 2/i);

      expect(request1Text).toBeInTheDocument();
      expect(request2Text).toBeInTheDocument();

      const deliveryPref1 = screen.getByText(/Drop off/i);
      const deliveryPref2 = screen.getByText(/Meet up/i);

      expect(deliveryPref1).toBeInTheDocument();
      expect(deliveryPref2).toBeInTheDocument();

      const user1Name = screen.getByText(/Haichen Xu/i);
      const user2Name = screen.getByText(/Linh Ly/i);

      expect(user1Name).toBeInTheDocument();
      expect(user2Name).toBeInTheDocument();
    });
  });
});

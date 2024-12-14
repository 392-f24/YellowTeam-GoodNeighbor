import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useAuthState } from '../../utilities/firebase';
import App from '../../App';
import ProfilePage from '../pages/ProfilePage';

vi.mock('../../utilities/firebase', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useAuthState: vi.fn(),
  };
});

beforeEach(() => {
  useAuthState.mockReturnValue([null, false]); // No user initially
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("Account Creation and Redirection to Profile Page", () => {
  it("redirects new users to the profile page after account creation", async () => {
    // Mock the authenticated user after account creation
    useAuthState.mockReturnValue([{ uid: "newUser", email: "newuser@example.com" }, false]);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Check that the ProfilePage is displayed
      const profilePageHeading = screen.getByText(/Profile/i); // Assuming ProfilePage has "Profile" heading
      expect(profilePageHeading).toBeInTheDocument();

      const usernameField = screen.getByLabelText(/Username/i);
      const locationField = screen.getByLabelText(/Location/i);

      expect(usernameField).toBeInTheDocument();
      expect(locationField).toBeInTheDocument();
    });
  });
});

// src/components/pages/ProfilePage-Wang.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from './ProfilePage'; // Adjust the import path if necessary
import { vi } from 'vitest';

// Mocking Firebase authentication and data
vi.mock('../../utilities/firebase', () => ({
  useAuthState: vi.fn().mockReturnValue([null, false]), // No user signed in
  useDbData: vi.fn().mockReturnValue([null, false]), // No data from the database
}));

describe('ProfilePage-Wang', () => {

  it('renders the ProfilePage correctly', () => {
    render(<ProfilePage />);  // Render the ProfilePage component
    
    // Check for static elements on the page
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Good Neighbor')).toBeInTheDocument();
  });

  it('displays loading state while waiting for data', () => {
    render(<ProfilePage />);  // Render the ProfilePage component
    
    // If there's a loading state while waiting for data, ensure it's visible
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show a "sign in" button', () => {
    render(<ProfilePage />);

    // Check if the sign-in button is rendered
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should display an error message if Firebase authentication fails', () => {
    // Simulating a Firebase failure by returning an error in the mock
    vi.mock('../../utilities/firebase', () => ({
      useAuthState: vi.fn().mockReturnValue([null, false]),
      useDbData: vi.fn().mockImplementation(() => {
        throw new Error('Firebase connection failed');
      }),
    }));

    render(<ProfilePage />);

    // Test that an error message is displayed when Firebase fails
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('should handle button click correctly', () => {
    render(<ProfilePage />);

    // Simulate a click on the sign-in button
    const button = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(button);

    // After clicking the button, check if the state changes or UI updates
    // For example, you might check for a loading message or state change
    expect(screen.getByText('Signing in...')).toBeInTheDocument(); // You can adjust this based on the actual component behavior
  });

});

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ProfilePage from './components/pages/ProfilePage';
import { useAuthState, useDbData, useDbAdd } from './utilities/firebase';


// it('shows request list', () => {
//   render(<App />);
//   screen.getByText(/Good Neighbor/);
// });

vi.mock('./utilities/firebase', () => ({
  useAuthState: vi.fn(),
  useDbData: vi.fn(),
  useDbAdd: vi.fn(),
  signOut: vi.fn() 
}));

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('User name on profile page', () => {
  it("displays the user's name on the Profile page", () => {

    const mockUser = { uid: 'mockUserId', displayName: 'John Doe' };
    useAuthState.mockReturnValue([mockUser]);

    useDbData.mockReturnValue([{ rate_score: 4, rate_count: 10, task_CBU: 3, task_CFU: 5 }, null]);

    render(<ProfilePage />);

    const userName = screen.getByText(/John Doe/i);
    expect(userName).toBeDefined();
  });
});

describe('ProfilePage - New User Profile Creation', () => {
  it("shows 'Create Profile' button for users without profile data and adds user to the mock database on submission", async () => {

    const mockUser = { uid: 'newUserId', displayName: 'New User' };
    useAuthState.mockReturnValue([mockUser]);
    useDbData.mockReturnValue([null, false]); //Simulates no profile data

    const mockAddUser = vi.fn();
    useDbAdd.mockReturnValue([mockAddUser, null]);

    render(<ProfilePage />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    const createProfileButton = screen.getByText(/Create Profile/i);
    expect(createProfileButton).toBeDefined();

    fireEvent.click(createProfileButton);

    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/i), { target: { value: 'New User' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText(/Apartment, suite, etc./i), { target: { value: 'Apt 4B' } });
    fireEvent.change(screen.getByPlaceholderText(/City/i), { target: { value: 'Metropolis' } });
    fireEvent.change(screen.getByPlaceholderText(/State/i), { target: { value: 'NY' } });
    fireEvent.change(screen.getByPlaceholderText(/Zip Code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Neighborhood Code/i), { target: { value: 'NEIGH123' } });

    const saveButton = screen.getByText(/Save Profile/i);
    fireEvent.click(saveButton);

    expect(mockAddUser).toHaveBeenCalledWith(
      {
        username: 'New User',
        Address: '123 Main St',
        Apartment: 'Apt 4B',
        City: 'Metropolis',
        StateLoc: 'NY',
        Zip: '12345',
        NeighborhoodCode: 'NEIGH123',
        userid: 'newUserId',
        rate_count: 0,
        rate_score: 0,
        task_CBU: 0,
        task_CFU: 0,
        photo_url: '',
        location: ''
      },
      'newUserId'
    );
  });
});

// describe('counter tests', () => {
    
//   test("Counter should be 0 at the start", () => {
//     render(<App />);
//     expect(screen.getByText('count is: 0')).toBeDefined();
//   });

//   test("Counter should increment by one when clicked", async () => {
//     render(<App />);
//     const counter = screen.getByRole('button');
//     fireEvent.click(counter);
//     expect(await screen.getByText('count is: 1')).toBeDefined();
//   });

// });


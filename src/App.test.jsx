import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import ProfilePage from './components/pages/ProfilePage';
import { useAuthState, useDbData } from './utilities/firebase';


// it('shows request list', () => {
//   render(<App />);
//   screen.getByText(/Good Neighbor/);
// });

vi.mock('./utilities/firebase', () => ({
  useAuthState: vi.fn(),
  useDbData: vi.fn(),
  signOut: vi.fn() 
}));

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


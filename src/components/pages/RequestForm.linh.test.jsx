import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import '@testing-library/jest-dom';
import { useDbData, useAuthState, useDbRemove } from '../../utilities/firebase';
import RequestsPage from './RequestsPage';
import Request_Page_List from '../Request_Page_List';
import RequestList from '../RequestList';

describe('requestformpage', () => {
  
  
  it('should navigate to the request form when the Submit button is clicked', async () => {
    
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/New Request/i)).toBeInTheDocument();
  });
});
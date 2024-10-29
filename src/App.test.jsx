import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import '@testing-library/jest-dom';
import { useDbData, useAuthState, useDbRemove } from './utilities/firebase';
import Request_Page_List from './components/Request_Page_List';
import RequestsPage from './components/pages/RequestsPage';



describe('Homepage', () => {
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


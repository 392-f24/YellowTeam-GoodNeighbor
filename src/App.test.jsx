import { describe, it, expect, vi,  test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';  // Import jest-dom matchers

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import RequestFormPage from './components/pages/RequestForm';

describe('RequestFormPage', () => {
  test('displays Meet Up textbox when Meet up option is selected', () => {
    render(
      <Router>
        <RequestFormPage />
      </Router>
    );
    const pickUpCheckbox = screen.getByTestId('checkbox-Meet up');
    fireEvent.click(pickUpCheckbox);
    expect(pickUpCheckbox.checked).toBe(true);
    screen.getByLabelText('Meet-up Location:');

    const input = screen.getByPlaceholderText(/Enter location/i)
    expect(input).toBeInTheDocument();

  })
  
  
})
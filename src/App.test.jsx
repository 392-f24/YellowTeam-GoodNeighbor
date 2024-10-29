import { describe, it, expect, vi,  test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';  // Import jest-dom matchers

import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import RequestFormPage from './components/pages/RequestForm';
import HomePage from './components/pages/HomePage';

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

  describe('send text from home page to request form', () => {
    it('should send the text in the textbox to the textbox on the request form', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/requestform" element={<RequestFormPage />} />
          </Routes>
        </MemoryRouter>
      );
      const input = screen.getByPlaceholderText(/How can your neighbors help?/i);
      fireEvent.change(input, { target: { value: 'I need a hammer!' } });

      const submitButton = screen.getByText(/Submit/i);
      fireEvent.click(submitButton);

      expect(screen.getByText(/New Request/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Description/i)).toHaveValue('I need a hammer!');
    });
    
  });
  
})
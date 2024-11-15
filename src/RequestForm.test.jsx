import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RequestForm } from './components/Form.jsx';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal(); // Import the original module
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock only the useNavigate function
  };
});

import { MemoryRouter, useNavigate } from 'react-router-dom'; // Import after the mock

describe('RequestForm Component', () => {
  let mockSetDescription, mockSetTimer, mockSetDeliveryPref, mockSetMeetUpLocation, mockOnClick, mockNavigate;

  beforeEach(() => {
    mockSetDescription = vi.fn();
    mockSetTimer = vi.fn();
    mockSetDeliveryPref = vi.fn();
    mockSetMeetUpLocation = vi.fn();
    mockOnClick = vi.fn();
    mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate); // Correctly mock the useNavigate hook
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderComponent = (deliveryPref = [], meetUpLocation = '') => {
    render(
      <MemoryRouter>
        <RequestForm
          data={{ description: '', meet_up_loc: meetUpLocation }}
          setDescription={mockSetDescription}
          setTimer={mockSetTimer}
          deliveryPref={deliveryPref}
          setDeliveryPref={mockSetDeliveryPref}
          setMeetUpLocation={mockSetMeetUpLocation}
          onClick={mockOnClick}
        />
      </MemoryRouter>
    );
  };

  it('renders description input', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/how can your neighbors help/i)).toBeInTheDocument();
  });

  it('renders post expiration section', () => {
    renderComponent();
    expect(screen.getByText(/post expiration/i)).toBeInTheDocument();
  });

  it('renders delivery preference section', () => {
    renderComponent();
    expect(screen.getByText(/delivery preference/i)).toBeInTheDocument();
  });

  it('shows Meet Up textbox when "Meet Up" option is selected', () => {
    renderComponent(['Meet up']); // Pass 'Meet up' as a selected delivery option
    expect(screen.getByLabelText(/Meet-up Location/i)).toBeInTheDocument();
  });

  it('does not show Meet Up textbox when "Meet Up" option is not selected', () => {
    renderComponent(['Pick up']); // Pass a different option
    expect(screen.queryByLabelText(/meet up location/i)).not.toBeInTheDocument();
  });

  it('triggers the Cancel button navigation', () => {
    renderComponent();
    const cancelButton = screen.getByText(/cancel/i);
    fireEvent.click(cancelButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('triggers the Submit button handler', () => {
    renderComponent();
    const submitButton = screen.getByText(/submit/i);
    fireEvent.click(submitButton);
    expect(mockOnClick).toHaveBeenCalled();
  });
});

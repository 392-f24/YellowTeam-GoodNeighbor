import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateUser from './CreateUser';
import { useDbAdd } from '../../utilities/firebase';

// Mock the custom Firebase hook (useDbAdd) used in the component
vi.mock('../../utilities/firebase');

const mockAddUser = vi.fn();
const mockCloseModal = vi.fn();

beforeEach(() => {
  // Reset mock functions
  useDbAdd.mockReturnValue([mockAddUser, null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('CreateUser Component', () => {
  it('should allow the user to fill in form fields', () => {
    render(<CreateUser closeModal={mockCloseModal} userId="123" />);

    // Get the input elements
    const nameInput = screen.getByPlaceholderText(/Enter your full name/);
    const addressInput = screen.getByPlaceholderText(/Enter your address/);
    const apartmentInput = screen.getByPlaceholderText(/Apartment, suite, etc./);
    const cityInput = screen.getByPlaceholderText(/City/);
    const stateInput = screen.getByPlaceholderText(/State/);
    const zipInput = screen.getByPlaceholderText(/Zip Code/);
    const neighborhoodCodeInput = screen.getByPlaceholderText(/Enter Neighborhood Code/);

    // Simulate user input
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(apartmentInput, { target: { value: 'Apt 101' } });
    fireEvent.change(cityInput, { target: { value: 'Sample City' } });
    fireEvent.change(stateInput, { target: { value: 'NY' } });
    fireEvent.change(zipInput, { target: { value: '10001' } });
    fireEvent.change(neighborhoodCodeInput, { target: { value: 'XYZ123' } });

    // Assert that the input values are updated
    expect(nameInput.value).toBe('John Doe');
    expect(addressInput.value).toBe('123 Main St');
    expect(apartmentInput.value).toBe('Apt 101');
    expect(cityInput.value).toBe('Sample City');
    expect(stateInput.value).toBe('NY');
    expect(zipInput.value).toBe('10001');
    expect(neighborhoodCodeInput.value).toBe('XYZ123');
  });

  it('should call handleSave when the Save Profile button is clicked', async () => {
    render(<CreateUser closeModal={mockCloseModal} userId="123" />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText(/Enter your full name/), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter your address/), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText(/Apartment, suite, etc./), { target: { value: 'Apt 101' } });
    fireEvent.change(screen.getByPlaceholderText(/City/), { target: { value: 'Sample City' } });
    fireEvent.change(screen.getByPlaceholderText(/State/), { target: { value: 'NY' } });
    fireEvent.change(screen.getByPlaceholderText(/Zip Code/), { target: { value: '10001' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter Neighborhood Code/), { target: { value: 'XYZ123' } });

    // Simulate the Save button click
    fireEvent.click(screen.getByText('Save Profile'));

    // Wait for any async code to run if necessary
    await waitFor(() => {
      // Check if mockAddUser was called with the correct data
      expect(mockAddUser).toHaveBeenCalledWith({
        username: 'John Doe',
        Address: '123 Main St',
        Apartment: 'Apt 101',
        City: 'Sample City',
        StateLoc: 'NY',
        Zip: '10001',
        NeighborhoodCode: 'XYZ123',
        userid: '123',
        rate_count: 0,
        rate_score: 0,
        task_CBU: 0,
        task_CFU: 0,
        photo_url: '',
        location: '',
      }, '123');
    });

    // Check if closeModal was called
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should call closeModal when the Cancel button is clicked', () => {
    render(<CreateUser closeModal={mockCloseModal} userId="123" />);

    // Click the Cancel button
    fireEvent.click(screen.getByText('Cancel'));

    // Check if closeModal was called
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WarehouseForm from '../../../src/components/warehouses/WarehouseForm';
import { vi } from 'vitest';

describe('WarehouseForm', () => {
  const setup = (props = {}) => {
    const onSubmit = vi.fn();
    render(<WarehouseForm onSubmit={onSubmit} {...props} />);
    return { onSubmit };
  };

  it('renders all input fields', () => {
    setup();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('shows validation error for required name', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is valid', () => {
    const { onSubmit } = setup();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Warehouse X' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'Location Y' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Warehouse X', location: 'Location Y' });
  });
});
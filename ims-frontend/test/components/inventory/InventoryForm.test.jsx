import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import InventoryForm from '../../../src/components/inventory/InventoryForm';

describe('InventoryForm', () => {
  const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
  ];
  const warehouses = [
    { id: 10, name: 'Warehouse A' },
    { id: 20, name: 'Warehouse B' },
  ];
  let onSubmit;

  beforeEach(() => {
    vi.clearAllMocks();
    onSubmit = vi.fn();
  });

  const defaultProps = {
    products,
    warehouses,
    onSubmit: () => {},
    submitLabel: 'Save',
  };

  it('renders all fields and submit button', () => {
    render(<InventoryForm {...defaultProps} />);
    expect(screen.getByLabelText(/product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/warehouse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', () => {
    render(<InventoryForm {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/product is required/i)).toBeInTheDocument();
    expect(screen.getByText(/warehouse is required/i)).toBeInTheDocument();
    expect(screen.getByText(/quantity must be non-negative/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when valid', () => {
    render(<InventoryForm {...defaultProps} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/product/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/warehouse/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '15' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledWith({ productId: '1', warehouseId: '10', quantity: 15 });
  });

  it('renders with initial values', () => {
    render(
      <InventoryForm
        {...defaultProps}
        initialValues={{ productId: '2', warehouseId: '20', quantity: 7 }}
      />
    );
    expect(screen.getByLabelText(/product/i)).toHaveValue('2');
    expect(screen.getByLabelText(/warehouse/i)).toHaveValue('20');
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(7);
  });
});
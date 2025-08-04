import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../../../src/components/products/ProductForm';
import { vi } from 'vitest';

describe('ProductForm', () => {
  const setup = (props = {}) => {
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} {...props} />);
    return { onSubmit };
  };

  it('renders all input fields', () => {
    setup();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sku/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('shows validation errors for required fields', () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/sku is required/i)).toBeInTheDocument();
    expect(screen.getByText(/price must be non-negative/i)).toBeInTheDocument();
  });

  it('calls onSubmit with correct data when form is valid', () => {
    const { onSubmit } = setup();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/sku/i), { target: { value: 'SKU123' } });
    fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'Category1' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '99.99' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'A test product' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Test Product',
      sku: 'SKU123',
      category: 'Category1',
      price: 99.99,
      description: 'A test product',
    });
  });
});
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductEditPage from '../../../src/pages/products/ProductEditPage';
import * as productService from '../../../src/services/productService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/productService');

const mockProduct = {
  name: 'Test Product',
  sku: 'SKU123',
  category: 'Category1',
  price: 99.99,
  description: 'A test product',
};

describe('ProductEditPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithRouter(initialEntries = ['/products/1/edit']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/products" element={<div>Product List Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('shows loading initially', async () => {
    productService.getProduct.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithRouter();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders form with product data', async () => {
    productService.getProduct.mockResolvedValueOnce(mockProduct);
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument());
    expect(screen.getByDisplayValue('SKU123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Category1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('99.99')).toBeInTheDocument();
    expect(screen.getByDisplayValue('A test product')).toBeInTheDocument();
  });

  it('submits updated data and navigates', async () => {
    productService.getProduct.mockResolvedValueOnce(mockProduct);
    productService.updateProduct.mockResolvedValueOnce({});
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(productService.updateProduct).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'Updated Product' })));
    await waitFor(() => expect(screen.getByText('Product List Page')).toBeInTheDocument());
  });

  it('shows error and navigates on fetch failure', async () => {
    window.alert = vi.fn();
    productService.getProduct.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch product')));
    await waitFor(() => expect(screen.getByText('Product List Page')).toBeInTheDocument());
  });

  it('shows error on update failure', async () => {
    window.alert = vi.fn();
    productService.getProduct.mockResolvedValueOnce(mockProduct);
    productService.updateProduct.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to update product')));
  });
});
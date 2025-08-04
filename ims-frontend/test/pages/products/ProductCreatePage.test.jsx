import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCreatePage from '../../../src/pages/products/ProductCreatePage';
import * as productService from '../../../src/services/productService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/productService');

describe('ProductCreatePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithRouter(initialEntries = ['/products/new']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/products" element={<div>Product List Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('renders the product form', () => {
    renderWithRouter();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('submits form and navigates on success', async () => {
    productService.createProduct.mockResolvedValueOnce({});
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText(/sku/i), { target: { value: 'SKU999' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(productService.createProduct).toHaveBeenCalledWith(expect.objectContaining({ name: 'New Product' })));
    await waitFor(() => expect(screen.getByText('Product List Page')).toBeInTheDocument());
  });

  it('shows error on create failure', async () => {
    window.alert = vi.fn();
    productService.createProduct.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByLabelText(/sku/i), { target: { value: 'SKU999' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to create product')));
  });
});
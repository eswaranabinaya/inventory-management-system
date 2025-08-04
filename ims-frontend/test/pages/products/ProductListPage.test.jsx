import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductListPage from '../../../src/pages/products/ProductListPage';
import * as productService from '../../../src/services/productService';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

// Mock productService
vi.mock('../../../src/services/productService');

const mockProducts = [
  { id: 1, name: 'Product A', sku: 'SKU001', price: 10 },
  { id: 2, name: 'Product B', sku: 'SKU002', price: 20 },
];

describe('ProductListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true); // Always confirm
    window.alert = vi.fn();
  });

  it('renders product list from API', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts);

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    // Loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for products to appear
    for (const product of mockProducts) {
      await waitFor(() => expect(screen.getByText(product.name)).toBeInTheDocument());
      expect(screen.getByText(product.sku)).toBeInTheDocument();
      expect(screen.getByText(product.price.toString())).toBeInTheDocument();
    }
  });

  it('shows error message on API failure', async () => {
    productService.getProducts.mockRejectedValueOnce(new Error('API Error'));

    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch products'));
    });
  });

  it('deletes a product and refreshes the list', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts).mockResolvedValueOnce([]);
    productService.deleteProduct.mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(productService.deleteProduct).toHaveBeenCalledWith(1));
    // After deletion, list should refresh (mock returns empty)
    await waitFor(() => expect(screen.getByText(/no products/i)).toBeInTheDocument());
  });

  it('shows alert on delete error', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    productService.deleteProduct.mockRejectedValueOnce(new Error('API Error'));
    render(
      <MemoryRouter>
        <ProductListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to delete product')));
  });

  // Add more interaction tests as needed, e.g., pagination, search, delete, etc.
});
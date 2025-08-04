import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import InventoryCreatePage from '../../../src/pages/inventory/InventoryCreatePage';
import * as inventoryService from '../../../src/services/inventoryService';
import * as productService from '../../../src/services/productService';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../src/services/inventoryService');
vi.mock('../../../src/services/productService');
vi.mock('../../../src/services/warehouseService');

const mockProducts = [ { id: '1', name: 'Product 1' } ];
const mockWarehouses = [ { id: '10', name: 'Warehouse A' } ];

describe('InventoryCreatePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('shows loading state', () => {
    productService.getProducts.mockReturnValue(new Promise(() => {}));
    warehouseService.getWarehouses.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <InventoryCreatePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows alert on fetch error', async () => {
    productService.getProducts.mockRejectedValueOnce(new Error('API Error'));
    warehouseService.getWarehouses.mockResolvedValue(mockWarehouses);
    render(
      <MemoryRouter>
        <InventoryCreatePage />
      </MemoryRouter>
    );
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch')));
  });

  it('renders form after loading', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    render(
      <MemoryRouter>
        <InventoryCreatePage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByLabelText(/product/i)).toBeInTheDocument());
    expect(screen.getByLabelText(/warehouse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
  });

  it('creates inventory and navigates on success', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    inventoryService.createInventory.mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <InventoryCreatePage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByLabelText(/product/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/product/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/warehouse/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(inventoryService.createInventory).toHaveBeenCalledWith({ productId: '1', warehouseId: '10', quantity: 5 }));
  });

  it('shows alert on create error', async () => {
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    inventoryService.createInventory.mockRejectedValueOnce(new Error('Create failed'));
    render(
      <MemoryRouter>
        <InventoryCreatePage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByLabelText(/product/i)).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/product/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/warehouse/i), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '5' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to create inventory')));
  });
});
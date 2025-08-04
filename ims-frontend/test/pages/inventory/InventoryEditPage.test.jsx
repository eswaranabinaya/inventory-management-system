import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import InventoryEditPage from '../../../src/pages/inventory/InventoryEditPage';
import * as inventoryService from '../../../src/services/inventoryService';
import * as productService from '../../../src/services/productService';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../../src/services/inventoryService');
vi.mock('../../../src/services/productService');
vi.mock('../../../src/services/warehouseService');

const mockInventory = { productId: '1', warehouseId: '10', quantity: 5 };
const mockProducts = [ { id: '1', name: 'Product 1' } ];
const mockWarehouses = [ { id: '10', name: 'Warehouse A' } ];

describe('InventoryEditPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.alert = vi.fn();
  });

  it('shows loading state', () => {
    inventoryService.getInventory.mockReturnValue(new Promise(() => {}));
    productService.getProducts.mockReturnValue(new Promise(() => {}));
    warehouseService.getWarehouses.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter initialEntries={["/inventory/edit/123"]}>
        <Routes>
          <Route path="/inventory/edit/:id" element={<InventoryEditPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows alert and navigates on fetch error', async () => {
    inventoryService.getInventory.mockRejectedValueOnce(new Error('API Error'));
    productService.getProducts.mockResolvedValue(mockProducts);
    warehouseService.getWarehouses.mockResolvedValue(mockWarehouses);
    render(
      <MemoryRouter initialEntries={["/inventory/edit/123"]}>
        <Routes>
          <Route path="/inventory/edit/:id" element={<InventoryEditPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch')));
  });

  it('renders form with fetched data', async () => {
    inventoryService.getInventory.mockResolvedValueOnce(mockInventory);
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    render(
      <MemoryRouter initialEntries={["/inventory/edit/123"]}>
        <Routes>
          <Route path="/inventory/edit/:id" element={<InventoryEditPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByDisplayValue('5')).toBeInTheDocument());
    expect(screen.getByRole('combobox', { name: /product/i })).toHaveValue('1');
    expect(screen.getByRole('combobox', { name: /warehouse/i })).toHaveValue('10');
  });

  it('updates inventory and navigates on success', async () => {
    inventoryService.getInventory.mockResolvedValueOnce(mockInventory);
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    inventoryService.updateInventory.mockResolvedValueOnce();
    render(
      <MemoryRouter initialEntries={["/inventory/edit/123"]}>
        <Routes>
          <Route path="/inventory/edit/:id" element={<InventoryEditPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByDisplayValue('5')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '8' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(inventoryService.updateInventory).toHaveBeenCalledWith('123', { productId: '1', warehouseId: '10', quantity: 8 }));
  });

  it('shows alert on update error', async () => {
    inventoryService.getInventory.mockResolvedValueOnce(mockInventory);
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    inventoryService.updateInventory.mockRejectedValueOnce(new Error('Update failed'));
    render(
      <MemoryRouter initialEntries={["/inventory/edit/123"]}>
        <Routes>
          <Route path="/inventory/edit/:id" element={<InventoryEditPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByDisplayValue('5')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to update inventory')));
  });
});
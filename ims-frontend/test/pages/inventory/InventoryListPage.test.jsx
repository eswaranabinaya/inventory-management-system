import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InventoryListPage from '../../../src/pages/inventory/InventoryListPage';
import * as inventoryService from '../../../src/services/inventoryService';
import * as productService from '../../../src/services/productService';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/inventoryService');
vi.mock('../../../src/services/productService');
vi.mock('../../../src/services/warehouseService');

const mockInventory = [
  { id: 1, productId: 10, warehouseId: 100, quantity: 5 },
  { id: 2, productId: 20, warehouseId: 200, quantity: 10 },
];
const mockProducts = [
  { id: 10, name: 'Product A' },
  { id: 20, name: 'Product B' },
];
const mockWarehouses = [
  { id: 100, name: 'Warehouse X' },
  { id: 200, name: 'Warehouse Y' },
];

describe('InventoryListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
    window.alert = vi.fn();
  });

  it('renders inventory list from API', async () => {
    inventoryService.getInventories.mockResolvedValueOnce(mockInventory);
    productService.getProducts.mockResolvedValueOnce(mockProducts);
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    render(
      <MemoryRouter>
        <InventoryListPage />
      </MemoryRouter>
    );
    for (const item of mockInventory) {
      await waitFor(() => expect(screen.getByText(item.quantity)).toBeInTheDocument());
      expect(screen.getByText(mockProducts.find(p => p.id === item.productId).name)).toBeInTheDocument();
      expect(screen.getByText(mockWarehouses.find(w => w.id === item.warehouseId).name)).toBeInTheDocument();
    }
  });

  it('shows loading state', () => {
    inventoryService.getInventories.mockReturnValue(new Promise(() => {}));
    productService.getProducts.mockReturnValue(new Promise(() => {}));
    warehouseService.getWarehouses.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <InventoryListPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('deletes an inventory record and refreshes the list', async () => {
    inventoryService.getInventories.mockResolvedValueOnce(mockInventory).mockResolvedValueOnce([]);
    productService.getProducts.mockResolvedValue(mockProducts);
    warehouseService.getWarehouses.mockResolvedValue(mockWarehouses);
    inventoryService.deleteInventory.mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <InventoryListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(inventoryService.deleteInventory).toHaveBeenCalledWith(1));
    await waitFor(() => expect(screen.getByText(/no inventory records/i)).toBeInTheDocument());
  });

  it('shows alert on delete error', async () => {
    inventoryService.getInventories.mockResolvedValueOnce(mockInventory);
    productService.getProducts.mockResolvedValue(mockProducts);
    warehouseService.getWarehouses.mockResolvedValue(mockWarehouses);
    inventoryService.deleteInventory.mockRejectedValueOnce(new Error('API Error'));
    render(
      <MemoryRouter>
        <InventoryListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to delete inventory')));
  });

  it('shows alert on fetch error', async () => {
    inventoryService.getInventories.mockRejectedValueOnce(new Error('API Error'));
    productService.getProducts.mockResolvedValue(mockProducts);
    warehouseService.getWarehouses.mockResolvedValue(mockWarehouses);
    render(
      <MemoryRouter>
        <InventoryListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch inventory')));
  });
});
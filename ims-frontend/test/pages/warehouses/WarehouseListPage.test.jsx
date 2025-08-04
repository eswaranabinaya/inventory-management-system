import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WarehouseListPage from '../../../src/pages/warehouses/WarehouseListPage';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/warehouseService');

const mockWarehouses = [
  { id: 1, name: 'Warehouse A', location: 'Location 1' },
  { id: 2, name: 'Warehouse B', location: 'Location 2' },
];

describe('WarehouseListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.confirm = vi.fn(() => true);
    window.alert = vi.fn();
  });

  it('renders warehouse list from API', async () => {
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    render(
      <MemoryRouter>
        <WarehouseListPage />
      </MemoryRouter>
    );
    for (const warehouse of mockWarehouses) {
      await waitFor(() => expect(screen.getByText(warehouse.name)).toBeInTheDocument());
      expect(screen.getByText(warehouse.location)).toBeInTheDocument();
    }
  });

  it('shows loading state', () => {
    warehouseService.getWarehouses.mockReturnValue(new Promise(() => {}));
    render(
      <MemoryRouter>
        <WarehouseListPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('deletes a warehouse and refreshes the list', async () => {
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses).mockResolvedValueOnce([]);
    warehouseService.deleteWarehouse.mockResolvedValueOnce();
    render(
      <MemoryRouter>
        <WarehouseListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Warehouse A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(warehouseService.deleteWarehouse).toHaveBeenCalledWith(1));
    await waitFor(() => expect(screen.getByText(/no warehouses/i)).toBeInTheDocument());
  });

  it('shows alert on delete error', async () => {
    warehouseService.getWarehouses.mockResolvedValueOnce(mockWarehouses);
    warehouseService.deleteWarehouse.mockRejectedValueOnce(new Error('API Error'));
    render(
      <MemoryRouter>
        <WarehouseListPage />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText('Warehouse A')).toBeInTheDocument());
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to delete warehouse')));
  });
});
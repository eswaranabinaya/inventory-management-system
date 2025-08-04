import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WarehouseEditPage from '../../../src/pages/warehouses/WarehouseEditPage';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/warehouseService');

const mockWarehouse = {
  name: 'Warehouse X',
  location: 'Location Y',
};

describe('WarehouseEditPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithRouter(initialEntries = ['/warehouses/1/edit']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/warehouses/:id/edit" element={<WarehouseEditPage />} />
          <Route path="/warehouses" element={<div>Warehouse List Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('shows loading initially', async () => {
    warehouseService.getWarehouse.mockReturnValue(new Promise(() => {})); // never resolves
    renderWithRouter();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders form with warehouse data', async () => {
    warehouseService.getWarehouse.mockResolvedValueOnce(mockWarehouse);
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Warehouse X')).toBeInTheDocument());
    expect(screen.getByDisplayValue('Location Y')).toBeInTheDocument();
  });

  it('submits updated data and navigates', async () => {
    warehouseService.getWarehouse.mockResolvedValueOnce(mockWarehouse);
    warehouseService.updateWarehouse.mockResolvedValueOnce({});
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Warehouse X')).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Warehouse' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(warehouseService.updateWarehouse).toHaveBeenCalledWith('1', expect.objectContaining({ name: 'Updated Warehouse' })));
    await waitFor(() => expect(screen.getByText('Warehouse List Page')).toBeInTheDocument());
  });

  it('shows error and navigates on fetch failure', async () => {
    window.alert = vi.fn();
    warehouseService.getWarehouse.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to fetch warehouse')));
    await waitFor(() => expect(screen.getByText('Warehouse List Page')).toBeInTheDocument());
  });

  it('shows error on update failure', async () => {
    window.alert = vi.fn();
    warehouseService.getWarehouse.mockResolvedValueOnce(mockWarehouse);
    warehouseService.updateWarehouse.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    await waitFor(() => expect(screen.getByDisplayValue('Warehouse X')).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: /update/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to update warehouse')));
  });
});
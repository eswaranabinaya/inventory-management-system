import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WarehouseCreatePage from '../../../src/pages/warehouses/WarehouseCreatePage';
import * as warehouseService from '../../../src/services/warehouseService';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../../src/services/warehouseService');

describe('WarehouseCreatePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderWithRouter(initialEntries = ['/warehouses/new']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/warehouses/new" element={<WarehouseCreatePage />} />
          <Route path="/warehouses" element={<div>Warehouse List Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('renders the warehouse form', () => {
    renderWithRouter();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('submits form and navigates on success', async () => {
    warehouseService.createWarehouse.mockResolvedValueOnce({});
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Warehouse' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(warehouseService.createWarehouse).toHaveBeenCalledWith(expect.objectContaining({ name: 'New Warehouse' })));
    await waitFor(() => expect(screen.getByText('Warehouse List Page')).toBeInTheDocument());
  });

  it('shows error on create failure', async () => {
    window.alert = vi.fn();
    warehouseService.createWarehouse.mockRejectedValueOnce(new Error('API Error'));
    renderWithRouter();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Warehouse' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Failed to create warehouse')));
  });
});
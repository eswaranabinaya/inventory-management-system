import { vi } from 'vitest';
import {
  getWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse
} from '../../src/services/warehouseService';

describe('warehouseService', () => {
  const mockToken = 'mock-token';
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => mockToken),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('getWarehouses returns warehouse list on success', async () => {
    const mockWarehouses = [{ id: 1, name: 'A' }];
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockWarehouses) });
    const result = await getWarehouses();
    expect(fetch).toHaveBeenCalledWith('/api/warehouses', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockWarehouses);
  });

  it('getWarehouses throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getWarehouses()).rejects.toThrow('Failed to fetch warehouses');
  });

  it('getWarehouse returns warehouse on success', async () => {
    const mockWarehouse = { id: 1, name: 'A' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockWarehouse) });
    const result = await getWarehouse(1);
    expect(fetch).toHaveBeenCalledWith('/api/warehouses/1', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockWarehouse);
  });

  it('getWarehouse throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getWarehouse(1)).rejects.toThrow('Failed to fetch warehouse');
  });

  it('createWarehouse posts data and returns created warehouse', async () => {
    const mockWarehouse = { id: 2, name: 'B' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockWarehouse) });
    const data = { name: 'B' };
    const result = await createWarehouse(data);
    expect(fetch).toHaveBeenCalledWith('/api/warehouses', expect.objectContaining({ method: 'POST', body: JSON.stringify(data) }));
    expect(result).toEqual(mockWarehouse);
  });

  it('createWarehouse throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(createWarehouse({})).rejects.toThrow('Failed to create warehouse');
  });

  it('updateWarehouse puts data and returns updated warehouse', async () => {
    const mockWarehouse = { id: 1, name: 'C' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockWarehouse) });
    const data = { name: 'C' };
    const result = await updateWarehouse(1, data);
    expect(fetch).toHaveBeenCalledWith('/api/warehouses/1', expect.objectContaining({ method: 'PUT', body: JSON.stringify(data) }));
    expect(result).toEqual(mockWarehouse);
  });

  it('updateWarehouse throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(updateWarehouse(1, {})).rejects.toThrow('Failed to update warehouse');
  });

  it('deleteWarehouse calls fetch with DELETE and throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await expect(deleteWarehouse(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/warehouses/1', expect.objectContaining({ method: 'DELETE' }));
  });

  it('deleteWarehouse throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(deleteWarehouse(1)).rejects.toThrow('Failed to delete warehouse');
  });
});
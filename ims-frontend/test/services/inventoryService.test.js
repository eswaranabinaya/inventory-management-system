import { vi } from 'vitest';
import {
  getInventories,
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory
} from '../../src/services/inventoryService';

describe('inventoryService', () => {
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

  it('getInventories returns inventory list on success', async () => {
    const mockInventories = [{ id: 1, name: 'A' }];
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockInventories) });
    const result = await getInventories();
    expect(fetch).toHaveBeenCalledWith('/api/inventory', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockInventories);
  });

  it('getInventories throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getInventories()).rejects.toThrow('Failed to fetch inventory');
  });

  it('getInventory returns inventory on success', async () => {
    const mockInventory = { id: 1, name: 'A' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockInventory) });
    const result = await getInventory(1);
    expect(fetch).toHaveBeenCalledWith('/api/inventory/1', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockInventory);
  });

  it('getInventory throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getInventory(1)).rejects.toThrow('Failed to fetch inventory');
  });

  it('createInventory posts data and returns created inventory', async () => {
    const mockInventory = { id: 2, name: 'B' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockInventory) });
    const data = { name: 'B' };
    const result = await createInventory(data);
    expect(fetch).toHaveBeenCalledWith('/api/inventory', expect.objectContaining({ method: 'POST', body: JSON.stringify(data) }));
    expect(result).toEqual(mockInventory);
  });

  it('createInventory throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(createInventory({})).rejects.toThrow('Failed to create inventory');
  });

  it('updateInventory puts data and returns updated inventory', async () => {
    const mockInventory = { id: 1, name: 'C' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockInventory) });
    const data = { name: 'C' };
    const result = await updateInventory(1, data);
    expect(fetch).toHaveBeenCalledWith('/api/inventory/1', expect.objectContaining({ method: 'PUT', body: JSON.stringify(data) }));
    expect(result).toEqual(mockInventory);
  });

  it('updateInventory throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(updateInventory(1, {})).rejects.toThrow('Failed to update inventory');
  });

  it('deleteInventory calls fetch with DELETE and throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await expect(deleteInventory(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/inventory/1', expect.objectContaining({ method: 'DELETE' }));
  });

  it('deleteInventory throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(deleteInventory(1)).rejects.toThrow('Failed to delete inventory');
  });
});
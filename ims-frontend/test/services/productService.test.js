import { vi } from 'vitest';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../src/services/productService';

describe('productService', () => {
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

  it('getProducts returns product list on success', async () => {
    const mockProducts = [{ id: 1, name: 'A' }];
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProducts) });
    const result = await getProducts();
    expect(fetch).toHaveBeenCalledWith('/api/products', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockProducts);
  });

  it('getProducts throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getProducts()).rejects.toThrow('Failed to fetch products');
  });

  it('getProduct returns product on success', async () => {
    const mockProduct = { id: 1, name: 'A' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProduct) });
    const result = await getProduct(1);
    expect(fetch).toHaveBeenCalledWith('/api/products/1', expect.objectContaining({ headers: expect.any(Object) }));
    expect(result).toEqual(mockProduct);
  });

  it('getProduct throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(getProduct(1)).rejects.toThrow('Failed to fetch product');
  });

  it('createProduct posts data and returns created product', async () => {
    const mockProduct = { id: 2, name: 'B' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProduct) });
    const data = { name: 'B' };
    const result = await createProduct(data);
    expect(fetch).toHaveBeenCalledWith('/api/products', expect.objectContaining({ method: 'POST', body: JSON.stringify(data) }));
    expect(result).toEqual(mockProduct);
  });

  it('createProduct throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(createProduct({})).rejects.toThrow('Failed to create product');
  });

  it('updateProduct puts data and returns updated product', async () => {
    const mockProduct = { id: 1, name: 'C' };
    fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProduct) });
    const data = { name: 'C' };
    const result = await updateProduct(1, data);
    expect(fetch).toHaveBeenCalledWith('/api/products/1', expect.objectContaining({ method: 'PUT', body: JSON.stringify(data) }));
    expect(result).toEqual(mockProduct);
  });

  it('updateProduct throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(updateProduct(1, {})).rejects.toThrow('Failed to update product');
  });

  it('deleteProduct calls fetch with DELETE and throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await expect(deleteProduct(1)).resolves.toBeUndefined();
    expect(fetch).toHaveBeenCalledWith('/api/products/1', expect.objectContaining({ method: 'DELETE' }));
  });

  it('deleteProduct throws on error', async () => {
    fetch.mockResolvedValueOnce({ ok: false });
    await expect(deleteProduct(1)).rejects.toThrow('Failed to delete product');
  });
});
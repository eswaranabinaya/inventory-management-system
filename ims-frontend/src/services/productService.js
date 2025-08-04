const API_BASE = '/api/products';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getProducts() {
  const res = await fetch(API_BASE, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to delete product');
}
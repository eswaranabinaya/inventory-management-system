const API_BASE = '/api/warehouses';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getWarehouses() {
  const res = await fetch(API_BASE, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch warehouses');
  return res.json();
}

export async function getWarehouse(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch warehouse');
  return res.json();
}

export async function createWarehouse(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create warehouse');
  return res.json();
}

export async function updateWarehouse(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update warehouse');
  return res.json();
}

export async function deleteWarehouse(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to delete warehouse');
}
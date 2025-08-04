const API_BASE = '/api/inventory';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getInventories() {
  const res = await fetch(API_BASE, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function getInventory(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function createInventory(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create inventory');
  return res.json();
}

export async function updateInventory(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update inventory');
  return res.json();
}

export async function deleteInventory(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to delete inventory');
}
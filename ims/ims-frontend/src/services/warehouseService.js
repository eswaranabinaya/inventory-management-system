const API_BASE = '/api/warehouses';

export async function getWarehouses() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch warehouses');
  return res.json();
}

export async function getWarehouse(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch warehouse');
  return res.json();
}

export async function createWarehouse(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create warehouse');
  return res.json();
}

export async function updateWarehouse(id, data) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update warehouse');
  return res.json();
}

export async function deleteWarehouse(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete warehouse');
}
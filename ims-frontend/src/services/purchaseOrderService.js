const API_BASE = `${import.meta.env.VITE_API_URL}/api/purchase-orders`;

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export async function getPurchaseOrders() {
  const res = await fetch(API_BASE, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch purchase orders');
  return res.json();
}

export async function getPurchaseOrder(id) {
  const res = await fetch(`${API_BASE}/${id}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch purchase order');
  return res.json();
}

export async function createPurchaseOrder(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create purchase order');
  return res.json();
}

export async function fulfillPurchaseOrder(id, data) {
  const res = await fetch(`${API_BASE}/${id}/fulfill`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to fulfill purchase order');
  return res.json();
}
const API_BASE = '/api/purchase-orders';

export async function getPurchaseOrders() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch purchase orders');
  return res.json();
}

export async function getPurchaseOrder(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch purchase order');
  return res.json();
}

export async function createPurchaseOrder(data) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create purchase order');
  return res.json();
}

export async function fulfillPurchaseOrder(id, data) {
  const res = await fetch(`${API_BASE}/${id}/fulfill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to fulfill purchase order');
  return res.json();
}
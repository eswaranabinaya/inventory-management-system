import { useState } from 'react';

const defaultValues = {
  productId: '',
  warehouseId: '',
  quantity: '',
};

const InventoryForm = ({ initialValues = defaultValues, onSubmit, submitLabel = 'Save', products = [], warehouses = [] }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.productId) errs.productId = 'Product is required';
    if (!form.warehouseId) errs.warehouseId = 'Warehouse is required';
    if (form.quantity === '' || isNaN(form.quantity) || Number(form.quantity) < 0) errs.quantity = 'Quantity must be non-negative';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({
        ...form,
        quantity: Number(form.quantity),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium">Product *</label>
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {errors.productId && <p className="text-red-500 text-sm">{errors.productId}</p>}
      </div>
      <div>
        <label className="block font-medium">Warehouse *</label>
        <select
          name="warehouseId"
          value={form.warehouseId}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select warehouse</option>
          {warehouses.map(w => (
            <option key={w.id} value={w.id}>{w.name}</option>
          ))}
        </select>
        {errors.warehouseId && <p className="text-red-500 text-sm">{errors.warehouseId}</p>}
      </div>
      <div>
        <label className="block font-medium">Quantity *</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          min="0"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default InventoryForm;
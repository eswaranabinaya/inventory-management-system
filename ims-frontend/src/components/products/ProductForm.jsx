import React from 'react';
import { useState } from 'react';

const defaultValues = {
  name: '',
  sku: '',
  category: '',
  price: '',
  description: '',
};

const ProductForm = ({ initialValues = defaultValues, onSubmit, submitLabel = 'Save' }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.sku) errs.sku = 'SKU is required';
    if (form.price === '' || isNaN(form.price) || Number(form.price) < 0) errs.price = 'Price must be non-negative';
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
        price: Number(form.price),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block font-medium">Name *</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="sku" className="block font-medium">SKU *</label>
        <input
          id="sku"
          type="text"
          name="sku"
          value={form.sku}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.sku && <p className="text-red-500 text-sm">{errors.sku}</p>}
      </div>
      <div>
        <label htmlFor="category" className="block font-medium">Category</label>
        <input
          id="category"
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label htmlFor="price" className="block font-medium">Price *</label>
        <input
          id="price"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          min="0"
          step="0.01"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>
      <div>
        <label htmlFor="description" className="block font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        />
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

export default ProductForm;
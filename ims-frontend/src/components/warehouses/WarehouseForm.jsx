import React from 'react';
import { useState } from 'react';

const defaultValues = {
  name: '',
  location: '',
};

const WarehouseForm = ({ initialValues = defaultValues, onSubmit, submitLabel = 'Save' }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
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
      onSubmit(form);
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
        <label htmlFor="location" className="block font-medium">Location</label>
        <input
          id="location"
          type="text"
          name="location"
          value={form.location}
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

export default WarehouseForm;
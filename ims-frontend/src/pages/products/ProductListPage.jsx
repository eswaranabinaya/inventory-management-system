import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/productService';
import { Link, useNavigate } from 'react-router-dom';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link to="/products/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">SKU</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={5} className="text-center p-4">No products found.</td></tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.sku}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(product.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListPage;
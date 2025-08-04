import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../../components/products/ProductForm';
import { getProduct, updateProduct } from '../../services/productService';

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setInitialValues({
          name: data.name,
          sku: data.sku,
          category: data.category,
          price: data.price,
          description: data.description || '',
        });
      } catch (err) {
        alert('Failed to fetch product: ' + err.message);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      navigate('/products');
    } catch (err) {
      alert('Failed to update product: ' + err.message);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!initialValues) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Update" />
    </div>
  );
};

export default ProductEditPage;
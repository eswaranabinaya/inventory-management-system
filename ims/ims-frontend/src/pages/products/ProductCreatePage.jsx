import ProductForm from '../../components/products/ProductForm';
import { createProduct } from '../../services/productService';
import { useNavigate } from 'react-router-dom';

const ProductCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createProduct(data);
      navigate('/products');
    } catch (err) {
      alert('Failed to create product: ' + err.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Create" />
    </div>
  );
};

export default ProductCreatePage;
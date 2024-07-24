import React, { useEffect, useState } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from '../services/productService';
import ProductCard from '../components/ProductCard';
import styles from './HomePage.module.css';
import { postFormData, postJsonData } from '../api/apiServices';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '', 
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      
      let response;
      if (editMode) {
        response = await updateProduct(currentProductId, formData);
        setEditMode(false);
        setCurrentProductId(null);
      } else {
        response = await createProduct(formData);
      }
      console.log('Server response:', response);
      setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      console.error('Failed to save product:', error);
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (product) => {
    setNewProduct(product);
    setEditMode(true);
    setCurrentProductId(product._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
      setError('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading... may take up to a min.</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-500 text-white p-4 text-center text-xl font-bold">Products</header>
    <div className='max-w-4xl mx-auto p-4'>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="p-2 border border-gray-300 rounded"
          />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
          className="p-2 border border-gray-300 rounded"
          />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="p-2 border border-gray-300 rounded"
          />
        <input type="file" name="image" onChange={handleFileChange} className="p-2 border border-gray-300 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{editMode ? 'Update' : 'Create'} Product</button>
      </form>
        </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  console.log("all products: ", products)

  return (
    <div className={styles.homepage}>
      <h1>Products</h1>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">{editMode ? 'Update' : 'Create'} Product</button>
      </form>
      <div className={styles.productList}>
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

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
    try {
      if (imageFile) {
        const uploadedImageUrl = await uploadImage(imageFile);
        newProduct.imageUrl = uploadedImageUrl;
      }
      const productData = {
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
      };
      console.log('Product data to be sent:', productData);
      if (editMode) {
        await updateProduct(currentProductId, productData);
        setEditMode(false);
        setCurrentProductId(null);
      } else {
        await createProduct(productData);
      }
      setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
      const products = await getProducts();
      setProducts(products);
    } catch (error) {
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

  return (
    <div className={styles.homepage}>
      <h1>Products</h1>
      <form onSubmit={handleSubmit}>
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
        <input
          type="text"
          name="imageUrl"
          value={newProduct.imageUrl}
          onChange={handleChange}
          placeholder="Product Image URL"
        />
        <input type="file" onChange={handleFileChange} />
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

import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onDelete, onEdit }) => {
  const image_base_url = process.env.REACT_APP_API_BASE_URL
  return (
    <div className={styles.productCard}>
      <img src={`${image_base_url}${product.imageUrl}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h4>${product.price}</h4>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product._id)}>Delete</button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductCard;

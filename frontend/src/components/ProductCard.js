import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ProductCard = ({ product, onDelete, onEdit }) => {
  const image_base_url = process.env.REACT_APP_API_BASE_URL;

  const handlePurchase = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post('http://localhost:3001/api/products/create-checkout-session', {
        priceId: product.stripePriceId,
      });

      const { id } = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error('Error initiating purchase:', error);
    }
  };

  return (
    <div className={styles.productCard}>
      <img src={`${image_base_url}${product.imageUrl}`} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h4>${product.price.toFixed(2)}</h4>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product._id)}>Delete</button>
      <button onClick={handlePurchase}>Buy Now</button>
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
    stripePriceId: PropTypes.string.isRequired, // Ensure this prop is provided
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductCard;
  
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ProductCard = ({ product, onDelete, onEdit }) => {
  const handlePurchase = async () => {
    try {
      const stripe = await stripePromise;

      const response = await axios.post("https://e-commerce-games.onrender.com/api/products/create-checkout-session", {
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
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img src={product.imageUrl} alt={product.name} className="w-full object-cover object-center transition-all duration-300 hover:scale-110" />
      <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{product.name}</div>
      <p className="text-gray-700 text-base">{product.description}</p>
        <p className="text-gray-900 font-bold">${product.price.toFixed(2)}</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => onEdit(product)}>Edit</button>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" onClick={() => onDelete(product._id)}>Delete</button>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2" onClick={handlePurchase}>Buy Now</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stripePriceId: PropTypes.string.isRequired, // Ensure this prop is provided
    imageUrl: PropTypes.string.isRequired, // Ensure this prop is provided
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ProductCard;

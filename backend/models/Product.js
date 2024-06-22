import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Export the Product model
export default Product;

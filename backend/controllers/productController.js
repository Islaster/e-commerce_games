import Product from '../models/Product.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log('env variables:', process.env.STRIPE_SECRET_KEY);


// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 //create product
export const createProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  const product = new Product({
    name,
    price,
    description,
    imageUrl,
  });

  try {
    const stripeProduct = await stripe.products.create({
      name,
      description,
      images: [imageUrl],
    });

    const stripePrice = await stripe.prices.create({
      unit_amount: price * 100, // convert to cents
      currency: 'usd',
      product: stripeProduct.id,
    });

    product.stripeProductId = stripeProduct.id;
    product.stripePriceId = stripePrice.id;

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: error.message });
  }
};

export const createCheckoutSession = async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/', // Update with your success URL
      cancel_url: 'http://localhost:3000/cancel', // Update with your cancel URL
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.imageUrl = imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  
  try {
    console.log(`Attempting to delete product with ID: ${productId}`);
    
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      console.log(`Product with ID ${productId} removed successfully.`);
      res.json({ message: 'Product removed' });
    } else {
      console.log(`Product with ID ${productId} not found.`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error occurred while deleting product with ID ${productId}:`, error);
    res.status(500).json({ message: error.message });
  }
};

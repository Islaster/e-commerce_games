import Product from '../models/Product.js';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



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
  console.log("req file: ", req.file);
  const { name, price, description } = req.body;
  const imageUrl = req.file ? `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}` : null;

  const product = new Product({
    name,
    price,
    description,
    imageUrl 
  });

  try {
    const stripeProduct = await stripe.products.create({
      name,
      description
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
      success_url: 'https://master--dapper-concha-d7b532.netlify.app/', 
      cancel_url: 'https://master--dapper-concha-d7b532.netlify.app/', 
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { name, price, description } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;

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
    (`Attempting to delete product with ID: ${productId}`);
    
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      (`Product with ID ${productId} removed successfully.`);
      res.json({ message: 'Product removed' });
    } else {
      (`Product with ID ${productId} not found.`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error occurred while deleting product with ID ${productId}:`, error);
    res.status(500).json({ message: error.message });
  }
};

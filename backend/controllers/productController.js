import Product from '../models/Product.js';

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

// Create a product
export const createProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  const product = new Product({
    name,
    price,
    description,
    imageUrl,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createCheckoutSession
} from '../controllers/productController.js';
import { upload } from '../controllers/uploadController.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(upload.single('image'), createProduct); 

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.post('/create-checkout-session', createCheckoutSession);

export default router;

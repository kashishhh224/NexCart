import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router
  .route('/:productId')
  .put(protect, updateCartItemQuantity)
  .delete(protect, removeFromCart);

export default router;

import express from 'express';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

export default router;

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

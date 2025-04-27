import express from 'express';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

const router = express.Router();

export default router;

router.post('/', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error'});
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success: true, data: products});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error'});
        
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Product not found'});
    }
});

router.patch('/:id', async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({success: false, message: 'Invalid product ID'});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Product not found'});
    }
});

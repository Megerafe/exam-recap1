const Product = require('../models/productModel');
const mongoose = require('mongoose');

// Get All
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 })
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
}

// Get One
const getProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' })
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product does not exist' })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log('Server error: ', error)
        res.status(500).json({ error: 'Failed to retrieve product' })
    }
}

// Add One
const createProduct = async (req, res) => {

    try {
        const product = new Product({ ...req.body });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ error: 'Failed to create product' });
    }
}


// Update One
const updateProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID' });
    }
    try {
        const product = await Product.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product does not exist' })
        }
        res.status(200).json(product);
    } catch (error) {
        console.log('Server error:', error);
        res.status(500).json({ error: 'Failed to update product' })
    }
}

// Delete One
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ Error: 'Invalid ID' });
    }
    try {
        const product = await Product.findOneAndDelete({ _id: id });
        res.status(200).json(product);
    } catch (error) {
        console.log('Server error:', error);
        res.status(500).json({ Error: 'Failed to delete product' })
    }
}

// Export Controller
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
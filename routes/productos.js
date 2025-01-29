const express = require('express');
const api = express.Router();
const upload = require('../libs/storage'); 
const authenticateToken = require('../middlewares/authenticateToken');


const { 
    addProducto, 
    getProductos, 
    findProducto, 
    updateProducto, 
    deleteProducto 
} = require('../controllers/productosController');
const { addToCart, getCart } = require('../controllers/cartController');

// Definición de rutas para productos
api.get('/productos', getProductos); // Obtener todos los productos
api.post('/productos', upload.single('imagen'), addProducto); // Crear un nuevo producto
api.get('/productos/:id', findProducto); // Obtener un producto por su ID
api.put('/productos/:id', upload.single('imagen'), updateProducto); // Actualizar un producto por su ID
api.delete('/productos/:id', deleteProducto); // Eliminar un producto por su ID

// Rutas del carrito
api.post('/carrito', authenticateToken, addToCart); // Agregar producto al carrito
api.get('/carrito', authenticateToken, getCart); // Obtener los productos del carrito

module.exports = api;

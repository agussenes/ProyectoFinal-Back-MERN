const Cart = require('../models/Cart');
const Producto = require('../models/Productos');


const addToCart = async (req, res) => {
  const { productId } = req.body; 
  const userId = req.user._id; 

  try {
    
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      
      cart = new Cart({ userId, items: [] });
    }

    
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      
      cart.items[itemIndex].quantity += 1;
    } else {
      
      const product = await Producto.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save(); 
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el producto al carrito.', error: error.message });
  }
};


const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); 
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado.' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito.', error: error.message });
  }
};


module.exports = {
  addToCart,
  getCart,
};

const Cart = require('../models/Cart');
const Producto = require('../models/Productos');

// Adicionar produto ao carrinho
const addToCart = async (req, res) => {
  const { productId } = req.body; // Recebe o ID do produto no corpo da requisição
  const userId = req.user._id; // Obtém o ID do usuário autenticado (do token)

  try {
    // Verificar se o carrinho já existe
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Criar um novo carrinho se não existir
      cart = new Cart({ userId, items: [] });
    }

    // Verificar se o produto já está no carrinho
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Se já estiver no carrinho, aumentar a quantidade
      cart.items[itemIndex].quantity += 1;
    } else {
      // Caso contrário, adicionar um novo item
      const product = await Producto.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado.' });
      }
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save(); // Salvar o carrinho atualizado
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar el producto al carrito.', error: error.message });
  }
};

// Obter itens do carrinho
const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Popular informações do produto
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado.' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el carrito.', error: error.message });
  }
};

// Exportar os métodos
module.exports = {
  addToCart,
  getCart,
};

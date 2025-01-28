const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
  },
  {
    timestamps: true, // Para createdAt e updatedAt automáticos
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

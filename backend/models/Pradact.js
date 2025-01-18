const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  lowStockAlert: { type: Number, default: 5 },
});

module.exports = mongoose.model('Product', productSchema);

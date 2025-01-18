const mongoose = require('mongoose');
const moment = require('moment');

const saleSchema = new mongoose.Schema({

  items: [
    {
      name: { type: String, required: true }, 
      price: { type: Number, required: true }, 
      soldQuantity: { type: Number, required: true }, 
    },
  ],
  total: Number,
  discount: Number,
  totalWithDiscount: Number,
  date: { type: Date, default: Date.now }, 
  year: { type: Number },
  month: { type: Number }, 
  week: { type: Number },
  day: { type: Number },
});


saleSchema.pre('save', function (next) {
  const saleDate = moment(this.date);

  this.year = saleDate.year(); 
  this.month = saleDate.month() + 1; 
  this.week = saleDate.isoWeek(); 
  this.day = saleDate.date();

  next();
});


//   item:{
//     name:  String,// Name of the sale or customer
//   price: Number, // Price per unit
//   soldQuantity: Number, // Quantity sold
//   },
//   total: Number ,// Total price (price * quantity)
//   discount:Number, // Discount applied
//   totalWithDiscount:  Number, // Total price after discount
//   date: { type: Date, default: Date.now }, // Sale date
// });

module.exports = mongoose.model('Sale', saleSchema);

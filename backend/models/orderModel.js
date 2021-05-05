const mongoose = require('mongoose');


const schema = mongoose.Schema({
  name: {
    type: String,
    min: 3
  },

  pickup: {
    type: String,
    min: 5
  },

  dropoff: {
    type: String,
    min: 5
  },

  vehicle: {
    type: String,
  },

  datedue: {
    type: String
  }
});


module.exports = mongoose.model('orders', schema);
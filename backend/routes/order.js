const express = require('express');
const router = express.Router();
const Orders = require('../models/orderModel.js');
const { validateOrder } = require('../_validate.js');



router.get('/', async (req, res) => {

  try {
    const allOrders = await Orders.find();
    res.send(allOrders);
  }
  catch(error) {
    res.status(400).send('An error occured! Please try again...');
  }
  
});



router.post('/', async (req, res) => {

  const { value, error } = validateOrder(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const { name, pickup, dropoff, vehicle, datedue } = value;
  const newOrder = new Orders({ name, pickup, dropoff, vehicle, datedue });

  try {
    const saved = await newOrder.save();
    res.send(saved);
  }
  catch (error) {
    res.status(400).send('Bad Request !');
  }

});



// updates the datedue of a scheduled order
router.put('/:id', async (req, res) => {

  try {
    const order = await Orders.findById(req.params.id);
    await Orders.updateOne({ _id: order._id }, {
      $set: {
        datedue: req.body.datedue
      }
    });
    res.send('Order updated !');
  }
  catch (error) {
    res.status(400).send('Bad Request !');
  }

});





module.exports = router;
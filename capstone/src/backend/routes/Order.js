// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order'); 

// router.get('/suggestions', async (req, res, next) => {
//   try {
//     const suggestions = await Order.generateOrderSuggestions();
//     res.json({ suggestions });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); 

router.get('/suggestions/:vendorId', async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    const suggestions = await Order.generateOrderSuggestions(vendorId);
    console.log("From the Route",suggestions);
    res.json({ suggestions });
  } catch (err) {
    next(err);
  }
});

router.post('/purchase', async (req, res) => {
  const { vendorId, products } = req.body;
  try {
    const result = await Order.savePurchaseOrder(vendorId, products);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Could not process the order' });
  }
});




module.exports = router;
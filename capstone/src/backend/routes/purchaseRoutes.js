const express = require('express');
const router = express.Router();
const Purchase = require('../models/purchase');

// GET all purchases
router.get('/', async (req, res, next) => {
  try {
    const purchases = await Purchase.getAll();
    res.json({ purchases });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const purchase = await Purchase.getById(req.params.id);
    res.json({ purchase });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { vendorId, productId, quantity } = req.body;
    const newPurchase = await Purchase.addPurchase(vendorId, productId, quantity);
    res.status(201).json({ newPurchase });
  } catch (err) {
    next(err);
  }
});


module.exports = router;

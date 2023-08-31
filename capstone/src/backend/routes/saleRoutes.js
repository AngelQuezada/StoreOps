const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

router.get('/', async (req, res, next) => {
  try {
    const sales = await Sale.getAll();
    res.json({ sales });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const sale = await Sale.getById(req.params.id);
    res.json({ sale });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const newSale = await Sale.addSale(productId, quantity);
    res.status(201).json({ newSale });
  } catch (err) {
    next(err);
  }
});



module.exports = router;

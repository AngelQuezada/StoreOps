
const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/purchase');

router.post('/', async (req, res, next) => {
  try {
    const { VendorID, DateCreated, Status } = req.body;
    const newPurchaseOrder = await PurchaseOrder.createPurchaseOrder(VendorID, DateCreated, Status);
    res.status(201).json({ newPurchaseOrder });
  } catch (err) {
    next(err);
  }

});

router.get('/:poid/details', async (req, res, next) => {
  try {
    const { poid } = req.params;
    const details = await PurchaseOrder.getPurchaseOrderDetails(poid);
    res.status(200).json({ details });
  } catch (err) {
    next(err);
  }
});

router.post('/complete-purchase', async (req, res, next) => {
  try {
    const { VendorID, DateCreated, Status, products } = req.body;
    const newPurchaseOrder = await PurchaseOrder.createPurchaseOrder(VendorID, DateCreated, Status);

    const poid = newPurchaseOrder.POID;
    const items = await Promise.all(
      products.map(async (product) => {
        return await PurchaseOrder.addPurchaseItem(poid, product.ProductID, product.UnitPrice, product.Quantity);
      })
    );

    res.status(201).json({ newPurchaseOrder, items });
  } catch (err) {
    next(err);
  }


});



module.exports = router;
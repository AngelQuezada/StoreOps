// const express = require('express');
// const router = express.Router();
// const Purchase = require('../models/purchase');

// // GET all purchases
// router.get('/', async (req, res, next) => {
//   try {
//     const purchases = await Purchase.getAll();
//     res.json({ purchases });
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:id', async (req, res, next) => {
//   try {
//     const purchase = await Purchase.getById(req.params.id);
//     res.json({ purchase });
//   } catch (err) {
//     next(err);
//   }
// });

// router.post('/', async (req, res, next) => {
//   try {
//     const { vendorId, productId, quantity } = req.body;
//     const newPurchase = await Purchase.addPurchase(vendorId, productId, quantity);
//     res.status(201).json({ newPurchase });
//   } catch (err) {
//     next(err);
//   }
// });


// module.exports = router;

// const db = require('../config/db');

// router.post('/complete-purchase', async (req, res, next) => {
//   try {
//     const { VendorID, DateCreated, Status, products } = req.body;

//     // Validate request data
//     if (!VendorID || !DateCreated || !Status || !products || products.length === 0) {
//       return res.status(400).json({ error: 'Missing or invalid data' });
//     }

//     // Use transaction to ensure atomicity
//     await db.query('BEGIN');

//     const newPurchaseOrder = await PurchaseOrder.createPurchaseOrder(VendorID, DateCreated, Status);
//     const poid = newPurchaseOrder.POID;

//     const items = await Promise.all(
//       products.map(async (product) => {
//         return await PurchaseOrder.addPurchaseItem(poid, product.ProductID, product.UnitPrice, product.Quantity);
//       })
//     );

//     await db.query('COMMIT');

//     res.status(201).json({ newPurchaseOrder, items });
//   } catch (err) {
//     await db.query('ROLLBACK');
//     console.error(err);
//     res.status(500).json({ error: 'An error occurred while completing the purchase' });
//   }


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
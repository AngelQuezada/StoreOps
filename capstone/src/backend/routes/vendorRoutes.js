const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor'); 
const db = require('../config/db'); 

router.get('/', async (req, res, next) => {
  try {
    const vendors = await Vendor.getAll();
    res.json({ vendors });
  } catch (err) {
    next(err);
  }
});

router.put('/:id/update-inventory', async (req, res, next) => {
  const vendorId = req.params.id;
  const updatedInventory = req.body;

  try {
    if (Array.isArray(updatedInventory)) {
      await Vendor.updateInventory(vendorId, updatedInventory);
      res.status(200).json({ message: 'Inventory updated' });
    } else {
      console.error("updatedInventory is not an array");
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err) {
    next(err);
  }
});



router.get('/:id/inventory', async (req, res, next) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.getById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const inventory = await Vendor.getInventoryByVendorId(vendorId); 

    res.json({ inventory });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const vendor = await Vendor.getById(req.params.id);
    res.json({ vendor });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const newVendor = await Vendor.addVendor(name);
    res.status(201).json({ newVendor });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

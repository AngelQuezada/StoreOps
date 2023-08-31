const db = require('../config/db');

class Vendor {
  static async getAll() {
    const result = await db.query('SELECT * FROM vendors');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM vendors WHERE VendorID=$1', [id]);
    return result.rows[0];
  }

  static async addVendor(name) {
    const result = await db.query(
      'INSERT INTO vendors (name) VALUES ($1) RETURNING id, name',
      [name]
    );
    return result.rows[0];
  }

  static async getInventoryByVendorId(vendorId) {
    const result = await db.query(
      'SELECT * FROM items WHERE vendorID = $1',
      [vendorId]
    );
    return result.rows;
  }
}

module.exports = Vendor;

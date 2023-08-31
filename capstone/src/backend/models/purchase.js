const db = require('../config/db');

class Purchase {
  static async getAll() {
    const result = await db.query("SELECT * FROM purchases");
    return result.rows;
  }
  
  static async getById(id) {
    const result = await db.query("SELECT * FROM purchases WHERE purchaseid=$1", [id]);
    return result.rows[0];
  }

  static async addPurchase(product_id, vendor_id, quantity) {
    const result = await db.query(
      "INSERT INTO purchases (product_id, vendor_id, quantity) VALUES ($1, $2, $3) RETURNING id, product_id, vendor_id, quantity", 
      [product_id, vendor_id, quantity]
    );
    return result.rows[0];
  }

  
}

module.exports = Purchase;

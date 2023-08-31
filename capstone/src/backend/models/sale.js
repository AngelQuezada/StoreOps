const db = require('../config/db');

class Sale {
  static async getAll() {
    const result = await db.query("SELECT * FROM sales");
    return result.rows;
  }
  
  static async getById(id) {
    const result = await db.query("SELECT * FROM sales WHERE id=$1", [id]);
    return result.rows[0];
  }

  static async addSale(product_id, quantity) {
    const result = await db.query(
      "INSERT INTO sales (product_id, quantity) VALUES ($1, $2) RETURNING id, product_id, quantity", 
      [product_id, quantity]
    );
    return result.rows[0];
  }

  }

module.exports = Sale;

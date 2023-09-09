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
    const query = `
      SELECT p.ProductID, p.Name AS ProductName, p.UnitPrice, v.Name AS VendorName, i.Quantity
      FROM inventory i
      INNER JOIN products p ON i.ProductID = p.ProductID
      INNER JOIN vendors v ON p.VendorID = v.VendorID
      WHERE v.VendorID = $1
    `;
  
    const result = await db.query(query, [vendorId]);
    return result.rows;
  }
  
  static async updateInventory(vendorId, updatedInventory) {
    console.log(typeof updatedInventory, updatedInventory); 
    await Promise.all(
      updatedInventory.map(async (item) => {
        const query = `
          UPDATE inventory 
          SET Quantity = $1 
          FROM products 
          WHERE inventory.ProductID = products.ProductID 
            AND products.VendorID = $3 
            AND inventory.ProductID = $2
        `;
        const result = await db.query(query, [item.newQuantity, item.productID, vendorId]);
        console.log("SQL Query Result:", result);  
      })
    );
  }
  
  
  
  
}

module.exports = Vendor;

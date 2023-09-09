// const db = require('../config/db');

// class Purchase {
//   static async getAll() {
//     const result = await db.query("SELECT * FROM purchases");
//     return result.rows;
//   }
  
//   static async getById(id) {
//     const result = await db.query("SELECT * FROM purchases WHERE purchaseid=$1", [id]);
//     return result.rows[0];
//   }

//   static async addPurchase(product_id, vendor_id, quantity) {
//     const result = await db.query(
//       "INSERT INTO purchases (product_id, vendor_id, quantity) VALUES ($1, $2, $3) RETURNING id, product_id, vendor_id, quantity", 
//       [product_id, vendor_id, quantity]
//     );
//     return result.rows[0];
//   }

  
// }

// module.exports = Purchase;

const db = require('../config/db');

class PurchaseOrder {
  static async createPurchaseOrder(VendorID, DateCreated, Status) {
    const result = await db.query(
      "INSERT INTO purchase_orders (VendorID, DateCreated, Status) VALUES ($1, $2, $3) RETURNING POID;",
      [VendorID, DateCreated, Status]
    );
    return result.rows[0];
  }

  static async addPurchaseItem(poid, product_id, unit_price, quantity) {
    const result = await db.query(
      "INSERT INTO order_items (POID, ProductID, UnitPrice, Quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
      [poid, product_id, unit_price, quantity]
    );
    return result.rows[0];
  }

  static async getPurchaseOrderDetails(poid) {
    const result = await db.query(
      "SELECT * FROM order_items WHERE POID = $1", 
      [poid]
    );
    return result.rows;
  }
}

module.exports = PurchaseOrder;

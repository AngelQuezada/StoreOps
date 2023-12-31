

const db = require('../config/db');

class Order {
  static async getSalesDataForLastWeek(vendorId) {
    const query = `
    SELECT p.Name as "productname", s.ProductID as "productid", 
    SUM(CAST(s.QuantitySold AS FLOAT)) as "totalsold", p.UnitPrice as "UnitPrice"
  FROM sales s
  INNER JOIN products p ON s.ProductID = p.ProductID
  WHERE p.VendorID = $1
  AND DateSold BETWEEN date_trunc('week', current_date - interval '1 week') AND (date_trunc('week', current_date) - interval '1 day')
  GROUP BY s.ProductID, p.Name, p.UnitPrice;
  `;
    const result = await db.query(query, [vendorId]);
    console.log("Raw Sales Data:", result.rows);
    return result.rows;
  }

  static async getCurrentInventory(vendorId) {
    const query = `
      SELECT i.ProductID, i.Quantity
      FROM inventory i
      INNER JOIN products p ON i.ProductID = p.ProductID
      WHERE p.VendorID = $1;
    `;
    const result = await db.query(query, [vendorId]);
    console.log("Raw Inventory Data:", result.rows);
    return result.rows;
  }

  static async generateOrderSuggestions(vendorId) {
    try {
      const salesData = await this.getSalesDataForLastWeek(vendorId);
      const inventoryData = await this.getCurrentInventory(vendorId);



      const suggestions = [];
      const inventoryDict = {};
    
      inventoryData.forEach(item => {
        inventoryDict[item.productid] = item.quantity;  
      });
  
      salesData.forEach(sale => {

        const productID = sale.productid;
        const totalSold = sale.totalsold;
        const unitPrice = sale.unitPrice
        
        console.log(`Processing ProductID: ${productID}, TotalSold: ${totalSold}, UnitPrice: ${unitPrice}`);
      
        if (inventoryDict[productID] !== undefined) {
          const currentInventory = inventoryDict[productID];
          console.log(`Current Inventory for ProductID ${productID}: ${currentInventory}`);
      
          if (currentInventory < totalSold) {
            const suggestedOrderQuantity = totalSold - currentInventory;
            
            suggestions.push({
              ProductName: sale.productname,
              ProductID: sale.productid,
              SuggestedOrder: suggestedOrderQuantity,
              UnitPrice: sale.UnitPrice

            });
            
            console.log(`Suggestion Added: ${JSON.stringify(suggestions)}`);
          }
        }
      });
      
    
      console.log("Final Suggestions:", suggestions);
      return suggestions;
    } catch (error) {
      console.error("Error in generateOrderSuggestions:", error);
      throw error;
    }
  }

  static async savePurchaseOrder(vendorId, products) {
    const createPOQuery = `
      INSERT INTO purchase_orders (VendorID, DateCreated, Status)
      VALUES ($1, CURRENT_DATE, 'Pending')
      RETURNING POID;
    `;
    const poResult = await db.query(createPOQuery, [vendorId]);
    const poId = poResult.rows[0].POID;
  
    for (const product of products) {
      const { ProductID, SuggestedOrder } = product;
      const purchaseQuery = `
        INSERT INTO purchases (ProductID, Quantity, DatePurchased, POID)
        VALUES ($1, $2, CURRENT_DATE, $3);
      `;
      await db.query(purchaseQuery, [ProductID, SuggestedOrder, poId]);
    }
    return { status: 'success', message: 'Purchase order created' };
  }
  


}

module.exports = Order;

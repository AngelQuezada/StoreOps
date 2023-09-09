export const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/vendors');
      const data = await response.json();
      return data.vendors;
    } catch (error) {
      console.error('Error fetching vendors:', error);
      return [];
    }
  };
  
  export const generateOrder = async (vendorID) => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/suggestions/${vendorID}`);
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error('Error generating order:', error);
      return [];
    }
  };
  
  export const submitOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:3001/api/purchase_orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      return data.newPurchaseOrder.POID;
    } catch (error) {
      console.error('Error submitting order:', error);
      return null;
    }
  };
  
// import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import './OrderByVendor.css';

// const OrderByVendor = () => {
//   const [vendors, setVendors] = useState([]);
//   const [selectedVendor, setSelectedVendor] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showTable, setShowTable] = useState(false);
//   const [newPOID, setNewPOID] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3001/api/vendors')
//       .then(response => response.json())
//       .then(data => {
//         setVendors(data.vendors);
//       });
//   }, []);

//   const handleVendorChange = (e) => {
//     setSelectedVendor(e.target.value);
//   };

//   const generateOrder = (e) => {
//     e.preventDefault();
//     fetch(`http://localhost:3001/api/orders/suggestions/${selectedVendor}`)
//       .then(response => response.json())
//       .then(data => {
//         console.log("This is the data", data)
//         setSuggestions(data.suggestions);
//         setShowTable(true);
//       });
//   };

//   const handleSubmitOrder = () => {
//     // Create a new purchase order
//     fetch('http://localhost:3001/api/purchase_orders', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         VendorID: selectedVendor,
//         DateCreated: new Date().toISOString().slice(0, 10),
//         Status: 'Pending',
//       }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         const newPOID = data.newPurchaseOrder.POID;
  
//         // Save each product purchase in the order_items table
//         const promises = suggestions.map((product) => {
//           return fetch(`http://localhost:3001/api/purchase_orders/${newPOID}/items`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               ProductID: product.ProductID,
//               UnitPrice: product.UnitPrice,
//               Quantity: product.SuggestedOrder,
//             }),
//           });
//         });
  
//         Promise.all(promises)
//           .then(() => {
//             console.log('Order saved successfully');
//             setNewPOID(newPOID);
//           })
//           .catch(error => console.error('Error:', error));
//       })
//       .catch(error => console.error('Error:', error));
//   };
  

//   const handleQuantityChange = (e, index) => {
//     const newSuggestions = [...suggestions];
//     newSuggestions[index].SuggestedOrder = e.target.value;
//     setSuggestions(newSuggestions);
//   };

//   return (
//     <div className="centered-form">
//       <Form>
//         <Form.Select aria-label="Vendor Select" style={{ width: '270px' }} onChange={handleVendorChange}>
//           <option>Select a vendor</option>
//           {vendors.map((vendor) => (
//             <option key={vendor.vendorid} value={vendor.vendorid}>
//               {vendor.name}
//             </option>
//           ))}
//         </Form.Select>
//         <Button variant="success" className="mt-3" onClick={generateOrder}>Generate Order</Button>
//       </Form>

//       {showTable && (
//         <div className="mt-5">
// <Table striped bordered hover>
//   <thead>
//     <tr>
//       <th>Product Name</th>
//       <th>Product ID</th>
//       <th>Unit Price</th> {/* Add this line */}
//       <th>Suggested Order</th>
//     </tr>
//   </thead>
// <tbody>
//   {suggestions.map((suggestion, index) => (
//     <tr key={index}>
//       <td>{suggestion.ProductName}</td>
//       <td>{suggestion.ProductID}</td>
//       <td>{suggestion.UnitPrice}</td>
//       <td>
//         <input
//           type="number"
//           value={suggestion.SuggestedOrder}
//           onChange={(e) => handleQuantityChange(e, index)}
//         />
//       </td>
//     </tr>
//   ))}
// </tbody>

// </Table>

//           <Button variant="primary" className="mt-3" onClick={handleSubmitOrder}>Submit Order</Button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default OrderByVendor;


import React, { useState, useEffect } from 'react';
import VendorForm from './VendorForm';
import SuggestionsTable from './SuggestionsTable';
import { fetchVendors, generateOrder as apiGenerateOrder, submitOrder as apiSubmitOrder } from './api';
import './OrderByVendor.css';

const OrderByVendor = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedVendors = await fetchVendors();
      setVendors(fetchedVendors);
    };
    fetchData();
  }, []);

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
  };

  const generateOrder = async (e) => {
    e.preventDefault();
    const generatedOrder = await apiGenerateOrder(selectedVendor);
    setSuggestions(generatedOrder);
    setShowTable(true);
  };

  const handleSubmitOrder = async () => {
    const orderData = {
      VendorID: selectedVendor,
      DateCreated: new Date().toISOString().slice(0, 10),
      Status: 'Pending',
      Suggestions: suggestions
    };

    try {
      const newPOID = await apiSubmitOrder(orderData);
      console.log('Order saved successfully. New POID:', newPOID);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleQuantityChange = (e, index) => {
    const newSuggestions = [...suggestions];
    newSuggestions[index].SuggestedOrder = e.target.value;
    setSuggestions(newSuggestions);
  };

  return (
    <div >
      <VendorForm className="centered-form" vendors={vendors} handleVendorChange={handleVendorChange} generateOrder={generateOrder} />
      
      {showTable && (
        <SuggestionsTable suggestions={suggestions} handleQuantityChange={handleQuantityChange} handleSubmitOrder={handleSubmitOrder} />
      )}
    </div>
  );
};

export default OrderByVendor;

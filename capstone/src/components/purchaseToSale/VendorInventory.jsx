import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Input, Button } from 'reactstrap';
import './VendorInventory.css'

const VendorInventory = () => {
  const [vendorName, setVendorName] = useState('');
  const { vendorID } = useParams();
  const navigate = useNavigate();
  const [modifiedQuantities, setModifiedQuantities] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/vendors/${vendorID}`)
      .then(response => setVendorName(response.data.vendor.name))
      .catch(error => console.error(error));

    axios.get(`http://localhost:3001/api/vendors/${vendorID}/inventory`)
      .then(response => setData(response.data.inventory))
      .catch(error => console.error(error));
  }, [vendorID]);

  const handleQuantityChange = (id, newQuantity) => {
    setModifiedQuantities({
      ...modifiedQuantities,
      [id]: newQuantity,
    });
  };

  const updateInventory = () => {
    const modifiedQuantitiesArray = Object.keys(modifiedQuantities).map(key => ({
      productID: key,
      newQuantity: modifiedQuantities[key]
    }));

    axios.put(`http://localhost:3001/api/vendors/${vendorID}/update-inventory`, modifiedQuantitiesArray)
      .then(() => {
        console.log('Inventory updated');
        navigate("/purchase-to-sale");
      })
      .catch(error => console.error(error));
  };

  return (

    <div className="VendorInventory">
    <div className='my-5 table-t'>
      <h2 className='Top-T'>{vendorName}'s Inventory</h2>
      <Table className=" table" bordered hover>
        <thead>
        <tr className='tr'>
            <th>Product ID</th>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.productid}</td>
              <td>{item.productname}</td>
              <td>${item.unitprice}</td>
              <td>
                <Input className='Input' style={{width:"70px"}}
                  type="number"
                  value={modifiedQuantities[item.productid] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.productid, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="success" onClick={updateInventory} style={{marginTop:'20px', marginLeft: '970px', display: 'block'}}>Submit Order</Button>
    </div>
    </div>
  );
};

export default VendorInventory;

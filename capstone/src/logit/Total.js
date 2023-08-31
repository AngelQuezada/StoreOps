import React from 'react';
import data from '../SupportingData/data.json';

const Total = () => {
    const calculateTotalForVendor = (vendor) => {
      return vendor.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0);
    };
  
    const grandTotal = Object.values(data).reduce((total, vendor) => {
      return total + calculateTotalForVendor(vendor);
    }, 0);
    const formattedTotal = grandTotal.toFixed(2);
    const displayTotal = Number(formattedTotal).toLocaleString();
  
    console.log("Grand Total:", displayTotal);
  
    return (
      <div>
        <h2>${displayTotal}</h2>
      </div>
    );
  };
  
  export default Total;
  
  
  




// This file allows me to calculate the information from all the vendors. 


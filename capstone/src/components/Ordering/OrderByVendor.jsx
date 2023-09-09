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

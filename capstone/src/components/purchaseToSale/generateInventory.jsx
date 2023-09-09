import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContactForm = () => {
  const navigate = useNavigate();
  const [vendorSearch, setVendorSearch] = useState('');
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/vendors')
      .then(response => {
        setVendors(response.data.vendors);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleVendorSearchChange = (e) => {
    setVendorSearch(e.target.value);
  };

  const handleSubmit = () => {
    const filteredVendor = vendors.find(vendor => String(vendor.vendorid) === vendorSearch);
    
    if (filteredVendor) {
      navigate(`/api/vendors/${filteredVendor.vendorid}/inventory`);
    } else {
      console.log('No vendor found');
    }
  };

  return (
    <div className="my-2 form">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <p>Check Inventory</p>
        <Form.Select aria-label="Vendor Select" onChange={handleVendorSearchChange}>
          <option>Select a vendor</option>
          {vendors.map((vendor) => (
            <option key={vendor.vendorid} value={vendor.vendorid}>
              {vendor.name}
            </option>
          ))}
        </Form.Select>
        <Button type="submit" style={{backgroundColor: 'green', marginTop: '20px'}}>Generate</Button>
      </Form>
    </div>
  );
};

export default ContactForm;

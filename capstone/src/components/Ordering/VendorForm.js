import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const VendorForm = ({ vendors, handleVendorChange, generateOrder }) => {
  return (

    <div style={{ width: '270px', marginLeft: '8%'}}>
    <Form>
      <Form.Select aria-label="Vendor Select" onChange={handleVendorChange}>
        <option>Select a vendor</option>
        {vendors.map((vendor) => (
          <option key={vendor.vendorid} value={vendor.vendorid}>
            {vendor.name}
          </option>
        ))}
      </Form.Select>
      <Button variant="success" className="mt-3" onClick={generateOrder}>Generate Order</Button>
    </Form>
    </div>
  );
};

export default VendorForm;

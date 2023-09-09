// import React, { useState, useEffect } from 'react';
// import FormInput from './FormInput';
// import { Button } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; 

// const ContactForm = () => {
//   const navigate = useNavigate();
//   const [vendorSearch, setVendorSearch] = useState('');
//   const [vendors, setVendors] = useState([]); 


  

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/vendors')
//       .then(response => {
//         console.log("Fetched vendors:", response.data.vendors); 
//         setVendors(response.data.vendors);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

  
  

//   const filteredVendors = vendors.filter(vendor =>
//     vendor.name.toLowerCase().includes(vendorSearch.toLowerCase())
//   );

//   const handleVendorSearchChange = (e) => {
//     console.log("Search term:", e.target.value); 
//     setVendorSearch(e.target.value);
//   };
  

//   const handleSubmit = () => {
//     console.log("Filtered vendors:", filteredVendors); 
//     if (filteredVendors.length > 0) {
//       // navigate(`/vendor-inventory/${filteredVendors[0].vendorid}`);
//       navigate(`/api/vendors/${filteredVendors[0].vendorid}/inventory`);
//     } else {
//       console.log('No vendor found');
//     }
//   };
  


//   return (
//     <div className="my-2 form">
//       <div className="leading-loose">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleSubmit(); 
//           }}
//           className="max-w-xl m-2 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
//         >
//           <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
//             Check Inventory
//           </p>
//           <FormInput
//             inputLabel="Search Vendor"
//             labelFor="vendor"
//             inputType="text"
//             inputId="vendor"
//             inputName="vendor"
//             placeholderText="Search Vendor"
//             ariaLabelName="Vendor"
//             onChange={handleVendorSearchChange}
//             options={filteredVendors}
//             style={{
//               width: '50%',  
//               height: '30px'  
//             }}
//           />
//           <Button
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               padding: "10px 20px",
//               borderRadius: "4px",
//               cursor: "pointer",
//               marginTop: "20px"
//             }}
//             type="submit"
//           >
//             Generate
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;


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

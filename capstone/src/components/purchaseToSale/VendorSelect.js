// import React, { useState } from 'react';

// const VendorSelect = ({ vendors }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredVendors, setFilteredVendors] = useState(vendors);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);

//     const newFilteredVendors = vendors.filter(
//       (vendor) => vendor.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredVendors(newFilteredVendors);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search vendor..."
//         value={searchTerm}
//         onChange={handleSearch}
//       />
//       <select>
//         {filteredVendors.map((vendor, index) => (
//           <option key={index} value={vendor}>
//             {vendor}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default VendorSelect;

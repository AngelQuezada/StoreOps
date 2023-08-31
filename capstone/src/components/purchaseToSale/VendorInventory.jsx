import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Input, Button } from 'reactstrap';
import useFetch from '../../hooks/useFetch';

const VendorInventory = () => {
  const { vendorID } = useParams();
  const navigate = useNavigate();
  const { vendor } = useParams();
  const [inventory, setInventory] = useState([]);
  const [modifiedQuantities, setModifiedQuantities] = useState({});

 const { data, loading, error } = useFetch(`/api/vendors/${vendorID}/inventory`);


  if (!data) {
    return <p>Loading...</p>;
    }
  // useEffect(() => {

  //   axios.get(`http://localhost:3001/api/vendors/${vendorID}/inventory`)

  //   .then(response => {      console.log(response)

  //     setInventory(response.data.inventory);
  //   })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, [vendorID]);

  const handleQuantityChange = (id, newQuantity) => {
    setModifiedQuantities({
      ...modifiedQuantities,
      [id]: newQuantity,
    });
  };

  const saveChanges = () => {
    axios.put(`http://localhost:3001/api/vendors/${vendor}/inventory`, modifiedQuantities)
      .then(response => {
        console.log('Changes saved');
        navigate("/inventory");
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Inventory for {vendor}</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Unit Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
         
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>${item.unitprice}</td>

              <td>
                <Input
                  type="number"
                  value={modifiedQuantities[item.ID] || item.quantity}
                  onChange={(e) => handleQuantityChange(item.ID, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button color="success" onClick={saveChanges}>
      Save Changes
    </Button>
    
    </div>
  );
};

export default VendorInventory;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Table, Input, Button } from 'reactstrap';
// import useFetch from '../../hooks/useFetch';

// const VendorInventory = () => {
//   const { vendorID } = useParams();
//   const navigate = useNavigate();
//   const { data, loading, error } = useFetch(`/api/vendors/${vendorID}/inventory`);

//   const [modifiedQuantities, setModifiedQuantities] = useState({});

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const handleQuantityChange = (id, newQuantity) => {
//     setModifiedQuantities({
//       ...modifiedQuantities,
//       [id]: newQuantity,
//     });
//   };

//   const saveChanges = () => {
//     axios.put(`http://localhost:3001/api/vendors/${vendorID}/inventory`, modifiedQuantities)
//       .then(response => {
//         console.log('Changes saved');
//         navigate("/inventory");
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <h2>Inventory for Vendor ID: {vendorID}</h2>
//       <Table bordered hover>
//       <thead>
//           <tr>
//             <th>Product ID</th>
//             <th>Name</th>
//             <th>Unit Price</th>
//             <th>Quantity</th>
//           </tr>
//         </thead>        <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>${item.unitprice}</td>
//               <td>
//                 <Input
//                   type="number"
//                   value={modifiedQuantities[item.id] || item.quantity}
//                   onChange={(e) => handleQuantityChange(item.id, e.target.value)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Button color="success" onClick={saveChanges}>
//         Save Changes
//       </Button>
//     </div>
//   );
// };


// export default VendorInventory;

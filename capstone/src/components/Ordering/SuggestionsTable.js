// import Table from 'react-bootstrap/Table';
// import Button from 'react-bootstrap/Button';

// const SuggestionsTable = ({ suggestions, handleQuantityChange, handleSubmitOrder }) => {
//   return (
//     <div className="mt-5">
// <Table striped bordered hover>
//   <thead>
//     <tr>
//       <th>Product Name</th>
//       <th>Product ID</th>
//       <th>Unit Price</th> 
//       <th>Suggested Order</th>
//     </tr>
//   </thead>
// <tbody>
//   {suggestions.map((suggestion, index) => (
//     <tr key={index}>
//       <td>{suggestion.ProductName}</td>
//       <td>{suggestion.ProductID}</td>
//       <td>${suggestion.UnitPrice}</td>
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
//       <Button variant="primary" className="mt-3" onClick={handleSubmitOrder}>Submit Order</Button>
//     </div>
//   );
// };

// export default SuggestionsTable;


import { Table, Input, Button } from 'reactstrap';


const SuggestionsTable = ({ suggestions, handleQuantityChange, handleSubmitOrder }) => {
  return (
    <div className="VendorInventory">
      <div className='my-5 table-t'>
        <h2 className='Top-T'>Order Suggestions</h2>
        <Table className="table" bordered hover>
          <thead>
            <tr className='tr'>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Unit Price</th>
              <th>Suggested Order</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion, index) => (
              <tr key={index}>
                <td>{suggestion.ProductName}</td>
                <td>{suggestion.ProductID}</td>
                <td>${suggestion.UnitPrice}</td>
                <td>
                  <Input
                    className='Input' 
                    style={{width:"70px"}}
                    type="number"
                    value={suggestion.SuggestedOrder}
                    onChange={(e) => handleQuantityChange(e, index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button  onClick={handleSubmitOrder} style={{marginTop:'20px', marginLeft: '1050px', display: 'block'}}>Submit Order</Button>
      </div>
    </div>
  );
};

export default SuggestionsTable;

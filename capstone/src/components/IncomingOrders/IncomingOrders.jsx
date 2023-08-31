import React, { useState } from 'react';
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import purchaseData from '../../SupportingData/purchases.json';
import '../inventory.css'

const PurchaseTable = () => {
    // Sort the purchases by date
    const sortedPurchases = purchaseData.purchases.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // Set the number of items per page here

    const handleClick = (e, index) => {
      e.preventDefault();
      setCurrentPage(index);
    }

    return (
      <div className="my-5 table-top">
        <span style={{ fontSize: "35px", paddingTop: "1px", paddingBottom: '0px', color: "Black", fontFamily: "sans-serif", marginLeft: '100px' }}>
          Incoming Orders
        </span>

        <Table className="my-2 table" hover striped responsive>
          <thead>
            <tr className='tr'>
              <th>Vendor</th>
              <th>PO Number</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedPurchases.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.vendor}</td>
                <td>{purchase.poNumber}</td>
                <td>{purchase.date}</td>
                <td>${purchase.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="pagination-container">
        <Pagination aria-label="Page navigation example" size="lg">
          <PaginationItem>
            <PaginationLink first href="#" onClick={(e) => handleClick(e, 0)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink previous href="#" onClick={(e) => handleClick(e, currentPage - 1)} />
          </PaginationItem>
          {[...Array(Math.ceil(sortedPurchases.length / pageSize))].map((page, i) =>
            <PaginationItem active={i === currentPage} key={i}>
              <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink next href="#" onClick={(e) => handleClick(e, currentPage + 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink last href="#" onClick={(e) => handleClick(e, Math.ceil(sortedPurchases.length / pageSize) - 1)} />
          </PaginationItem>
        </Pagination>
      </div>
      </div>
    );
}

export default PurchaseTable;

import React from 'react';
import Total from '../logit/Total';
import { Card, CardHeader, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from "reactstrap";
import './inventory.css';


const Inventory = () => {
    return (
      <div id='Inventory'>
        <Card
          className="my-2 custom-border" 
          // color="success"
          // outline
          style={{
            width: '18rem',
            // borderRadius: '15px', // Adjust this value for the desired border radius
          }}
        >
          <CardHeader style={{  fontSize: '20px' }}>
            Current Inventory
          </CardHeader>
          <CardBody >
            <CardText>
              <Total />
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default Inventory;
  

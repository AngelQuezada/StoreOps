import React from 'react';
import CurrentPurchases from '../logit/purchases';
import { Card, CardHeader, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from "reactstrap";
import './inventory.css';

const currentMonthIndex = new Date().getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = monthNames[currentMonthIndex];

const TotalPurchases = () => {
    return (

      <div id='purchases'>
        
        <Card
                className="my-2 custom-border" 
                // color="success"
                // outline
                // style={{
                //     width: '18rem',
                //     borderRadius: '15px', 
                // }}
        >
          <CardHeader style={{fontSize: '20px' }}>
          {currentMonth}'s Purchases
          </CardHeader>
          <CardBody>
            <CardText>
              <CurrentPurchases />
            </CardText>
          </CardBody>
        </Card>
      </div>
    );
  };
  
  export default TotalPurchases;
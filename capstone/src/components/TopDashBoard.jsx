import { Container, Row, Col } from 'react-bootstrap';
import Inventory from './inventory';
import TotalPurchases from './Purchases';

const Dashboard = () => {
  return (
    <Container fluid> {/* Use 'fluid' to allow the container to span the full width */}
      <Row className="justify-content-end">

        <Col sm={3}>
          <TotalPurchases />
        </Col>
        <Col sm={5}>
          <Inventory />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

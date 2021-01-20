import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const PublicPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col lg={{ size: 4, offset: 4 }}>
          <h1>Public Page</h1>
          <div>This is a publicly accessible page.</div>
          <br />
          <div>
            You cannot access this <Link to='/protected'>Protected Page</Link> unless you're Signed In.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicPage;

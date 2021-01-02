import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const PublicPage: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col lg={{ size: 4, offset: 4 }}>
          This is a publicly accessible page.
          <br />
          <br />
          <Link to='/signin'>Sign In</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PublicPage;

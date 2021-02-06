import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

// Architecture of this app validates signed in member against API service
// so I'm not checking/extending the session of a signed in member on this display.
// Would typically account for this use case for a production app.
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

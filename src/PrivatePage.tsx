import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getMember, getPage, signOut } from './utils';
import SessionExpirationModal from './SessionExpirationModal';

const PrivatePage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const member = getMember();
    if (member === null) return history.push(`/signin?${getPage()}`);
  }, []);

  return (
    <>
      <SessionExpirationModal />
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            Private page
            <br />
            <br />
            <Link to='/signin' onClick={() => signOut()}>
              Sign Out
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivatePage;

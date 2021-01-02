import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getMember, getPage, signOut } from './utils';
import SessionExpirationModal from './SessionExpirationModal';

const Homepage: React.FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const member = getMember();
    if (member === null) return history.push(`/signin?${getPage()}`);

    setFirstName(member.firstName);
    setLastName(member.lastName);
  }, []);

  return (
    <>
      <SessionExpirationModal />
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            Welcome {`${firstName} ${lastName}`}
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

export default Homepage;

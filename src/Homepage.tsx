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

    // You could elect to trust the localStorage keys and extend
    // a member's session here by calling extendSlidingExpiration from utils.
    // Some architectures require a JWT refresh from the server for security reasons.

    setFirstName(member.firstName);
    setLastName(member.lastName);
  }, [history]);

  return (
    <>
      <SessionExpirationModal />
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            Welcome {`${firstName + ' ' + lastName}`}
            <br />
            <br />
            <Link to='/public'>Public Page</Link>
            <br />
            <Link to='/protected'>Protected Page</Link>
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

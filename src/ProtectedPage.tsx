import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { extendSession, getMember, getPage, signOut } from './utils';
import SessionExpirationModal from './SessionExpirationModal';

const ProtectedPage: React.FC = () => {
  const history = useHistory();
  const [lastNames, setLastNames] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const member = getMember();
    if (member === null) return history.push(`/signin?${getPage()}`);

    (async () => {
      setMessage('');
      // Hard-coded http://localhost:3030 for demo purposes
      const resp = await window.fetch(`http://localhost:3030/api`, {
        headers: {
          'Content-Type': 'application/json',
          Mode: 'cors',
          Accept: 'application/json',
          Cache: 'no-cache',
          token: `Bearer ${window.localStorage.getItem('token')}`,
        },
      });
      extendSession(resp);

      const data = await resp.json();
      if (data.error) {
        // Returned response could be an invalid/tampered with token
        // Recommend having an error code and redirect member to /signin
        setMessage(data.message);
        return;
      }

      const { lastNames } = data;
      setLastNames(lastNames);
    })();
  }, [history]);

  return (
    <>
      <SessionExpirationModal />
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            <Link to='/'>Home</Link>&#160;&#160;&#160;
            <Link to='/public'>Public Page</Link>&#160;&#160;&#160;
            <Link to='/signin' onClick={() => signOut()}>
              Sign Out
            </Link>
            <h1>Protected Page</h1>
            <div>This is a protected page, only accessible for signed in members.</div>
            <br />
            {message && <div>{message}</div>}
            {lastNames !== null &&
              typeof lastNames !== 'undefined' &&
              lastNames.length !== 0 &&
              lastNames.map((lastName: string) => {
                return <div key={lastName}>{lastName}</div>;
              })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProtectedPage;

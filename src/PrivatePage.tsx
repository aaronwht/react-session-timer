import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { extendSession, getMember, getPage, signOut } from './utils';
import SessionExpirationModal from './SessionExpirationModal';

const PrivatePage: React.FC = () => {
  const history = useHistory();
  const [lastNames, setLastNames] = useState([]);

  useEffect(() => {
    const member = getMember();
    if (member === null) return history.push(`/signin?${getPage()}`);

    (async () => {
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

      const { lastNames } = await resp.json();
      setLastNames(lastNames);
    })();
  }, []);

  return (
    <>
      <SessionExpirationModal />
      <Container>
        <Row>
          <Col lg={{ size: 4, offset: 4 }}>
            Private page&#160;
            <Link to='/signin' onClick={() => signOut()}>
              Sign Out
            </Link>
            <br />
            <br />
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

export default PrivatePage;

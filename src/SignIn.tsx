import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert, Button, Container, Row, Col } from 'reactstrap';
import { getPage, setMember, setToken } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Signin: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayMessage, setDisplayMessage] = useState({ status: '', message: '' });
  const redirectPage = getPage().replace('/signin?', '').replace('/signin', '');
  const [processing, setProcessing] = useState(false);

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();
    setDisplayMessage({ status: '', message: '' });

    if (email === '') return setDisplayMessage({ status: 'danger', message: 'Please enter your Email' });
    if (password === '') return setDisplayMessage({ status: 'danger', message: 'Please enter your Password' });

    setProcessing(true);

    try {
      const resp = await window.fetch(`http://localhost:3030`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();

      if (data.error) {
        setProcessing(false);
        return setDisplayMessage({ status: 'danger', message: data.message });
      }

      setToken(resp.headers.get('token') || '');

      const member: any = {};
      member.memberKey = data.memberKey;
      member.firstName = data.firstName;
      member.lastName = data.lastName;
      setMember(member);

      setTimeout(() => {
        setProcessing(false);
        if (redirectPage !== '/') return history.push(redirectPage);
        return history.push('/');
      }, 350);
    } catch {
      setTimeout(() => {
        setProcessing(false);
        return setDisplayMessage({ status: 'danger', message: 'There was an error signing in.' });
      }, 350);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={{ size: 4, offset: 4 }}>
          <form onSubmit={submit}>
            <div className='display-message'>{displayMessage && <Alert color={displayMessage.status}>{displayMessage.message}</Alert>}</div>
            Email:
            <br />
            <input type='text' className='form-control' onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            Password:
            <br />
            <input type='password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
            <br />
            {!processing && (
              <Button block type='submit' color='primary' onClick={submit}>
                Sign In
              </Button>
            )}
            {processing && (
              <Button block disabled={true} type='submit' color='primary'>
                Sign In <FontAwesomeIcon className='icon' icon={faSpinner} spin size='lg' />
              </Button>
            )}
          </form>
        </Col>
      </Row>
      <Row>
        <Col className='text-center pt-3' lg={{ size: 4, offset: 4 }}>
          <Link to='/public'>Public Page</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;

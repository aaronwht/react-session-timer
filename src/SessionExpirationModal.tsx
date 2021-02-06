import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getSecondsRemaining } from './useSecondsRemining';
import { extendSlidingExpiration, getPage, signOut } from './utils';

const SessionExpirationModal: React.FC = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(getSecondsRemaining());

  const [sessionExpired, setSessionExpired] = useState(false);
  const [disableModal, setDisableModal] = useState(false);
  const [modalDisplayed] = useState(false);

  useEffect(() => {
    let allSecondsRemaining = setInterval(() => {
      setSecondsRemaining(getSecondsRemaining());

      // takes about 350 ms for modal to open
      if (!disableModal && secondsRemaining === 31 && !modalDisplayed) {
        setShowModal(true);
      }

      if (disableModal && secondsRemaining === 10) setDisableModal(false);
      if (!disableModal && secondsRemaining <= 10 && !showModal) {
        setShowModal(true);
      }
      if (secondsRemaining <= 0) {
        if (!showModal) setShowModal(true);

        clearInterval(allSecondsRemaining);
        signOut();
        return history.push('/signin?' + getPage());
      }
      // Below line will display ongoing countdown
      // console.log(secondsRemaining);
    }, 1000);

    return () => {
      clearInterval(allSecondsRemaining);
    };
  });

  const toggle = () => setShowModal(!showModal);

  const extendPageSession = () => {
    setShowModal(false);

    const seconds = extendSlidingExpiration();

    if (seconds === 0) {
      setSessionExpired(true);
      if (!showModal) setShowModal(true);

      signOut();
      return history.push('/signin?' + getPage());
    }

    setSecondsRemaining(seconds);

    setShowModal(false);
  };

  const disableModalCheck = () => {
    setDisableModal(true);
    toggle();

    if (secondsRemaining < 10) setDisableModal(true);
  };

  return (
    <Modal isOpen={showModal} autoFocus={true} toggle={toggle} centered={true}>
      {sessionExpired && (
        <>
          <ModalHeader toggle={toggle}>Your Session Expired</ModalHeader>
          <div className='text-center pt-2 pb-2'>
            We experienced an error extending your session.
            <br />
            Signing out...
            <br />
            <FontAwesomeIcon className='icon' icon={faSpinner} spin size='lg' />
          </div>
        </>
      )}

      {!sessionExpired && secondsRemaining > 0 && (
        <>
          <ModalHeader toggle={toggle}>Extend Session?</ModalHeader>
          <div className='text-center pt-2 pb-2'>
            {`${secondsRemaining} ${secondsRemaining > 1 ? 'seconds remaining.' : 'second remaining.'}`}
            <br />
            <br />
            <Button color='primary' onClick={() => extendPageSession()}>
              Yes
            </Button>
            &#160;
            <Button color='secondary' onClick={() => disableModalCheck()}>
              No
            </Button>
          </div>
        </>
      )}
      {!sessionExpired && secondsRemaining < 1 && (
        <div className='text-center pt-2 pb-2'>
          Signing Out...
          <br />
          <FontAwesomeIcon className='icon' icon={faSpinner} spin size='lg' />
        </div>
      )}
    </Modal>
  );
};

export default SessionExpirationModal;

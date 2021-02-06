import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { Button, Modal, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getSecondsRemaining } from './useSecondsRemining';
import { extendSlidingExpiration, getPage, signOut } from './utils';

const SessionExpirationModal: React.FC = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useImmer({ count: getSecondsRemaining() });

  const [sessionExpired, setSessionExpired] = useState(false);
  const [disableModal] = useImmer({ disabled: false });
  const [modalDisplayed] = useImmer({ displayed: false });

  useEffect(() => {
    let allSecondsRemaining = setInterval(() => {
      setSecondsRemaining((draft) => {
        draft.count = getSecondsRemaining();
      });

      // takes about 350 ms for modal to open
      if (!disableModal.disabled && secondsRemaining.count === 31 && !modalDisplayed.displayed) {
        setShowModal(true);
      }

      if (disableModal.disabled && secondsRemaining.count === 10) disableModal.disabled = false;
      if (!disableModal.disabled && secondsRemaining.count <= 10 && !showModal) {
        setShowModal(true);
      }
      if (secondsRemaining.count <= 0) {
        if (!showModal) setShowModal(true);

        clearInterval(allSecondsRemaining);
        signOut();
        return history.push('/signin?' + getPage());
      }
      // Below line will display ongoing countdown
      // console.log(secondsRemaining.count);
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

    setSecondsRemaining((draft) => {
      draft.count = seconds;
    });

    setShowModal(false);
  };

  const disableModalCheck = () => {
    disableModal.disabled = true;
    toggle();

    if (secondsRemaining.count < 10) disableModal.disabled = true;
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

      {!sessionExpired && secondsRemaining.count > 0 && (
        <>
          <ModalHeader toggle={toggle}>Extend Session?</ModalHeader>
          <div className='text-center pt-2 pb-2'>
            {`${secondsRemaining.count} ${secondsRemaining.count > 1 ? 'seconds remaining.' : 'second remaining.'}`}
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
      {!sessionExpired && secondsRemaining.count < 1 && (
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

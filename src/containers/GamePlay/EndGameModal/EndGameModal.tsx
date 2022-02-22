import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Logo, ViewButton } from '@components';
import {
  useAppDispatch,
  addToLeaderboard,
  useLeaderboardSelector,
} from '@store';
import { routes } from '@appConstants';
import { RequestStatus } from '@types';
import { eventBus } from '@core/EventBus';
import { GAME_STATUS } from '@core';

import styles from './styles.module.scss';

export const EndGameModal = ({ isOpen, onClose, gameStatus }) => {
  const { requestStatus } = useLeaderboardSelector();
  const { status, score } = gameStatus;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dispatchToLeaderboard = () => {
    dispatch(
      addToLeaderboard({
        location: 'Москва',
        score,
      }),
    );
  };

  const goToNewGame = () => {
    onClose();
    if (status === 'win') {
      dispatchToLeaderboard();
      setTimeout(() => {
        eventBus.emit('GAME_NEXT');
      }, 500);
    } else {
      eventBus.emit('GAME_RESTART');
    }
  };

  const goToLeaderboard = () => navigate(routes.leaderboard);

  const onModalClose = () => {
    onClose();
    goToNewGame();
  };

  const isDisabled = requestStatus === RequestStatus.REQUEST;

  return (
    <Modal isOpen={isOpen} className={styles.modal} onClose={onModalClose}>
      <h2 className={styles.title}>{GAME_STATUS[status]?.text}</h2>
      <div className={styles.logo}>
        <Logo width="50" height="50" />
      </div>
      <div className={styles.buttons}>
        <Button
          title={GAME_STATUS[status]?.button}
          type="button"
          view={ViewButton.main}
          disabled={isDisabled}
          onClick={goToNewGame}
        />
        <Button
          title="Таблица лидеров"
          type="button"
          view={ViewButton.secondary}
          disabled={isDisabled}
          onClick={goToLeaderboard}
        />
      </div>
    </Modal>
  );
};

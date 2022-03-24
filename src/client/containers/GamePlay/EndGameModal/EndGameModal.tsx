import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Logo, ViewButton } from '@components';
import { useAppDispatch, addToLeaderboard, useUserSelector } from '@store';
import { routes } from '@appConstants';
import { eventBus } from '@game-core/EventBus';
import { GAME_STATUS } from '@game-core';
import { RequestStatus } from '@types';

import styles from './styles.module.scss';

export const EndGameModal = ({ isOpen, onClose, gameStatus }) => {
  const { login, requestStatus } = useUserSelector();
  const { status, score } = gameStatus;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getSavedScore = (): number => {
    if (localStorage.getItem('SpringfieldMarioScore')) {
      const oldItem = JSON.parse(
        localStorage.getItem('SpringfieldMarioScore') as string,
      );
      return oldItem.score + score;
    }
    return score;
  };

  const dispatchToLeaderboard = () => {
    const updatedScore = getSavedScore();

    if (requestStatus === RequestStatus.SUCCESS) {
      dispatch(
        addToLeaderboard({
          location: 'Москва',
          score: updatedScore,
        }),
      );
    }

    localStorage.setItem(
      'SpringfieldMarioScore',
      JSON.stringify({ login, score: updatedScore }),
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

  const scoreText =
    status === 'win' ? <h3 className={styles.title}>Очки: {score}</h3> : null;

  return (
    <Modal isOpen={isOpen} className={styles.modal} onClose={onModalClose}>
      <h2 className={styles.title}>{GAME_STATUS[status]?.text}</h2>
      {scoreText}
      <div className={styles.logo}>
        <Logo width="50" height="50" />
      </div>
      <div className={styles.buttons}>
        <Button
          title={GAME_STATUS[status]?.button}
          type="button"
          view={ViewButton.main}
          onClick={goToNewGame}
        />
        <Button
          title="Таблица лидеров"
          type="button"
          view={ViewButton.secondary}
          onClick={goToLeaderboard}
        />
      </div>
    </Modal>
  );
};

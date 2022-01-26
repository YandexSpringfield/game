import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Logo, ViewButton } from '@components';
import {
  useAppDispatch,
  addToLeaderboard,
  useLeaderboardSelector,
} from '@store';
import { routes } from '@appConstants';
import { RequestStatus } from '@types';
import styles from './styles.module.scss';

export const EndGameModal = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { requestStatus } = useLeaderboardSelector();
  useEffect(() => {
    dispatch(
      addToLeaderboard({
        location: 'Москва',
        score: 10999, // TODO нужно пробрасывать количество очков
      }),
    );
  }, []);
  const navigate = useNavigate();
  const goToNewGame = () => navigate(routes.game.play);
  const goToLeaderboard = () => navigate(routes.leaderboard);
  const onModalClose = () => {
    onClose();
    goToNewGame();
  };
  const isDisabled = requestStatus === RequestStatus.REQUEST;

  return (
    <Modal isOpen={isOpen} className={styles.modal} onClose={onModalClose}>
      <h2 className={styles.title}>Вы проиграли!</h2>
      <div className={styles.logo}>
        <Logo width="50" height="50" />
      </div>
      <div className={styles.buttons}>
        <Button
          title="Начать заново"
          type="button"
          view={ViewButton.main}
          disabled={isDisabled}
          onClick={goToNewGame}
        />
        <Button
          title="Leaderboard"
          type="button"
          view={ViewButton.secondary}
          disabled={isDisabled}
          onClick={goToLeaderboard}
        />
      </div>
    </Modal>
  );
};

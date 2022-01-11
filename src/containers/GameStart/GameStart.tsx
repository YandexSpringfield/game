import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@appConstants';

import styles from './styles.module.scss';

export const GameStart = () => {
  return (
    <div className={styles.container}>
      <Link to={routes.game.play}>Начать игру</Link>
    </div>
  );
};

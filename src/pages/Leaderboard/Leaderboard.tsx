import React, { FC, useEffect } from 'react';
import { TableRow } from '@components';
import { useAppDispatch } from '@store';
import { fetchLeaderboard, useLeaderboardSelector } from '@store/leaderboard';

import styles from './Leaderboard.module.scss';

export const Leaderboard: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);

  const leaderboard = useLeaderboardSelector();

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div>№</div>
        <div>Игрок</div>
        <div>Город</div>
        <div>Счет</div>
      </div>
      {leaderboard?.map(({ data }, index) => (
        <TableRow
          key={`${data.score}-${data?.login}-${data.name}`}
          {...data}
          index={index + 1}
        />
      ))}
    </div>
  );
};

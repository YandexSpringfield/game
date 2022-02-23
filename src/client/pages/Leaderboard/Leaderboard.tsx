import React, { FC, useEffect } from 'react';
import { TableRow, Loading } from '@components';
import {
  useAppDispatch,
  fetchLeaderboard,
  useLeaderboardSelector,
  leaderboardSlice,
} from '@store';
import { initialState } from '@store/user/userSlice';
import { RequestStatus } from '@types';

import styles from './Leaderboard.module.scss';

export const Leaderboard: FC = () => {
  const dispatch = useAppDispatch();
  const { data, requestStatus } = useLeaderboardSelector();

  useEffect(() => {
    if (requestStatus !== RequestStatus.SUCCESS) {
      dispatch(fetchLeaderboard());
    }

    return () => {
      dispatch(leaderboardSlice.actions.setState(initialState));
    };
  }, []);

  if (requestStatus === RequestStatus.REQUEST) {
    <Loading />;
  }

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div>№</div>
        <div>Игрок</div>
        <div>Город</div>
        <div>Счет</div>
      </div>
      {data?.map(({ data }, index) => (
        <TableRow
          key={`${data.score}-${data?.login}-${data.name}`}
          {...data}
          index={index + 1}
        />
      ))}
    </div>
  );
};

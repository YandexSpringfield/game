import React from 'react';
import { Content, TableRow } from '@components';
import { MOCK_DATA } from './mockData';

import styles from './styles.module.scss';

export const Leaderboard = () => (
  <Content title="Leaderboard">
    <div className={styles.table}>
      <div className={styles.header}>
        <div>№</div>
        <div>Игрок</div>
        <div>Счет</div>
      </div>
      {MOCK_DATA.map(({ rank, ...item }) => (
        <TableRow key={rank} rank={rank} {...item} />
      ))}
    </div>
  </Content>
);

import React from 'react';
import { Content, TableRow } from '@components';
import { MOCK_DATA } from './mockData';

import styles from './styles.module.scss';

export const Leaderboard = () => (
  <Content title="Leaderboard">
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          <th>№</th>
          <th>Игрок</th>
          <th>Счет</th>
        </tr>
      </thead>
      <tbody>
        {MOCK_DATA.map(({ rank, ...item }) => (
          <TableRow key={rank} rank={rank} {...item} />
        ))}
      </tbody>
    </table>
  </Content>
);

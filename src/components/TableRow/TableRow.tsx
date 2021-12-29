import React, { FC } from 'react';
import { Avatar } from '@components';
import { TProps } from '@components/TableRow/types';
import defaultAvatar from '../../assets/images/default-logo.png';

import styles from './TableRow.module.scss';

export const TableRow: FC<TProps> = ({ rank, avatar, username, score }) => (
  <tr className={styles.row}>
    <td>{rank}</td>
    <td className={styles.player}>
      <Avatar src={avatar || defaultAvatar} />
      {username}
    </td>
    <td>{score}</td>
  </tr>
);

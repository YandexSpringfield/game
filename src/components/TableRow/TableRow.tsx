import React, { FC } from 'react';
import { Avatar } from '@components';
import { TProps } from '@components/TableRow/types';
import defaultAvatar from '../../assets/images/default-avatar.png';

import styles from './TableRow.module.scss';

export const TableRow: FC<TProps> = ({ rank, avatar, username, score }) => (
  <div className={styles.row}>
    <div>{rank}</div>
    <div className={styles.player}>
      <Avatar src={avatar || defaultAvatar} />
      {username}
    </div>
    <div>{score}</div>
  </div>
);

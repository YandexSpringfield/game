import React, { FC } from 'react';
import { Avatar } from '@components';
import { TProps } from '@components/TableRow/types';
import { resourcesUrl } from '@appConstants';
import defaultAvatar from '../../assets/images/default-avatar.png';
import styles from './TableRow.module.scss';

export const TableRow: FC<TProps> = ({ index, avatar, login, city, score }) => {
  const itemAvatar = resourcesUrl + avatar;

  return (
    <div className={styles.row}>
      <div>{index}</div>
      <div className={styles.player}>
        <Avatar src={avatar ? itemAvatar : defaultAvatar} />
        {login || 'unknown'}
      </div>
      <div>{city || 'unknown'}</div>
      <div>{score}</div>
    </div>
  );
};

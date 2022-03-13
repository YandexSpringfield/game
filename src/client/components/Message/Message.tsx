import React from 'react';
import cn from 'classnames';
import { useUserSelector } from '@store';

import styles from './Message.module.scss';

export const Message = ({ message }) => {
  const user = useUserSelector();
  const date = new Date(message.createdAt).toUTCString();
  const messageStyle =
    message.ownerId === user.id ? styles.sentMessage : styles.receivedMessage;

  return (
    <div className={cn(styles.container, messageStyle)}>
      <span className={styles.login}>{message.owner.login}</span>
      <p className={styles.text}>{message.message}</p>
      <span className={styles.date}>{date}</span>
    </div>
  );
};

import React from 'react';

import styles from './Message.module.scss';

export const Message = ({ message }) => {
  const toDate = new Date(message.data).toUTCString();

  return (
    <div className={styles.container}>
      <span className={styles.login}>{message.login}</span>
      <p className={styles.text}>{message.text}</p>
      <span className={styles.data}>{toDate}</span>
    </div>
  );
};

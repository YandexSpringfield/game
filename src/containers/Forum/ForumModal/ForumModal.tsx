import React from 'react';
import { Button, Input, Modal, ViewButton } from '@components';

import styles from './styles.module.scss';

export const ForumModal = ({ isOpen, onClose, item }) => {
  const toDate = new Date(item?.data).toUTCString();

  const onModalClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalClose} className={styles.modalContainer}>
      <div>
        <h3 className={styles.title}>{item?.title}</h3>
        <p className={styles.content}>{item?.content}</p>
      </div>
      <form className={styles.messageContainer}>
        <Input label='Введите сообщение' error='' name='message' />
        <Button title='Отправить' type='submit' view={ViewButton.main}/>
      </form>
    </Modal>
  )
}

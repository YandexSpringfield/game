import React, { useState } from 'react';
import { useInput } from '@hooks';
import { useUserSelector } from '@store';
import { Button, Input, Modal, ViewButton, Message } from '@components';

import styles from './styles.module.scss';

const initialFields = {
  message: '',
};

const initialState: TMessage[] = []

type TMessage = {
  id: number;
  login: string;
  text: string;
  data: number;
}

export const ForumModal = ({ isOpen, onClose, item }) => {
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);
  const [messages, setMessages] = useState(initialState)
  const user = useUserSelector();

  const onModalClose = () => {
    onClose();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage: TMessage = {
      id: messages.length + 1,
      login: user.login,
      text: fields.message,
      data: Date.now(),
    }
    setMessages([...messages, newMessage])
    setFields(initialFields);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      className={styles.modalContainer}
    >
      <div>
        <h3 className={styles.title}>{item?.title}</h3>
        <p>{item?.content}</p>
      </div>
      <div className={styles.messagesField}>
        {messages.map(message => <Message key={message.id} message={message} />)}
      </div>
      <form className={styles.messageContainer}>
        <Input label="Введите сообщение" error="" name="message" value={fields.message} {...rest} />
        <Button title="Отправить" type="submit" view={ViewButton.main} onClick={sendMessage} />
      </form>
    </Modal>
  );
};

import React, { useEffect, useState } from 'react';
import { useInput } from '@hooks';
import { Button, Input, Modal, ViewButton, Message } from '@components';
import { forumAPI } from '@api';
import { TInitialFields, TMessage } from './types';

import styles from './styles.module.scss';

const initialFields: TInitialFields = {
  message: '',
};

const initialState: TMessage[] = [];

export const ForumModal = ({ isOpen, onClose, item }) => {
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);
  const [messages, setMessages] = useState(initialState);

  useEffect(() => {
    if (isOpen) {
      forumAPI.getComments(item.id).then((data) => {
        setMessages(data.data.data);
      });
    }
  }, [isOpen]);

  const onModalClose = () => {
    setMessages([]);
    onClose();
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const newMessage: TMessage = {
      message: fields.message,
      parentId: item.id,
    };
    forumAPI.createComment(newMessage).then(() => {
      forumAPI.getComments(item.id).then((data) => {
        setMessages(data.data.data);
      });
    });
    setFields(initialFields);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onModalClose}
      className={styles.modalContainer}
    >
      <div>
        <h3 className={styles.title}>{item?.title}</h3>
        <p className={styles.content}>{item?.description}</p>
      </div>
      <div className={styles.messagesField}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <form className={styles.messageContainer}>
        <Input
          label="Введите сообщение"
          error=""
          name="message"
          value={fields.message}
          {...rest}
        />
        <Button
          title="Отправить"
          type="submit"
          view={ViewButton.main}
          onClick={sendMessage}
        />
      </form>
    </Modal>
  );
};

import React, { useState } from 'react';
import { useInput } from '@hooks';
import { ForumModal } from '@containers';
import { Button, Card, Content, Input, ViewButton } from '@components';
import { TInitialFields, TItem } from './types';
import { MOCK_DATA } from './mockData';

import styles from './styles.module.scss';

const initialFields: TInitialFields = {
  topic: '',
  content: '',
};

export const Forum = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [openedTopic, setOpenedTopic] = useState({});
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);
  const [data, setData] = useState(MOCK_DATA);

  const createTopic = (e) => {
    e.preventDefault();
    const newTopic: TItem = {
      id: data.length + 1,
      data: Date.now(),
      title: fields.topic,
      content: fields.content,
    };
    setData([...data, newTopic]);
    setFields(initialFields);
  };

  const openTopic = (e) => {
    setModalOpen(true);
    const topic =
      data.find((item) => item.id === Number(e.currentTarget.id)) || {};
    setOpenedTopic(topic);
  };

  return (
    <Content title="Форум">
      <form className={styles.container}>
        <Input
          label="Тема"
          error=""
          name="topic"
          value={fields.topic}
          {...rest}
        />
        <Input
          label="Описание"
          error=""
          name="content"
          value={fields.content}
          {...rest}
        />
        <Button
          title="+ Новая тема"
          view={ViewButton.main}
          type="submit"
          onClick={createTopic}
        />
      </form>
      {data
        .sort((a, b) => b.data - a.data)
        .map((item) => {
          const toDate = new Date(item.data).toUTCString();

          return (
            <Card
              key={item.id}
              id={item.id.toString()}
              className={styles.card}
              onClick={openTopic}
            >
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.content}>{item.content}</p>
              <p className={styles.data}>{toDate}</p>
            </Card>
          );
        })}
      <ForumModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={openedTopic}
      />
    </Content>
  );
};

import React, { MouseEvent, useEffect, useState } from 'react';
import { useInput } from '@hooks';
import { ForumModal } from '@containers';
import { Button, Card, Content, Input, ViewButton } from '@components';
import { forumAPI } from '@api';
import { fetchForumTopics, useAppDispatch, useForumSelector } from '@store';
import { TTopicItem } from './types';

import styles from './styles.module.scss';

const initialFields: TTopicItem = {
  title: '',
  description: '',
};

export const Forum = () => {
  const dispatch = useAppDispatch();
  const { data } = useForumSelector();
  const [modalOpen, setModalOpen] = useState(false);
  const [openedTopic, setOpenedTopic] = useState({});
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);

  useEffect(() => {
    dispatch(fetchForumTopics());
  }, []);

  const createTopic = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    forumAPI.createTopic(fields).then(() => {
      dispatch(fetchForumTopics());
    });
    setFields(initialFields);
  };

  const openTopic = (e: MouseEvent<HTMLElement>) => {
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
          name="title"
          value={fields.title}
          {...rest}
        />
        <Input
          label="Описание"
          error=""
          name="description"
          value={fields.description}
          {...rest}
        />
        <Button
          title="+ Новая тема"
          view={ViewButton.main}
          type="submit"
          onClick={createTopic}
        />
      </form>
      {data?.map((item) => {
        const date = new Date(item.createdAt).toUTCString();

        return (
          <Card
            key={item.id}
            id={item.id.toString()}
            className={styles.card}
            onClick={openTopic}
          >
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.content}>{item.description}</p>
            <p className={styles.date}>{date}</p>
          </Card>
        );
      })}
      <ForumModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        topic={openedTopic}
      />
    </Content>
  );
};

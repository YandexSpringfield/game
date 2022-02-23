import React, { useState } from 'react';
import { useInput } from '@hooks';
import { Button, Card, Content, Input, ViewButton } from '@components';
import { MOCK_DATA } from './mockData';

import styles from './styles.module.scss';

const initialFields = {
  topic: '',
  content: '',
};

export const Forum = () => {
  const { fields, setFields, fieldsError, ...rest } = useInput(initialFields);
  const [dataLength, setDataLength] = useState(MOCK_DATA.length);

  const createTopic = (e) => {
    e.preventDefault();
    const newTopic = {
      id: dataLength + 1,
      data: Date.now(),
      title: fields.topic,
      content: fields.content,
    };
    MOCK_DATA.push(newTopic);
    setDataLength(dataLength + 1);
    setFields(initialFields);
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
      {MOCK_DATA.sort((a, b) => b.data - a.data).map((item) => {
        const toDate = new Date(item.data).toUTCString();
        return (
          <Card key={item.id} className={styles.card}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.content}>{item.content}</p>
            <p className={styles.data}>{toDate}</p>
          </Card>
        );
      })}
    </Content>
  );
};

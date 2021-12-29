import React from 'react';
import { Content, Card } from '@components';
import { MOCK_DATA } from './mockData';

import styles from './styles.module.scss';

export const Forum = () => (
  <Content title="Forum">
    {MOCK_DATA.map((item) => (
      <Card key={item.id} className={styles.card}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.content}>{item.content}</p>
      </Card>
    ))}
  </Content>
);

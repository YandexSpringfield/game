import React from 'react';
import { Content, Card } from '@components';
import { MOCK_DATA } from './mockData';
import styles from './styles.module.scss';
export const Forum = () => (React.createElement(Content, { title: "\u0424\u043E\u0440\u0443\u043C" }, MOCK_DATA.map((item) => (React.createElement(Card, { key: item.id, className: styles.card },
    React.createElement("h3", { className: styles.title }, item.title),
    React.createElement("p", { className: styles.content }, item.content))))));

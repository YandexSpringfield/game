import React from 'react';
import { Logo } from '@components';
import styles from './Loading.module.scss';
export const Loading = () => (React.createElement("div", { className: styles.loading },
    React.createElement("div", { className: styles.logo },
        React.createElement(Logo, { width: "50", height: "50" })),
    React.createElement("span", { className: styles.title }, "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...")));

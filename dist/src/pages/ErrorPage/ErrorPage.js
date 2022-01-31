import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@appConstants';
import { Logo } from '@components';
import styles from './ErrorPage.module.scss';
export const ErrorPage = () => (React.createElement("div", { className: styles.container },
    React.createElement(Logo, { width: "50", height: "50" }),
    React.createElement("h1", { className: styles.title }, "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430"),
    React.createElement(Link, { to: routes.login, className: styles.link }, "\u041D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E")));

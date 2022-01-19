import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '@appConstants';
import { Logo } from '@components';

import styles from './ErrorPage.module.scss';

export const ErrorPage: FC = () => (
  <div className={styles.container}>
    <Logo width="50" height="50" />
    <h1 className={styles.title}> Страница не найдена </h1>
    <Link to={routes.login} className={styles.link}>
      На главную
    </Link>
  </div>
);

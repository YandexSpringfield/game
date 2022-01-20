import React, { FC } from 'react';
import { Logo } from '@components';

import styles from './Loading.module.scss';

export const Loading: FC = () => (
  <div className={styles.loading}>
    <div className={styles.logo}>
      <Logo width="50" height="50" />
    </div>
    <span className={styles.title}>Загрузка...</span>
  </div>
);

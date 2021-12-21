import React, { FC } from 'react';
import { TProps } from '@components/Secondary-button/types';

import styles from './Secondary-button.module.scss';

export const SecondaryButton: FC<TProps> = ({ href, title }) => (
  <a href={href} className={styles.button__secondary}>
    <span>{title}</span>
  </a>
);

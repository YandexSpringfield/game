import React, { FC } from 'react';
import { TProps } from './types';

import styles from './Error.module.scss';

export const Error: FC<TProps> = ({ title }) => (
  <span className={styles.error}>{title}</span>
);

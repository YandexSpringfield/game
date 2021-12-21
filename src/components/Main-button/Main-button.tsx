import React, { FC } from 'react';
import { TProps } from '@components/Main-button/types';

import styles from './Main-button.module.scss';

export const MainButton: FC<TProps> = ({ title }) => (
  <input className={styles.button__main} type="submit" value={title} />
);

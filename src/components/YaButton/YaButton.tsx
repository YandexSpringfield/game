import React, { FC } from 'react';
import { TProps } from '@components/YaButton/types';
import YandexIcon from '@/assets/images/yandex.svg';

import styles from './YaButton.module.scss';

export const YaButton: FC<TProps> = ({ ...props }) => (
  <button className={styles.yaButton} type="button" {...props}>
    <YandexIcon />
  </button>
);

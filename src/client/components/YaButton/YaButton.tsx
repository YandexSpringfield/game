import React, { FC } from 'react';
import { TProps } from 'src/client/components/YaButton/types';
import YandexIcon from 'src/client/assets/images/yandex.svg';

import styles from './YaButton.module.scss';

export const YaButton: FC<TProps> = ({ ...props }) => (
  <button className={styles.yaButton} type="button" {...props}>
    <YandexIcon />
  </button>
);

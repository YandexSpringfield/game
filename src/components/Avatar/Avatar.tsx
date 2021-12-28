import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

import styles from './styles.module.scss';

export const Avatar: FC<TProps> = ({ className, src, alt = 'Avatar' }) => (
  <div className={cn(styles.avatar, className)}>
    <img className={styles.img} src={src} alt={alt} />
  </div>
);

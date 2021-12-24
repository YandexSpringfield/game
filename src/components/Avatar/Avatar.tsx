import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

import styles from './styles.module.scss';

export const Avatar: FC<TProps> = ({ className, src, alt }) => {
  return (
    <div className={cn(styles.avatar, className)}>
      <img src={src} alt={alt || 'Avatar'} />
    </div>
  );
};

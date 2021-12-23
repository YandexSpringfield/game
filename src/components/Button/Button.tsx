import React, { FC } from 'react';
import { TProps } from '@components/Button/types';
import cn from 'classnames';

import styles from './Button.module.scss';

export const Button: FC<TProps> = ({ title, view, type, ...rest }) => (
  <button
    className={cn(
      styles.button,
      { [styles.button__main]: view === 'main' },
      { [styles.button__secondary]: view === 'secondary' },
    )}
    type={type}
    {...rest}
  >
    {title}
  </button>
);

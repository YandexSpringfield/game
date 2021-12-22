import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '@components/Input/types';

import styles from './Input.module.scss';

export const Input: FC<TProps> = ({ name, label, error, ...rest }) => (
  <div className={styles.input__wrapper}>
    <label className={styles.input__label} htmlFor={name}>
      {label}
    </label>
    <input
      className={cn(styles.input__field, { [styles.error]: !!error })}
      name={name}
      id={name}
      {...rest}
    />
    {typeof error === 'string' ? (
      <span className={styles.error__field}>{error}</span>
    ) : (
      ''
    )}
  </div>
);

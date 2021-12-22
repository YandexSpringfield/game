import React, { FC } from 'react';
import { TProps } from '@components/Input/types';

import styles from './Input.module.scss';

export const Input: FC<TProps> = ({
  name,
  label,
  errorMessage,
  inputValid,
  ...rest
}) => (
  <div className={styles.input__wrapper}>
    <label className={styles.input__label} htmlFor={name}>
      {label}
    </label>
    <input
      className={styles.input__field + (inputValid ? '' : ` ${styles.error}`)}
      name={name}
      id={name}
      {...rest}
    />
    {inputValid ? (
      ''
    ) : (
      <span className={styles.error__filed}>{errorMessage}</span>
    )}
  </div>
);

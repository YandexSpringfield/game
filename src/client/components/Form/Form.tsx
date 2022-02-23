import React, { FC } from 'react';
import { TProps } from './types';

import styles from './Form.module.scss';

export const Form: FC<TProps> = ({ name, children, onSubmit }) => (
  <form className={styles.form} name={name} onSubmit={onSubmit}>
    {children}
  </form>
);

import React, { FC } from 'react';
import { TProps } from './types';

import styles from './Form.module.scss';

export const Form: FC<TProps> = ({ name, children }) => (
  <form className={styles.form} method="post" name={name}>
    {children}
  </form>
);

import React, { FC } from 'react';
import { TProps } from './types';

import styles from './Form.module.scss';

export const Form: FC<TProps> = ({ name, children, method }) => (
  <form className={styles.form} method={method} name={name}>
    {children}
  </form>
);

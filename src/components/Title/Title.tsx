import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

import styles from './styles.module.scss';

export const Title: FC<TProps> = ({ children, className }) => (
  <h1 className={cn(styles.title, className)}>{children}</h1>
);

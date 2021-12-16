import React, { FC } from 'react';
import cn from 'classnames';
import { Props } from '.';

import styles from './styles.module.scss';

export const Title: FC<Props> = ({ children, className }) => (
  <h1 className={cn(styles.title, className)}>{children}</h1>
);

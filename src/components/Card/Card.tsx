import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

import styles from './styles.module.scss';

export const Card: FC<TProps> = ({ className, children }) => {
  return <div className={cn(styles.card, className)}>{children}</div>;
};

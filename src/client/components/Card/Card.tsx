import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from './index';

import styles from './styles.module.scss';

export const Card: FC<TProps> = ({ className, children, ...props }) => (
  <div {...props} className={cn(styles.card, className)}>
    {children}
  </div>
);

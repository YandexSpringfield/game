import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

import styles from './styles.module.scss';

export const Content: FC<TProps> = ({
  title,
  description,
  children,
  className,
}) => (
  <main className={styles.container}>
    <h1 className={styles.title}>{title}</h1>
    <p
      className={cn(styles.description, {
        [styles.hidden]: !description,
      })}
    >
      {description}
    </p>
    <section className={cn(className)}>{children}</section>
  </main>
);

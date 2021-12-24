import React, { FC } from 'react';
import cn from 'classnames';
import { TProps } from '.';

export const Content: FC<TProps> = ({ title, children, className }) => {
  return (
    <main>
      <h1>{title}</h1>
      <section className={cn(className)}>{children}</section>
    </main>
  );
};

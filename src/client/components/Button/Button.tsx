import React, { FC } from 'react';
import { TProps, ViewButton } from 'src/client/components/Button/types';
import cn from 'classnames';

import styles from './Button.module.scss';

export const Button: FC<TProps> = ({ title, view, type, ...rest }) => (
  <button
    className={cn(
      styles.button,
      { [styles.button__main]: view === ViewButton.main },
      { [styles.button__secondary]: view === ViewButton.secondary },
      { [styles.button__exit]: view === ViewButton.exit },
      { [styles.button__transparent]: view === ViewButton.transparent },
    )}
    type={type}
    {...rest}
  >
    {title}
  </button>
);

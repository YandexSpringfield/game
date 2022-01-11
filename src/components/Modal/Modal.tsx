import React, { FC } from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import { Props } from '.';

import styles from './styles.module.scss';

export const Modal: FC<Props> = ({ isOpen, className, children, onClose }) => {
  return createPortal(
    isOpen ? (
      <div className={styles.overlay}>
        <div className={cn(styles.modal, className)}>
          {children}
          <button
            type="button"
            aria-label="close"
            className={styles.closeBtn}
            onClick={onClose}
          />
        </div>
      </div>
    ) : null,
    document.body,
  );
};

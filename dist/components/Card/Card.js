import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Card = ({ className, children, ...props }) => (React.createElement("div", { ...props, className: cn(styles.card, className) }, children));

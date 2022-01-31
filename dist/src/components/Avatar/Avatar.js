import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Avatar = ({ className, src, alt = 'Avatar' }) => (React.createElement("div", { className: cn(styles.avatar, className) },
    React.createElement("img", { className: styles.img, src: src, alt: alt })));

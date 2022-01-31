import React from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Content = ({ title, description, children, className, }) => (React.createElement("main", { className: styles.container },
    React.createElement("h1", { className: styles.title }, title),
    React.createElement("p", { className: cn(styles.description, {
            [styles.hidden]: !description,
        }) }, description),
    React.createElement("section", { className: cn(className) }, children)));

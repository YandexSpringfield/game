import React from 'react';
import styles from './Error.module.scss';
export const Error = ({ title }) => (React.createElement("span", { className: styles.error }, title));

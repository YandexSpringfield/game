import React from 'react';
import styles from './Form.module.scss';
export const Form = ({ name, children, onSubmit }) => (React.createElement("form", { className: styles.form, name: name, onSubmit: onSubmit }, children));

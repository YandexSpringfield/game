import React from 'react';
import cn from 'classnames';
import styles from './Input.module.scss';
export const Input = ({ name, label, error, ...rest }) => (React.createElement("div", { className: styles.input__wrapper },
    React.createElement("label", { className: styles.input__label, htmlFor: name }, label),
    React.createElement("input", { className: cn(styles.input__field, { [styles.error]: Boolean(error) }), name: name, id: name, ...rest }),
    error ? React.createElement("span", { className: styles.error__field }, error) : null));

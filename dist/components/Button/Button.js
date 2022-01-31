import React from 'react';
import { ViewButton } from '@components/Button/types';
import cn from 'classnames';
import styles from './Button.module.scss';
export const Button = ({ title, view, type, ...rest }) => (React.createElement("button", { className: cn(styles.button, { [styles.button__main]: view === ViewButton.main }, { [styles.button__secondary]: view === ViewButton.secondary }, { [styles.button__exit]: view === ViewButton.exit }, { [styles.button__transparent]: view === ViewButton.transparent }), type: type, ...rest }, title));

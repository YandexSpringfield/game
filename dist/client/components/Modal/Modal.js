import React from 'react';
import cn from 'classnames';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';
export const Modal = ({ isOpen, className, children, onClose }) => {
    if (!isOpen) {
        return null;
    }
    return createPortal(React.createElement("div", { className: styles.overlay },
        React.createElement("div", { className: cn(styles.modal, className) },
            children,
            React.createElement("button", { type: "button", "aria-label": "close", className: styles.closeBtn, onClick: onClose }))), document.body);
};

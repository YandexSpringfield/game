import React, { Component } from 'react';
import { Logo } from '@components';
import styles from './ErrorBoundary.module.scss';
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_) {
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return (React.createElement("div", { className: styles.content },
                React.createElement(Logo, { width: "50", height: "100%" }),
                React.createElement("span", { className: styles.title }, "\u0427\u0442\u043E \u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...")));
        }
        return this.props.children;
    }
}

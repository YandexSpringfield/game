import React, { Component, ErrorInfo } from 'react';
import { Logo } from '@components';
import { TProps, TState } from './types';
import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends Component<TProps, TState> {
  public state: TState = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): TState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.content}>
          <Logo width="50" height="100%" />
          <span className={styles.title}>Что то пошло не так...</span>
        </div>
      );
    }

    return this.props.children;
  }
}

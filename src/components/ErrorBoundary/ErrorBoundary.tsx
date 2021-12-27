import React, { Component, ErrorInfo } from 'react';
import { Logo } from '@components';
import { IProps, IState } from './types';
import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): IState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <Logo width="50" height="100%" />
          <span className={styles.errorBoundary__title}>
            Что то пошло не так...
          </span>
        </div>
      );
    }

    return this.props.children;
  }
}

import React from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@components';
import { store } from '@store';
import { Router } from '@router';
// import { hot } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';
export const App = hot(() => {
    return (React.createElement(ErrorBoundary, null,
        React.createElement(Provider, { store: store },
            React.createElement(Router, null))));
});

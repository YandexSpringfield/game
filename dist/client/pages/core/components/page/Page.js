import React from 'react';
// import ErrorBoundary from 'client/components/error-boundry';
import { ErrorBoundary } from '@components';
import Wrapper from '../wrapper';
const { __PROD__ } = process.env;
const Page = () => {
    return __PROD__ ? (React.createElement(ErrorBoundary, null,
        React.createElement(Wrapper, null))) : (React.createElement(Wrapper, null));
};
export default Page;

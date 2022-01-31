import React from 'react';
import { Helmet } from 'react-helmet';
// import Hello from 'client/pages/hello';
import { Login } from '@pages';
const Wrapper = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Helmet, null,
            React.createElement("title", null, "Hello"),
            React.createElement("meta", { name: "title", content: "ssr" })),
        React.createElement(Login, null)));
};
export default Wrapper;

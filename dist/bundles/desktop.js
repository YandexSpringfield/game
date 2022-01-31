import React from 'react';
import { hydrate } from 'react-dom';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader/root';
import Core from '@pages/core';
const Bundle = (props) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Helmet, null,
            React.createElement("html", { lang: "en" }),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" })),
        React.createElement(Core, { ...props.data })));
};
export const DesktopBundle = hot(Bundle);
export default (data) => {
    hydrate(React.createElement(DesktopBundle, { data: data }), document.getElementById('root'));
};

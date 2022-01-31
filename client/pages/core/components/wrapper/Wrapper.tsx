import React from 'react';
import { Helmet } from 'react-helmet';

// import Hello from 'client/pages/hello';

import { Login } from '@pages';

const Wrapper = () => {
  return (
    <>
      <Helmet>
        <title>Hello</title>
        <meta name="title" content="ssr" />
      </Helmet>

      <Login />
    </>
  );
};
export default Wrapper;

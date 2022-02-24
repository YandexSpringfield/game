import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { withAuth } from '@hoc-helpers/withAuth';
import '@testing-library/jest-dom/extend-expect';
import { Layout } from '@appConstants';
import { store } from '@store';
import { Provider } from 'react-redux';

test('withAuth HOC should return component', async () => {
  const ProtectedRoute = withAuth(Layout.Auth)(() => <div>Test Component</div>);

  render(
    <BrowserRouter>
      <Provider store={store}>
        <ProtectedRoute />
      </Provider>
    </BrowserRouter>,
  );

  expect(await screen.findByText(/Test Component/i)).toBeInTheDocument();
});

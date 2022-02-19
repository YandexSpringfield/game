import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAuth } from '@hoc-helpers/withAuth';
import '@testing-library/jest-dom/extend-expect';
import { Layout } from '@appConstants';

test('withAuth HOC should return component', async () => {
  const ProtectedRoute = withAuth(Layout.Auth)(() => <div>Test Component</div>);

  render(<ProtectedRoute />);

  expect(await screen.findByText(/Test Component/i)).toBeInTheDocument();
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAuth } from 'src/client/hoc-helpers/withAuth';
import '@testing-library/jest-dom/extend-expect';

test('withAuth HOC should return component', async () => {
  const ProtectedRoute = withAuth('auth')(() => <div>Test Component</div>);

  render(<ProtectedRoute />);

  expect(await screen.findByText(/Test Component/i)).toBeInTheDocument();
});

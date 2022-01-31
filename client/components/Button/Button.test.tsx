import React from 'react';
import * as renderer from 'react-test-renderer';
import { Button, ViewButton } from '.';

test('Test render button', () => {
  const component = renderer.create(
    <Button view={ViewButton.main} title="Click me!" />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

import React from 'react';
import * as renderer from 'react-test-renderer';
import { Button, ViewButton } from '.';

test('Emit onClick button', () => {
  const component = renderer.create(
    <Button view={ViewButton.main} title="Click me!" />,
  );

  const tree = component.toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
  //
  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
  //
  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

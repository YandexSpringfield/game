import React from 'react';
import * as renderer from 'react-test-renderer';
import { Input } from '.';

describe('Input', () => {
  test('Input: render error node', () => {
    const error = 'Invalid email';

    const component = renderer.create(
      <Input label="Email" value="" error={error} />,
    );

    const errorNode = component.root.findByType('span');
    expect(errorNode.children[0]).toBe(error);
  });
});

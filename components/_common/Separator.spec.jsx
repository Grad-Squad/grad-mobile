import { render } from '@testing-library/react-native';
import React from 'react';
import Separator from './Separator';

it('should match snapshot', () => {
  const separator = render(<Separator />);
  expect(separator.toJSON()).toMatchSnapshot();
});

it('should match snapshot with style prop', () => {
  const separator = render(<Separator style={{ backgroundColor: 'pink' }} />);
  expect(separator.toJSON()).toMatchSnapshot();
});

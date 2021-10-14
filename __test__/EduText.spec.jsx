import React from 'react';
import { render } from '@testing-library/react-native';
import EduText from 'common/EduText';

// Sample Test
test('edu text works', () => {
  const eduText = render(<EduText>test</EduText>);

  expect(eduText.toJSON().children[0]).toBe('test');
});

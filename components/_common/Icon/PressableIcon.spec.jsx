import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import PressableIcon from './PressableIcon';
import { IconNames } from './Icon';

let pressableIcon;
const onPressMock = jest.fn();
beforeEach(() => {
  pressableIcon = render(<PressableIcon onPress={onPressMock} name={IconNames.question}/>);
  onPressMock.mockClear();
});

it('should match snapshot', () => {
  expect(pressableIcon.toJSON()).toMatchSnapshot();
});

it('should should call onPress when pressed', () => {
  fireEvent.press(pressableIcon.container);
  expect(onPressMock).toHaveBeenCalledTimes(1);
});

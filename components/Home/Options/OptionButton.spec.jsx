import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { IconNames } from 'common/Icon/Icon';
import OptionButton from './OptionButton';

it('should match snapshot', () => {
  const optionButton = render(
    <OptionButton label="label" onPress={() => {}} />
  );
  expect(optionButton.toJSON()).toMatchSnapshot();
});

it('should match snapshot with custom iconName', () => {
  const optionButton = render(
    <OptionButton
      label="label"
      iconName={IconNames.question}
      onPress={() => {}}
    />
  );
  expect(optionButton.toJSON()).toMatchSnapshot();
});

it('should call onPress when pressed', () => {
  const onPressMock = jest.fn().mockName('onPressMock');
  const optionButton = render(
    <OptionButton label="label" onPress={onPressMock} />
  );
  fireEvent.press(optionButton.container);
  expect(onPressMock).toHaveBeenCalledTimes(1);
});

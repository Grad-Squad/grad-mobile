import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import MockLocalization from '__test__/__mock__/MockLocalization';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import Wip from './Wip';

jest.mock('@react-navigation/core', () => {
  const goBackMock = jest.fn().mockName('go back');
  return {
    useNavigation: () => ({
      goBack: goBackMock,
    }),
  };
});

let wip;
beforeEach(() => {
  wip = render(
    <MockLocalization>
      <Wip />
    </MockLocalization>
  );
  useNavigation().goBack.mockClear();
});

it('should match snapshot', () => {
  expect(wip.toJSON()).toMatchSnapshot();
});

it('should call goBack when Go Back button is pressed', () => {
  fireEvent.press(wip.getByText('Go back'));
  expect(useNavigation().goBack).toHaveBeenCalledTimes(1);
});

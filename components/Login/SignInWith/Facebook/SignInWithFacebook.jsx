import React from 'react';
import PropTypes from 'prop-types';
import ScreenNames from 'navigation/ScreenNames';
import { useAPIfacebookLogin } from 'api/endpoints/auth';
import * as FacebookSdk from 'expo-facebook';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import { WhiteButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import Facebook from './Facebook';

const SignInWithFacebook = ({ disabled }) => {
  const { t } = useLocalization();
  const navigation = useNavigation();
  const [, dispatch] = useStore();

  const facebookLoginMutation = useAPIfacebookLogin({
    onSuccess: (data) => {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.HOME }],
      });
      dispatch({
        type: ReducerActions.setProfileId,
        payload: data.user.profile.id,
      });
    },
  });
  const loginWithFacebook = async () => {
    await FacebookSdk.initializeAsync({
      appId: '302939171663614',
    });
    const { type, token } = await FacebookSdk.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
      behavior: 'native',
    });
    if (type === 'success') {
      facebookLoginMutation.mutate({ accessToken: token });
    }
  };
  return (
    <WhiteButton
      text={t('Login/Sign In With Facebook')}
      onPress={loginWithFacebook}
      leftIcon={<Facebook />}
      smallButton
      disabled={disabled}
      loading={facebookLoginMutation.isLoading}
    />
  );
};

SignInWithFacebook.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
SignInWithFacebook.defaultProps = {};

export default SignInWithFacebook;

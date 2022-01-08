import React from 'react';
import PropTypes from 'prop-types';
import { WhiteButton } from 'common/Input/Button';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  EXPO_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
  WEB_CLIENT_ID,
} from '@env';
import { useLocalization } from 'localization';
import { stylePropType } from 'proptypes';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import ScreenNames from 'navigation/ScreenNames';
import { useAPIGoogleLogin } from 'api/endpoints/auth';
import { useStore } from 'globalStore/GlobalStore';
import ReducerActions from 'globalStore/ReducerActions';
import GoogleIcon from './Google';

WebBrowser.maybeCompleteAuthSession();

const SignInWithGoogle = ({ disabled, style }) => {
  const { t } = useLocalization();
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  });

  const [, dispatch] = useStore();

  const googleLoginMutation = useAPIGoogleLogin({
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

  React.useEffect(() => {
    if (response?.type === 'success') {
      googleLoginMutation.mutate(response.params.id_token);
    }
  }, [response]);

  return (
    <WhiteButton
      text={t('Login/Sign In With Google')}
      onPress={() => {
        promptAsync();
      }}
      leftIcon={<GoogleIcon />}
      style={style}
      smallButton
      disabled={!request || disabled}
      loading={googleLoginMutation.isLoading}
    />
  );
};

SignInWithGoogle.propTypes = {
  disabled: PropTypes.bool.isRequired,
  style: stylePropType,
};
SignInWithGoogle.defaultProps = {
  style: {},
};

export default SignInWithGoogle;

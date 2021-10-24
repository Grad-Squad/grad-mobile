import PropTypes from 'prop-types';
import { WhiteButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import * as FacebookSdk from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import { useAPIfacebookLogin } from 'api/endpoints/auth';
import ScreenNames from 'navigation/ScreenNames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigation } from '@react-navigation/core';
import Facebook from './Facebook/Facebook';
import Google from './Google/Google';

const SignInWith = ({ disabled }) => {
  const { t } = useLocalization();
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  const facebookLoginMutation = useAPIfacebookLogin({
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{ name: ScreenNames.HOME }],
      });
    },
  });

  const signInWithGoogle = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        setUser(user);
        alert('user:' + JSON.stringify(user));
        alert('user:' + user);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  useEffect(() => {
    const initAsync = async () => {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        signInType: GoogleSignIn.TYPES.DEFAULT,
      });
    };
    initAsync();
  }, []);

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
    <View style={[Styles.cardFooter, styles.background]}>
      <WhiteButton
        text={t('Login/Sign In With Google')}
        onPress={signInWithGoogle}
        leftIcon={<Google />}
        style={styles.firstButtonGap}
        smallButton
        disabled={disabled}
      />
      <WhiteButton
        text={t('Login/Sign In With Facebook')}
        onPress={loginWithFacebook}
        leftIcon={<Facebook />}
        smallButton
        disabled={disabled}
        loading={facebookLoginMutation.isLoading}
      />
    </View>
  );
};

export default SignInWith;

const styles = StyleSheet.create({
  background: {
    paddingTop: 20,
    paddingBottom: 18,
    paddingHorizontal: 17,
    alignSelf: 'center',
    top: -10,

    elevation: 2, // ! temp
  },
  firstButtonGap: { marginBottom: 10 },
});

SignInWith.propTypes = {
  disabled: PropTypes.bool.isRequired,
};
SignInWith.defaultProps = {};

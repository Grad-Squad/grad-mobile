import PropTypes from 'prop-types';
import { WhiteButton } from 'common/Input/Button';
import { useLocalization } from 'localization';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import * as GoogleSignIn from 'expo-google-sign-in';
import SignInWithFacebook from './Facebook/SignInWithFacebook';
import Google from './Google/Google';

const SignInWith = ({ disabled }) => {
  const { t } = useLocalization();
  const [user, setUser] = useState({});

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
      <SignInWithFacebook disabled={disabled} />
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

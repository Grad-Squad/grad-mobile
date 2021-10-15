import { WhiteButton } from 'common/Input/Button';
import { LocalizationContext } from 'localization';
import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import Facebook from './Facebook/Facebook';
import Google from './Google/Google';
import * as FacebookSdk from 'expo-facebook';
import * as GoogleSignIn from 'expo-google-sign-in';
import { useState } from 'react';

const SignInWith = ({ disabled }) => {
  const { t } = useContext(LocalizationContext);
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

  const loginWithFacebook = async () => {
    try {
      await FacebookSdk.initializeAsync({
        appId: '129025926078511',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await FacebookSdk.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
          behavior: 'native',
        });
      if (type === 'success') {
        console.log(token);
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const parsed = await response.json();
        Alert.alert('Logged in!', `Hi ${parsed.name}!`);
        console.log(`Hi ${JSON.stringify(parsed)}!`);
      } else {
        console.log(type);
        // type === 'cancel'
      }
    } catch (x) {
      alert(`Facebook Login Error: ${x}`);
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

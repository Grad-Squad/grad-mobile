import { WhiteButton } from 'common/Input/Button';
import { LocalizationContext } from 'localization';
import React, { useContext } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Styles } from 'styles';
import Facebook from './Facebook/Facebook';
import Google from './Google/Google';
import * as FacebookSdk from 'expo-facebook';

const SignInWith = () => {
  const { t } = useContext(LocalizationContext);

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
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        console.log(`Hi ${(await response.json()).name}!`);
      } else {
        console.log(type);
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={[Styles.cardFooter, styles.background]}>
      <WhiteButton
        text={t('Login/Sign In With Google')}
        onPress={() => Alert.alert('google')}
        leftIcon={<Google />}
        style={styles.firstButtonGap}
        smallButton
      />
      <WhiteButton
        text={t('Login/Sign In With Facebook')}
        onPress={loginWithFacebook}
        leftIcon={<Facebook />}
        smallButton
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

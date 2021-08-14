import React from 'react';
import { View, StyleSheet } from 'react-native';

import Page from '../_common/Page/Page';
import LoginMainContent from './LoginMainContent';
import SignInWith from './SignInWith/SignInWith';

const Login = () => (
  <Page style={styles.wrapper}>
    <View style={styles.content}>
      <LoginMainContent />
      <SignInWith />
    </View>
  </Page>
);

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '85%',
  },
});

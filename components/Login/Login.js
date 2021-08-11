import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { LocalizationContext } from '../../localization/LocalizationProvider';
import { Button, TextInput } from '../_common/Input';
import Logo from '../_common/Logo/Logo';
import Page from '../_common/Page/Page';

const Login = () => {
  const { t } = useContext(LocalizationContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Page>
      <View style={styles.wrapper}>
        <Logo />
        <TextInput
          text={email}
          setText={setEmail}
          title={t('Login/Email')}
          isEmail
        />
        <TextInput
          text={password}
          setText={setPassword}
          title={t('Login/Password')}
          isPassword
        />
        <Button
          text={t('Login/forgot password?')}
          onPress={() => Alert.alert('test')}
          transparent
          lightText
        />
        <View style={styles.gap}>
          <Button
            text={t('Login/LOGIN')}
            onPress={() => Alert.alert('login')}
            largeButton
          />
        </View>
        <View style={styles.gap}>
          <Button
            text={t('Login/REGISTER')}
            onPress={() => Alert.alert('register')}
          />
        </View>
        <View style={styles.gap}>
          <Button
            text={t('Login/Sign In With Google')}
            onPress={() => Alert.alert('google')}
          />
        </View>
        <View style={styles.gap}>
          <Button
            text={t('Login/Sign In With Facebook')}
            onPress={() => Alert.alert('facebook')}
          />
        </View>
      </View>
    </Page>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: 'gray',
    padding: 10,
  },
  gap: {
    marginBottom: 10,
  },
});

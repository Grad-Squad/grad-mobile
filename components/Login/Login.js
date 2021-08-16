import React, { useContext, useState } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';

import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInput } from '../_common/Input';
import TextInputGroup from '../_common/Input/TextInputGroup';
import SignInWith from './SignInWith/SignInWith';

const Login = () => {
  const { t } = useContext(LocalizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => Alert.alert('login');

  return (
    <LoginBack componentAfterBackground={<SignInWith />}>
      <View style={styles.textInputs}>
        <TextInputGroup onFinish={onLogin}>
          <TextInput
            text={email}
            setText={setEmail}
            title={t('Login/Email')}
            isEmail
            style={styles.gap}
          />
          <TextInput
            text={password}
            setText={setPassword}
            title={t('Login/Password')}
            isPassword
            style={styles.gap}
          />
        </TextInputGroup>
        <Button
          text={t('Login/forgot password?')}
          onPress={() => Alert.alert('test')}
          transparent
          lightText
        />
      </View>
      <Button
        text={t('Login/LOGIN')}
        onPress={onLogin}
        largeButton
        style={styles.gap}
      />
      <Button
        text={t('Login/REGISTER')}
        onPress={() => Alert.alert('register')}
        style={styles.gap}
      />
    </LoginBack>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInputs: { marginTop: 50, marginBottom: 32 },
  gap: {
    marginBottom: 11,
  },
});

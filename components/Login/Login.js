import React, { useContext, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { navigationPropType } from '../../proptypes';
import { LocalizationContext } from '../../localization/LocalizationProvider';

import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInput } from '../_common/Input';
import TextInputGroup from '../_common/Input/TextInputGroup';
import SignInWith from './SignInWith/SignInWith';

const Login = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => Alert.alert('login');

  return (
    <LoginBack
      bodyStyle={styles.loginBack}
      componentAfterBackground={<SignInWith />}
    >
      <TextInputGroup style={styles.textInputs} onFinish={onLogin}>
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
        <Button
          text={t('Login/forgot password?')}
          onPress={() => navigation.navigate('forgotPassword')}
          transparent
          lightText
        />
      </TextInputGroup>
      <Button
        text={t('Login/LOGIN')}
        onPress={onLogin}
        largeButton
        style={styles.gap}
      />
      <Button
        text={t('Login/REGISTER')}
        onPress={() => Alert.alert('register')}
      />
    </LoginBack>
  );
};

Login.propTypes = {
  navigation: navigationPropType.isRequired,
};

export default Login;

const styles = StyleSheet.create({
  loginBack: {
    marginBottom: 12,
  },
  textInputs: { marginBottom: 32 },
  gap: {
    marginBottom: 11,
  },
});

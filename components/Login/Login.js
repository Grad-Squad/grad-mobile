import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { LocalizationContext } from '../../localization/LocalizationProvider';
import { TextInput, TransparentButton } from '../_common/Input';
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
        <TransparentButton
          text={t('Login/forgot password?')}
          onPress={() => Alert.alert('test')}
        />
      </View>
    </Page>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    width: '85%',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

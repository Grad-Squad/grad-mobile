import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import { Styles } from '../../styles';
import { Button, TextInput } from '../_common/Input';
import TextInputGroup from '../_common/Input/TextInputGroup';
import Logo from '../_common/Logo/Logo';

const LoginMainContent = () => {
  const { t } = useContext(LocalizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => Alert.alert('login');

  return (
    <View style={[Styles.cardBody, styles.mainContent]}>
      <Logo hasBoundingCircle style={styles.logo} />
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
    </View>
  );
};

export default LoginMainContent;

const styles = StyleSheet.create({
  mainContent: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 28,
  },
  logo: {
    position: 'absolute',
    top: -25,
  },
  textInputs: { marginTop: 50, marginBottom: 32 },
  gap: {
    marginBottom: 11,
  },
});

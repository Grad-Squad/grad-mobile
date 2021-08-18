import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import { navigationPropType } from '../../proptypes';
import { Typography } from '../../styles';
import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInput } from '../_common/Input';

const NewPassword = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const [password, setPassword] = useState('');

  const onPasswordSubmit = () => {
    navigation.navigate('forgotPassword/done');
  };
  return (
    <LoginBack>
      <Text style={styles.header}>
        {t('ForgotPassword/Reset your password')}
      </Text>
      <Text style={styles.subtitle}>
        {t('ForgotPassword/Enter a new password to replace the old password')}
      </Text>

      <TextInput
        text={password}
        setText={setPassword}
        title={t('ForgotPassword/New Password')}
        isPassword
        TextInputProps={{ onSubmitEditing: onPasswordSubmit }}
        style={styles.gap}
      />

      <Button
        text={t('ForgotPassword/Reset Password')}
        onPress={() => onPasswordSubmit()}
      />
    </LoginBack>
  );
};

export default NewPassword;

NewPassword.propTypes = {
  navigation: navigationPropType.isRequired,
};
NewPassword.defaultProps = {};

const styles = StyleSheet.create({
  gap: {
    marginBottom: 30,
  },
  header: {
    ...Typography.forgotPassword.bigHeader,

    marginBottom: 25,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 18,
  },
});

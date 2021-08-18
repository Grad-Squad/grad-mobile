import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button, TextInput } from '../_common/Input';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import LoginBack from '../_common/backgrounds/LoginBack';
import { navigationPropType } from '../../proptypes';
import { Typography } from '../../styles';

const EnterEmail = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const [email, setEmail] = useState('');

  const onResetClick = () => {
    navigation.navigate('forgotPassword/checkEmail');
  };

  return (
    <LoginBack style={styles.wrapper}>
      <Text style={styles.header}>{t('ForgotPassword/To Reset')}</Text>

      <TextInput
        text={email}
        setText={setEmail}
        title={t('Login/Email')}
        isEmail
        TextInputProps={{ onSubmitEditing: onResetClick }}
        style={styles.gap}
      />

      <Text style={styles.subtitle}>{t('ForgotPassword/AnEmailWith')}</Text>

      <Button
        text={t('ForgotPassword/RESET PASSWORD')}
        onPress={onResetClick}
      />
    </LoginBack>
  );
};

EnterEmail.propTypes = {
  navigation: navigationPropType.isRequired,
};
EnterEmail.defaultProps = {};

export default EnterEmail;

const styles = StyleSheet.create({
  gap: {
    marginBottom: 35,
  },
  header: {
    ...Typography.forgotPassword.header,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,
    textAlign: 'center',

    marginBottom: 30,
  },
});

import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { LocalizationContext } from '../../localization/LocalizationProvider';
import { navigationPropType } from '../../proptypes';
import LoginBack from '../_common/backgrounds/LoginBack';
import { Button, TextInput } from '../_common/Input';
import TextInputGroup from '../_common/Input/TextInputGroup';

const RequiredInfo = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const onRegisterClick = () => {
    navigation.navigate('register/optionalInfo');
  };
  return (
    <LoginBack>
      <TextInputGroup style={styles.textInputGroup} onFinish={onRegisterClick}>
        <TextInput
          text={email}
          setText={setEmail}
          title={`${t('Login/Email')}*`}
          isEmail
          style={styles.textInput}
        />
        <TextInput
          text={password}
          setText={setPassword}
          title={`${t('Login/Password')}*`}
          isPassword
          style={styles.textInput}
        />
        <TextInput
          text={userName}
          setText={setUserName}
          title={`${t('Register/Name')}*`}
        />
      </TextInputGroup>

      <Button
        text={t('Register/REGISTER')}
        onPress={onRegisterClick}
      />
    </LoginBack>
  );
};

export default RequiredInfo;

RequiredInfo.propTypes = {
  navigation: navigationPropType.isRequired,
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 13,
  },

  textInputGroup: {
    marginBottom: 50,
  },
});

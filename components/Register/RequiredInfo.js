import LoginBack from 'common/backgrounds/LoginBack';
import { Button, TextInput, TextInputGroup } from 'common/Input';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';


const RequiredInfo = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const onContinueClick = () => {
    navigation.navigate('register/rollSelection');
  };
  return (
    <LoginBack>
      <TextInputGroup style={styles.textInputGroup} onFinish={onContinueClick}>
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
        text={t('Register/CONTINUE')}
        onPress={onContinueClick}
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

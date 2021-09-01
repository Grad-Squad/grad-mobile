import LoginBack from 'common/backgrounds/LoginBack';
import { Button, TextInputFormik, TextInputGroup } from 'common/Input';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import RegisterContext from './RegisterContext';

const RequiredInfo = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);
  const formik = useContext(RegisterContext);

  const onContinueClick = () => {
    if (formik.isValid && formik.dirty) {
      navigation.navigate('register/rollSelection');
    } else {
      formik.setFieldTouched('email');
      formik.setFieldTouched('password');
      formik.setFieldTouched('name');
    }
  };
  return (
    <LoginBack>
      <TextInputGroup style={styles.textInputGroup} onFinish={onContinueClick}>
        <TextInputFormik
          formik={formik}
          formikKey="email"
          title={`${t('Login/Email')}*`}
          isEmail
          style={styles.textInput}
        />
        <TextInputFormik
          formik={formik}
          formikKey="password"
          title={`${t('Login/Password')}*`}
          isPassword
          style={styles.textInput}
        />
        <TextInputFormik
          formik={formik}
          formikKey="name"
          title={`${t('Register/Name')}*`}
        />
      </TextInputGroup>

      <Button text={t('Register/CONTINUE')} onPress={onContinueClick} />
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

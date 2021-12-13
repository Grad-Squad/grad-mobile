import { useAPIRegister } from 'api/endpoints/auth';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik, TextInputGroup } from 'common/Input';
import { WhiteButton } from 'common/Input/Button';
import { ApiConstants } from 'constants';
import ScreenNames from 'navigation/ScreenNames';
import { useFormik } from 'formik';
import { useLocalization } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { emailRequired, nameRequired, passwordRequired } from 'validation';
import * as yup from 'yup';
import RegisterContext from './RegisterContext';

const RequiredInfo = ({ navigation }) => {
  const { t } = useLocalization();
  const { setProfileId } = useContext(RegisterContext);
  const registerMutation = useAPIRegister({
    onError: () => {},
    onSuccess: (data, variables) => {
      const code = data?.code;
      if (code === ApiConstants.duplicate_email) {
        navigation.navigate(ScreenNames.FORGOT_PASSWORD, {
          screen: ScreenNames.ForgotPassword.ENTER_EMAIL,
          params: {
            existingEmail: variables.email,
          },
        });
      } else {
        const { id: profileId } = data?.user?.profile;
        setProfileId(profileId);
        navigation.navigate(ScreenNames.Register.ROLL_SELECTION);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: () => {
      Alert.alert('register submit');
    },
    validationSchema: yup.object().shape({
      name: nameRequired(t),
      email: emailRequired(t),
      password: passwordRequired(t),
    }),
  });

  const onContinueClick = () => {
    if (formik.isValid && formik.dirty) {
      registerMutation.mutate({
        ...formik.values,
        email: formik.values.email.toLowerCase(),
      });
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

      <WhiteButton
        disabled={registerMutation.status === 'loading'}
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

import { createAccount } from 'api/account';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik, TextInputGroup } from 'common/Input';
import { WhiteButton } from 'common/Input/Button';
import { ApiConstants } from 'constants';
import { useFormik } from 'formik';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useMutation } from 'react-query';
import { emailRequired, nameRequired, passwordRequired } from 'validation';
import * as yup from 'yup';

const RequiredInfo = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const registerMutation = useMutation((user) => createAccount(user), {
    onError: () => {},
    onSuccess: (data, variables, context) => {
      const code = data?.data?.code;
      if (code === ApiConstants.duplicate_email) {
        navigation.navigate('forgotPassword', {
          screen: 'forgotPassword/enterEmail',
          params: {
            existingEmail: variables.email,
          },
        });
      } else {
        navigation.navigate('register/rollSelection');
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (user) => {
      registerMutation.mutate(user, { email: user.email });
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
      registerMutation.mutate(formik.values);
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

      <WhiteButton text={t('Register/CONTINUE')} onPress={onContinueClick} />
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

import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from 'localization';
import { emailRequired } from 'validation';
import LoginBack from 'common/backgrounds/LoginBack';
import { TextInputFormik } from 'common/Input';
import { navigationPropType } from 'proptypes';
import { Typography } from 'styles';
import { WhiteButton } from 'common/Input/Button';


const EnterEmail = ({ navigation }) => {
  const { t } = useContext(LocalizationContext);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: ({email}) => {
      navigation.navigate('forgotPassword/checkEmail');
    },
    validationSchema: yup.object().shape({
      email: emailRequired(t),
    }),
  });

  return (
    <LoginBack style={styles.wrapper}>
      <Text style={styles.header}>{t('ForgotPassword/To Reset')}</Text>

      <TextInputFormik
        formik={formik}
        formikKey="email"
        title={t('Login/Email')}
        isEmail
        style={styles.gap}
      />

      <Text style={styles.subtitle}>{t('ForgotPassword/AnEmailWith')}</Text>

      <WhiteButton
        text={t('ForgotPassword/RESET PASSWORD')}
        onPress={formik.handleSubmit}
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

    marginBottom: 20,
  },
  subtitle: {
    ...Typography.forgotPassword.subtitle,

    marginBottom: 30,
  },
});

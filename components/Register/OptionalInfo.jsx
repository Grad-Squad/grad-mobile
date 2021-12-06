import LoginBack from 'common/backgrounds/LoginBack';
import { AddProfileImage, TextInputFormik } from 'common/Input';
import { WhiteButton } from 'common/Input/Button';
import EduText from 'common/EduText';
import { useLocalization } from 'localization';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import RegisterContext from './RegisterContext';

const OptionalInfo = () => {
  const { t } = useLocalization();
  const { formik } = useContext(RegisterContext);

  return (
    <LoginBack>
      <AddProfileImage
        optional
        style={styles.profileImage}
      />

      <TextInputFormik
        formik={formik}
        formikKey="biography"
        title={`${t('Register/Bio')}`}
        subtitle={t('TextInput/optional')}
        multiline
        style={styles.bioGap}
      />
      <EduText style={styles.addLater}>
        {t('Register/You can always add them later')}
      </EduText>

      <WhiteButton
        text={t('Register/REGISTER')}
        onPress={formik.handleSubmit}
      />
    </LoginBack>
  );
};

OptionalInfo.propTypes = {};
OptionalInfo.defaultProps = {};

export default OptionalInfo;

const styles = StyleSheet.create({
  profileImage: { marginBottom: 10 },
  bioGap: { marginBottom: 10 },
  addLater: {
    width: '100%',
    marginBottom: 15,
    fontFamily: 'Lato_300Light',
    fontSize: 15,
  },
});

import LoginBack from 'common/backgrounds/LoginBack';
import PropTypes from 'prop-types';
import EduText from 'common/EduText';
import { WhiteButton } from 'common/Input/Button';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Typography } from 'styles';
import RegisterContext from '../RegisterContext';
import TeacherOrStudent from './TeacherOrStudent';

const RollSelection = ({ navigation, route }) => {
  const { t, isRTL } = useContext(LocalizationContext);
  const profileId = route.params?.profileId;
  const { formik, setProfileId } = useContext(RegisterContext);

  useEffect(() => {
    setProfileId(profileId);
  }, []);

  const onContinueClick = () => {
    navigation.navigate('register/optionalInfo');
  };
  return (
    <LoginBack>
      <EduText
        style={[
          Typography.userInput.title,
          { alignSelf: isRTL ? 'flex-end' : 'flex-start' },
          styles.titleGap,
        ]}
      >
        {`${t('Register/Are you a student or a teacher ?')}`}
      </EduText>

      <TeacherOrStudent
        value={formik.values.role}
        setValue={formik.handleChange('role')}
        style={styles.radioButtonGap}
      />

      <WhiteButton text={t('Register/CONTINUE')} onPress={onContinueClick} />
    </LoginBack>
  );
};

RollSelection.propTypes = {
  navigation: navigationPropType.isRequired,
  route: PropTypes.shape({
    params: {
      profileId: PropTypes.string.isRequired,
    },
  }).isRequired,
};
RollSelection.defaultProps = {};

export default RollSelection;

const styles = StyleSheet.create({
  titleGap: { marginBottom: 30 },
  radioButtonGap: { marginBottom: 50 },
});

import LoginBack from 'common/backgrounds/LoginBack';
import EduText from 'common/EduText';
import { WhiteButton } from 'common/Input/Button';
import ScreenNames from 'navigation/ScreenNames';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Typography } from 'styles';
import RegisterContext from '../RegisterContext';
import TeacherOrStudent from './TeacherOrStudent';

const RollSelection = ({ navigation }) => {
  const { t, isRTL } = useContext(LocalizationContext);
  const { formik } = useContext(RegisterContext);

  const onContinueClick = () => {
    navigation.navigate(ScreenNames.Register.OPTIONAL_INFO);
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
};
RollSelection.defaultProps = {};

export default RollSelection;

const styles = StyleSheet.create({
  titleGap: { marginBottom: 30 },
  radioButtonGap: { marginBottom: 50 },
});

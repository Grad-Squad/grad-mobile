import LoginBack from 'common/backgrounds/LoginBack';
import { Button } from 'common/Input';
import { LocalizationContext } from 'localization';
import { navigationPropType } from 'proptypes';
import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Typography } from 'styles';
import RegisterContext from '../RegisterContext';
import TeacherOrStudent from './TeacherOrStudent';

const RollSelection = ({ navigation }) => {
  const { t, isRTL } = useContext(LocalizationContext);
  const formik = useContext(RegisterContext);

  const onContinueClick = () => {
    navigation.navigate('register/optionalInfo');
  };
  return (
    <LoginBack>
      <Text
        style={[
          Typography.userInput.title,
          { alignSelf: isRTL ? 'flex-end' : 'flex-start' },
          styles.titleGap,
        ]}
      >
        {`${t('Register/Are you a student or a teacher ?')}`}
      </Text>

      <TeacherOrStudent
        value={formik.values.role}
        setValue={formik.handleChange('role')}
        style={styles.radioButtonGap}
      />

      <Button text={t('Register/CONTINUE')} onPress={onContinueClick} />
    </LoginBack>
  );
};

RollSelection.propTypes = { navigation: navigationPropType.isRequired };
RollSelection.defaultProps = {};

export default RollSelection;

const styles = StyleSheet.create({
  titleGap: { marginBottom: 30 },
  radioButtonGap: { marginBottom: 50 },
});

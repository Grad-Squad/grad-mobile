import React, { useContext, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import LoginBack from '../../_common/backgrounds/LoginBack';
import { Button } from '../../_common/Input';
import { Typography } from '../../../styles';
import { LocalizationContext } from '../../../localization/LocalizationProvider';
import { navigationPropType } from '../../../proptypes';
import TeacherOrStudent from './TeacherOrStudent';

const RollSelection = ({ navigation }) => {
  const { t, isRTL } = useContext(LocalizationContext);

  const [rollSelection, setRollSelection] = useState('student');

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
        value={rollSelection}
        setValue={setRollSelection}
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

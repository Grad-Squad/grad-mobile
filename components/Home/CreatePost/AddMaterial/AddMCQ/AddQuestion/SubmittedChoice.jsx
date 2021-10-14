import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors } from 'styles';
import Checkbox from 'common/Input/Checkbox';

const SubmittedChoice = ({ text, isCorrect, setIsCorrect, onEditPress }) => (
  <View style={styles.submittedChoice}>
    <EduText style={[styles.text, styles.gap]}>{text}</EduText>
    <PressableIcon onPress={onEditPress} name="edit" style={styles.gap} />
    <Checkbox checked={isCorrect} setChecked={setIsCorrect} />
  </View>
);

SubmittedChoice.propTypes = {
  text: PropTypes.string.isRequired,
  onEditPress: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  setIsCorrect: PropTypes.func.isRequired,
};
SubmittedChoice.defaultProps = {};

export default React.memo(SubmittedChoice);

const styles = StyleSheet.create({
  submittedChoice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginRight: 10,
  },
  text: {
    borderBottomWidth: 1.5,
    borderColor: Colors.separator,

    flexWrap: 'wrap',
    flex: 1,

    fontSize: 18,

    paddingBottom: 5,
  },
  gap: { marginRight: 30 },
});

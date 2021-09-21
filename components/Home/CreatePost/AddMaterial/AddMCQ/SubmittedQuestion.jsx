import React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View } from 'react-native';
import { Icon, MaterialTypeIconsMap, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';

const SubmittedQuestion = ({ question, numOfMCQ }) => (
  <View style={styles.wrapper}>
    <EduText style={styles.text}>{question}</EduText>
    <View>
      <View style={styles.numOfMCQ}>
        <EduText style={styles.numOfMCQTextGap}>{numOfMCQ}</EduText>
        <Icon name={MaterialTypeIconsMap.MCQ} />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <PressableIcon
          onPress={() => Alert.alert('triple dot')}
          name="dots-horizontal"
        />
      </View>
    </View>
  </View>
);

SubmittedQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  numOfMCQ: PropTypes.number.isRequired,
};
SubmittedQuestion.defaultProps = {};

export default SubmittedQuestion;

const styles = StyleSheet.create({
  wrapper: {
    borderColor: Colors.separator,
    borderWidth: 1,
    borderRadius: Constants.borderRadius,

    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 15,

    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  text: { fontSize: 20, flex: 1, marginLeft: 5 },
  numOfMCQ: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numOfMCQTextGap: {
    marginRight: 5,
  },
});

import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { TransparentButton, SecondaryActionButton } from 'common/Input/Button';
import { Constants } from 'styles';
import McqOption from './McqOption';

const McqQuestion = ({ question, questionIndex, handleAnswer }) => {
  const { id, title, options, answerIndices } = question;
  return (
    <View style={{ flex: 1 }}>
      <EduText style={styles.title}>
        Q{questionIndex}: {title}
      </EduText>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <McqOption
            key={item}
            option={item}
            index={index}
            isAnswer={answerIndices.includes(index)}
            disabled
          />
        )}
        ListFooterComponent={
          <View style={styles.row}>
            <TransparentButton
              text="Skip"
              style={styles.take35Width}
              onPress={() => handleAnswer(1)}
            />
            <SecondaryActionButton
              text="Show Answer"
              style={styles.take65Width}
            />
          </View>
        }
        ListFooterComponentStyle={styles.footer}
      />
    </View>
  );
};

McqQuestion.propTypes = {
  question: PropTypes.exact({
    id: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};
McqQuestion.defaultProps = {};

export default McqQuestion;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    paddingHorizontal: Constants.commonMargin,
    paddingBottom: Constants.commonMargin / 2,
  },
  row: {
    flexDirection: 'row',
  },
  take35Width: {
    flex: 35,
  },
  take65Width: {
    flex: 65,
  },
  flatListContainer: {
    flexGrow: 1,
    padding: Constants.commonMargin,
  },
  footer: {
    flexGrow: 1,
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
});

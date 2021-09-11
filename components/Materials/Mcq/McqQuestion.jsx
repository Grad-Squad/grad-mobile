import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import {
  TransparentButton,
  SecondaryActionButton,
  MainActionButton,
} from 'common/Input/Button';
import { Colors, Constants } from 'styles';
import ResponsiveImage from 'common/ResponsiveImage';
import McqOption from './McqOption';

const LETTER_A_CODE = 65;
const McqQuestion = ({
  question,
  questionIndex,
  handleAnswer,
  isAlreadyAnswered,
}) => {
  const { id, title, options, answerIndices } = question;
  const [isQuestionAnswered, setIsQuestionAnswered] =
    useState(isAlreadyAnswered);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const correctLetters = answerIndices.map((index) =>
    String.fromCharCode(LETTER_A_CODE + index)
  );

  const handleChoiceSelection = (selectedLetterIndex) => {
    setSelectedLetters((state) => [
      ...state,
      String.fromCharCode(LETTER_A_CODE + selectedLetterIndex),
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <EduText style={styles.title}>
        Q{questionIndex + 1}: {title}
      </EduText>
      {isQuestionAnswered && (
        <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
          Selected answer(s):{' '}
          <EduText style={styles.selectedText}>
            {selectedLetters.join(', ')}
          </EduText>
        </EduText>
      )}
      {isQuestionAnswered && (
        <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
          The correct answer(s):{' '}
          <EduText style={styles.correctText}>
            {correctLetters.join(', ')}
          </EduText>
        </EduText>
      )}
      <FlatList
        ListHeaderComponent={
          <ResponsiveImage imageURI="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDO6fu_ZbHOGVK-07zGC0RBubRtEr4ClOU0A&usqp=CAU" />
        }
        contentContainerStyle={styles.flatListContainer}
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <McqOption
            key={item}
            option={item}
            index={index}
            isAnswer={answerIndices.includes(index)}
            disabled={isQuestionAnswered}
            handleChoiceSelection={handleChoiceSelection}
          />
        )}
        ListFooterComponent={
          <View style={styles.row}>
            <TransparentButton text="Skip" style={styles.take35Width} />
            {isQuestionAnswered || isAlreadyAnswered ? (
              <MainActionButton
                text="Continue"
                style={styles.take65Width}
                onPress={() => {
                  handleAnswer(1);
                }}
              />
            ) : (
              <SecondaryActionButton
                text="Show Answer"
                style={styles.take65Width}
                onPress={() => {
                  setIsQuestionAnswered(true);
                }}
              />
            )}
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
  isAlreadyAnswered: PropTypes.bool,
};
McqQuestion.defaultProps = {
  isAlreadyAnswered: false,
};

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
  correctText: {
    color: Colors.materialGood,
  },
  selectedText: {
    color: Colors.accent,
  },
});

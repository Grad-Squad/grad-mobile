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
  handleSkip,
  handleAnswer,
  isAlreadyAnswered,
}) => {
  const { title, options, answerIndices, imageURI } = question;
  const hasOneAnswer = answerIndices.length === 1;
  const [isQuestionAnswered, setIsQuestionAnswered] =
    useState(isAlreadyAnswered);
  const [selectedIndices, setSelectedIndices] = useState([]);

  useEffect(() => {
    setIsQuestionAnswered(isAlreadyAnswered);
    setSelectedIndices([]);
  }, [questionIndex]);

  return (
    <View style={{ flex: 1 }}>
      {title && (
        <EduText style={styles.title}>
          Q{questionIndex + 1}: {title}
        </EduText>
      )}
      {isQuestionAnswered && (
        <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
          Selected answer(s):{' '}
          <EduText style={styles.selectedText}>
            {selectedIndices
              .map((index) => String.fromCharCode(LETTER_A_CODE + index))
              .join(', ')}
          </EduText>
        </EduText>
      )}
      {isQuestionAnswered && (
        <EduText style={{ paddingHorizontal: Constants.commonMargin }}>
          The correct answer(s):{' '}
          <EduText style={styles.correctText}>
            {answerIndices
              .map((index) => String.fromCharCode(LETTER_A_CODE + index))
              .join(', ')}
          </EduText>
        </EduText>
      )}
      <FlatList
        ListHeaderComponent={
          imageURI && <ResponsiveImage imageURI={imageURI} />
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
            chosen={selectedIndices.indexOf(index) !== -1}
            onPress={() => {
              if (isQuestionAnswered) {
                return;
              }
              if (selectedIndices.indexOf(index) !== -1) {
                setSelectedIndices((state) =>
                  state.filter((storedIndex) => storedIndex !== index)
                );
              } else if (hasOneAnswer) {
                setSelectedIndices([index]);
              } else {
                setSelectedIndices((state) => [...state, index]);
              }
            }}
          />
        )}
        ListFooterComponent={
          isQuestionAnswered || isAlreadyAnswered ? (
            <MainActionButton
              text="Continue"
              onPress={() => {
                let answeredCorrectly = true;
                const sortedSelectedIndices = [...selectedIndices].sort();
                const sortedCorrectIndices = [...answerIndices].sort();
                if (
                  sortedCorrectIndices.length === sortedSelectedIndices.length
                ) {
                  for (let i = 0; i < sortedCorrectIndices.length; i += 1) {
                    if (sortedCorrectIndices[i] !== sortedSelectedIndices[i]) {
                      answeredCorrectly = false;
                    }
                  }
                } else {
                  answeredCorrectly = false;
                }
                handleAnswer(answeredCorrectly);
              }}
            />
          ) : (
            <View style={styles.row}>
              <TransparentButton
                text="Skip"
                onPress={() => {
                  handleSkip();
                }}
                style={styles.take35Width}
              />
              {selectedIndices.length > 0 ? (
                <MainActionButton
                  text="Submit Answer"
                  style={styles.take65Width}
                  onPress={() => {
                    setIsQuestionAnswered(true);
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
          )
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
    title: PropTypes.string,
    imageURI: PropTypes.string,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  handleSkip: PropTypes.func.isRequired,
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

import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import {
  TransparentButton,
  SecondaryActionButton,
  MainActionButton,
} from 'common/Input/Button';
import { Constants } from 'styles';
import ResponsiveImage from 'common/ResponsiveImage';
import { LocalizationContext } from 'localization';
import McqOption from './McqOption';
import AnswerFeedbackText from './AnswerFeedbackText';

const McqQuestion = ({
  question,
  questionIndex,
  handleSkip,
  handleAnswer,
  handleAnswerShown,
  isAlreadyAnswered,
  handleContinue,
}) => {
  const { title, options, answerIndices, imageURI } = question;
  const hasOneAnswer = answerIndices.length === 1;
  const [isQuestionAnswered, setIsQuestionAnswered] =
    useState(isAlreadyAnswered);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const { t } = useContext(LocalizationContext);

  useEffect(() => {
    setIsQuestionAnswered(isAlreadyAnswered);
    setSelectedIndices([]);
  }, [questionIndex]);

  const onOptionPressed = (index) => {
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
  };

  const onAnswerSubmitted = () => {
    let answeredCorrectly = true;
    const sortedSelectedIndices = [...selectedIndices].sort();
    const sortedCorrectIndices = [...answerIndices].sort();
    if (sortedCorrectIndices.length === sortedSelectedIndices.length) {
      for (let i = 0; i < sortedCorrectIndices.length; i += 1) {
        if (sortedCorrectIndices[i] !== sortedSelectedIndices[i]) {
          answeredCorrectly = false;
        }
      }
    } else {
      answeredCorrectly = false;
    }
    handleAnswer(answeredCorrectly, false);
  };

  const footer =
    isQuestionAnswered || isAlreadyAnswered ? (
      <MainActionButton text={t('Mcq/Continue')} onPress={handleContinue} />
    ) : (
      <View style={styles.row}>
        <TransparentButton
          text={t('Mcq/Skip')}
          onPress={() => {
            handleSkip();
          }}
          style={styles.take35Width}
        />
        {selectedIndices.length > 0 ? (
          <MainActionButton
            text={t('Mcq/SubmitAnswer')}
            style={styles.take65Width}
            onPress={() => {
              setIsQuestionAnswered(true);
              onAnswerSubmitted();
            }}
          />
        ) : (
          <SecondaryActionButton
            text={t('Mcq/ShowAnswer')}
            style={styles.take65Width}
            onPress={() => {
              setIsQuestionAnswered(true);
              handleAnswerShown();
            }}
          />
        )}
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      {title && (
        <EduText style={styles.title}>
          {t('Mcq/Q')}
          {questionIndex + 1}: {title}
        </EduText>
      )}
      {isQuestionAnswered && (
        <AnswerFeedbackText
          selectedIndices={selectedIndices}
          answerIndices={answerIndices}
        />
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
            onPress={() => onOptionPressed(index)}
          />
        )}
        ListFooterComponent={footer}
        ListFooterComponentStyle={styles.footer}
      />
    </View>
  );
};

McqQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answerIndices: PropTypes.arrayOf(PropTypes.number).isRequired,
    title: PropTypes.string,
    imageURI: PropTypes.string,
  }).isRequired,
  questionIndex: PropTypes.number.isRequired,
  handleSkip: PropTypes.func.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  handleAnswerShown: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
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
});

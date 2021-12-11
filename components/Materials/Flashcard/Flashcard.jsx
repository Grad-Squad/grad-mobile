import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { flashcardPropType } from 'proptypes';
import SlidableHOC from './SlidableHOC';
import FlashcardFace from './FlashcardFace';

const Flashcard = ({
  flashcard,
  onGood,
  onBad,
  isFlipped,
  onFlip,
  unavailableHeight,
}) => {
  const { frontImage, frontText, backImage, backText } = flashcard;
  return (
    <SlidableHOC canSlide onBad={onBad} onGood={onGood} onFlip={onFlip}>
      <FlashcardFace
        outerUnavailableHeight={unavailableHeight}
        text={isFlipped ? backText : frontText}
        imageURI={isFlipped ? backImage?.uri : frontImage?.uri}
      />
    </SlidableHOC>
  );
};

Flashcard.propTypes = {
  flashcard: flashcardPropType.isRequired,
  onGood: PropTypes.func.isRequired,
  onBad: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  unavailableHeight: PropTypes.number.isRequired,
};
Flashcard.defaultProps = {};

export default Flashcard;

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({});

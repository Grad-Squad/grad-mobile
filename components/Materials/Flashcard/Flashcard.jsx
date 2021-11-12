import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { flashcardPropType } from 'proptypes';
import SlidableHOC from './SlidableHOC';
import FlashcardFace from './FlashcardFace';

const Flashcard = ({ flashcard, onGood, onBad, isFlipped, onFlip }) => {
  const { frontImage, frontText, backImage, backText } = flashcard;
  return (
    <SlidableHOC canSlide onBad={onBad} onGood={onGood} onFlip={onFlip}>
      <FlashcardFace
        text={isFlipped ? backText : frontText}
        imageURI={isFlipped ? backImage : frontImage}
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
};
Flashcard.defaultProps = {};

export default Flashcard;

const styles = StyleSheet.create({
  pressableWrapper: {
    flex: 1,
  },
});

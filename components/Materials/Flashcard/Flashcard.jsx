import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import { flashcardPropType } from 'proptypes';
import SlidableHOC from './SlidableHOC';
import FlashcardFace from './FlashcardFace';

const Flashcard = ({ flashcard, onGood, onBad, isFlipped, onFlip }) => {
  const { frontImage, frontText, backImage, backText } = flashcard;
  return (
    <Pressable style={styles.pressableWrapper} onPress={onFlip}>
      <SlidableHOC canSlide={isFlipped} onBad={onBad} onGood={onGood}>
        <FlashcardFace
          text={isFlipped ? backText : frontText}
          imageURI={isFlipped ? backImage : frontImage}
        />
      </SlidableHOC>
    </Pressable>
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

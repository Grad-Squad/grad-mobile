import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import EduText from 'common/EduText';
import { Colors, Constants } from 'styles';
import { Icon } from 'common/Icon';
import { IconNames } from 'common/Icon/Icon';

const FlashcardFooter = ({ onGood, onBad, onFlip }) => (
  <View style={styles.container}>
    <Pressable onPress={onFlip}>
      <EduText style={styles.tapText}>Tap anywhere to show answer</EduText>
    </Pressable>
    <View style={styles.buttonsWrapper}>
      <Pressable onPress={onGood} style={[styles.button, styles.easyButton]}>
        <Icon
          name={IconNames.keyboardArrowLeft}
          color={Colors.white}
          size={40}
        />
        <View style={styles.easyTextWrapper}>
          <EduText style={styles.bigText}>Hard</EduText>
          <EduText style={styles.smallText}>Swipe left</EduText>
        </View>
      </Pressable>
      <Pressable onPress={onBad} style={[styles.button, styles.hardButton]}>
        <View style={styles.hardTextWrapper}>
          <EduText style={styles.bigText}>Easy</EduText>
          <EduText style={styles.smallText}>Swipe right</EduText>
        </View>
        <Icon
          name={IconNames.keyboardArrowRight}
          color={Colors.white}
          size={40}
        />
      </Pressable>
    </View>
  </View>
);

FlashcardFooter.propTypes = {
  onGood: PropTypes.func.isRequired,
  onBad: PropTypes.func.isRequired,
  onFlip: PropTypes.func.isRequired,
};
FlashcardFooter.defaultProps = {};

export default FlashcardFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.commonMargin,
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: Constants.commonMargin,
    paddingVertical: Constants.commonMargin / 2,
    marginHorizontal: Constants.commonMargin,
    flex: 1,
    borderRadius: Constants.borderRadius,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  easyButton: {
    backgroundColor: Colors.materialWrong,
    paddingLeft: Constants.commonMargin / 2,
  },
  hardButton: {
    backgroundColor: Colors.materialGood,
    paddingRight: Constants.commonMargin / 2,
  },
  buttonTextWrapper: {
    textAlign: 'right',
  },
  easyTextWrapper: {
    alignItems: 'flex-end',
    flex: 1,
  },
  hardTextWrapper: {},
  bigText: {
    color: Colors.white,
    fontSize: 20,
    marginBottom: 2,
  },
  smallText: {
    color: Colors.white,
  },

  tapText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: Constants.commonMargin / 2,
  },
});

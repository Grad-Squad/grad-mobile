import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'common/Input/Button';
import { Icon, PressableIcon } from 'common/Icon';
import EduText from 'common/EduText';
import pressableAndroidRipple from 'common/pressableAndroidRipple';
import { Colors, Constants } from 'styles';
import { IconNames } from 'common/Icon/Icon';

const FilterChoice = ({ isChosen, text }) => {
  console.log(
    '🚀 ~ file: FilterChoice.jsx ~ line 10 ~ FilterChoice ~ text',
    text
  );
  return (
    <Pressable
      onPress={() => {}}
      style={[styles.button]}
      android_ripple={pressableAndroidRipple}
    >
      <View style={styles.row}>
        <EduText style={styles.text}>{text}</EduText>
        <Icon
          name={
            isChosen ? IconNames.radioButtonChecked : IconNames.radioButtonOff
          }
        />
      </View>
    </Pressable>
  );
};

FilterChoice.propTypes = {
  text: PropTypes.string.isRequired,
  isChosen: PropTypes.bool.isRequired,
};
FilterChoice.defaultProps = {};

export default FilterChoice;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontSize: 22,
    padding: Constants.commonMargin / 2,
    marginRight: 'auto',
  },
});

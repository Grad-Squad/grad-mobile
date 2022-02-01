import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon, PressableIcon } from 'common/Icon';
import { Button } from 'common/Input/Button';
import EduText from 'common/EduText';
import { IconNames } from 'common/Icon/Icon';
import { Colors, Constants } from 'styles';

const FilterItem = ({ page, onPress }) => {
  const { iconName, text, children } = page;
  const currentChoice = 'sad';
  return (
    <View style={styles.row}>
      <Button
        leftIcon={<Icon name={iconName} />}
        text={text}
        onPress={onPress}
        style={styles.buttonStyle}
        textStyle={styles.buttonText}
      />
      {currentChoice && (
        <>
          <EduText style={styles.currentChoice}>{currentChoice}</EduText>
          <PressableIcon name={IconNames.close} onPress={() => {}} />
        </>
      )}
    </View>
  );
};

FilterItem.propTypes = {
  page: PropTypes.exact({
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};
FilterItem.defaultProps = {};

export default FilterItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginRight: 'auto',
  },
  buttonStyle: {
    flex: 1,
  },
  currentChoice: {
    color: Colors.accent,
    fontSize: 18,
    marginRight: Constants.commonMargin / 2,
  },
});

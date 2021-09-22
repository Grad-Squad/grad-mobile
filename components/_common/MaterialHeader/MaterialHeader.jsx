import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Colors, Constants, Styles } from 'styles';
import { PressableIcon } from 'common/Icon';

const MaterialHeader = ({ titleComponent, rightComponent, onBackPress }) => (
  <View style={styles.wrapper}>
    <View style={styles.leftSide}>
      <PressableIcon name="close" onPress={onBackPress} size={28} />
      {titleComponent}
    </View>
    {rightComponent}
  </View>
);

MaterialHeader.propTypes = {
  titleComponent: PropTypes.node.isRequired,
  rightComponent: PropTypes.node.isRequired,
  onBackPress: PropTypes.func.isRequired,
};
MaterialHeader.defaultProps = {};

export default MaterialHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 8,
    paddingTop: 8 + Constants.fromScreenStartPadding,
    paddingHorizontal: 15,

    backgroundColor: Colors.foreground,
    ...Styles.bottomBorder,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

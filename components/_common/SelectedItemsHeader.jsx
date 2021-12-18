import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, StyleSheet } from 'react-native';
import MaterialHeader from './MaterialHeader/MaterialHeader';
import EduText from './EduText';
import pressableAndroidRipple from './pressableAndroidRipple';
import { Icon } from './Icon';
import { IconNames } from './Icon/Icon';

const SelectedItemsHeader = ({ numSelected, onBackPress, onDeletePress }) => (
  <MaterialHeader
    onBackPress={onBackPress}
    titleComponent={
      <EduText style={styles.text}> {numSelected} item(s)</EduText>
    }
    rightComponent={
      <Pressable
        android_ripple={pressableAndroidRipple}
        onPress={onDeletePress}
        style={styles.row}
      >
        <EduText style={styles.deleteText}>delete</EduText>
        <Icon name={IconNames.delete} />
      </Pressable>
    }
  />
);

SelectedItemsHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onBackPress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func.isRequired,
};
SelectedItemsHeader.defaultProps = {};

export default SelectedItemsHeader;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginHorizontal: 7,
  },
  deleteText: {
    fontSize: 19,
    padding: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
